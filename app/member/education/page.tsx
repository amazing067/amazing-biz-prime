"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Video, 
  FileText, 
  Upload, 
  Play, 
  Download,
  X,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import MemberHeader from "@/components/MemberHeader";
import { supabase } from "@/lib/supabase"; // 교육 파일은 Supabase Storage 사용 (일단 유지)

interface EducationFile {
  id: string;
  name: string;
  type: 'video' | 'document';
  url: string;
  uploaded_at: string;
  uploaded_by: string;
}

export default function EducationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<EducationFile[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'document'>('video');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFileName, setUploadFileName] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchFiles();
    }
  }, [userProfile]);

  // 통합 회원 시스템: localStorage 기반 인증
  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        router.push("/member");
        return;
      }

      const user = JSON.parse(userStr);
      
      // 승인되지 않은 사용자는 접근 불가
      if (user.status !== 'approved' || !user.is_active) {
        alert("관리자 승인 후 이용하실 수 있습니다.");
        router.push("/member");
        return;
      }

      setUserProfile({
        name: user.full_name,
        username: user.username,
        id: user.id,
      });
    } catch (error) {
      console.error('인증 확인 오류:', error);
      router.push("/member");
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const fileList: EducationFile[] = [];

      // 동영상 폴더 조회
      const { data: videoData, error: videoError } = await supabase
        .storage
        .from('education-files')
        .list('video', {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      // Storage가 설정되지 않았을 경우 에러를 무시하고 빈 목록 반환
      if (videoError) {
        console.warn('동영상 폴더 조회 오류 (Storage 미설정 가능):', videoError.message);
      } else if (videoData) {
        videoData.forEach((file) => {
          const { data: urlData } = supabase
            .storage
            .from('education-files')
            .getPublicUrl(`video/${file.name}`);

          fileList.push({
            id: file.id || `video_${file.name}`,
            name: file.name,
            type: 'video',
            url: urlData.publicUrl,
            uploaded_at: file.created_at || new Date().toISOString(),
            uploaded_by: file.metadata?.uploaded_by || 'Unknown'
          });
        });
      }

      // 자료 폴더 조회
      const { data: docData, error: docError } = await supabase
        .storage
        .from('education-files')
        .list('document', {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      // Storage가 설정되지 않았을 경우 에러를 무시하고 빈 목록 반환
      if (docError) {
        console.warn('자료 폴더 조회 오류 (Storage 미설정 가능):', docError.message);
      } else if (docData) {
        docData.forEach((file) => {
          const { data: urlData } = supabase
            .storage
            .from('education-files')
            .getPublicUrl(`document/${file.name}`);

          fileList.push({
            id: file.id || `document_${file.name}`,
            name: file.name,
            type: 'document',
            url: urlData.publicUrl,
            uploaded_at: file.created_at || new Date().toISOString(),
            uploaded_by: file.metadata?.uploaded_by || 'Unknown'
          });
        });
      }

      // 날짜순 정렬
      fileList.sort((a, b) => 
        new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      );

      setFiles(fileList);
    } catch (error) {
      console.warn('파일 목록 조회 예외 (Storage 미설정 가능):', error);
      // 에러가 발생해도 빈 목록으로 설정하여 페이지는 정상 표시
      setFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !userProfile) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 관리자 권한 확인
    if (!userProfile.is_admin) {
      alert("업로드는 관리자만 가능합니다.");
      return;
    }

    setUploading(true);

    try {
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${uploadType}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('education-files')
        .upload(filePath, uploadFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('업로드 오류:', error);
        alert(`업로드 실패: ${error.message}`);
        setUploading(false);
        return;
      }

      // 업로드 성공
      alert("파일이 업로드되었습니다!");
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadFileName("");
      fetchFiles();
    } catch (error: any) {
      console.error('업로드 예외:', error);
      alert(`업로드 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };


  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
        <MemberHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto mb-4"></div>
            <p className="text-slate-600">로딩 중...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <MemberHeader />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-32">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                설계사 교육방
              </h1>
              <p className="text-xl text-slate-600">
                어메이징 사업부 설계사 전용 교육 콘텐츠
              </p>
            </div>
            {userProfile?.is_admin && (
              <button
                onClick={() => {
                  if (!userProfile?.is_admin) {
                    alert("업로드는 관리자만 가능합니다.");
                    return;
                  }
                  setShowUploadModal(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-electric-blue to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Upload className="w-5 h-5" />
                <span>업로드</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* 동영상 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Video className="w-6 h-6 text-electric-blue" />
            <h2 className="text-2xl font-bold text-slate-900">교육 동영상</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.filter(f => f.type === 'video').length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                업로드된 동영상이 없습니다.
              </div>
            ) : (
              files.filter(f => f.type === 'video').map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50"
                >
                  <div className="aspect-video bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <video
                      src={file.url}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 truncate">
                    {file.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {new Date(file.uploaded_at).toLocaleDateString('ko-KR')}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* 자료 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-electric-blue" />
            <h2 className="text-2xl font-bold text-slate-900">교육 자료</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.filter(f => f.type === 'document').length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                업로드된 자료가 없습니다.
              </div>
            ) : (
              files.filter(f => f.type === 'document').map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 cursor-pointer"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-center truncate text-sm">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500 text-center">
                    {new Date(file.uploaded_at).toLocaleDateString('ko-KR')}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* 업로드 모달 - 관리자만 접근 가능 */}
      {showUploadModal && userProfile?.is_admin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 shadow-2xl border border-slate-200/50 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">파일 업로드</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                  setUploadFileName("");
                }}
                className="text-slate-500 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  업로드 유형
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setUploadType('video')}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                      uploadType === 'video'
                        ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Video className="w-5 h-5 mx-auto mb-1" />
                    동영상
                  </button>
                  <button
                    onClick={() => setUploadType('document')}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                      uploadType === 'document'
                        ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    자료
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  파일 선택
                </label>
                <label className="block w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-electric-blue transition-colors text-center">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept={uploadType === 'video' ? 'video/*' : 'application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'}
                  />
                  {uploadFileName ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-900">{uploadFileName}</span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <span className="text-slate-600">클릭하여 파일 선택</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                    setUploadFileName("");
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                  disabled={uploading}
                >
                  취소
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || uploading}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "업로드 중..." : "업로드"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
