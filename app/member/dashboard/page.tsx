"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  LogOut,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import MemberHeader from "@/components/MemberHeader";
import { supabase } from "@/lib/supabase";

interface Member {
  id: string;
  username: string;
  name: string;
  phone: string;
  branch: string;
  office: string;
  position: string;
  approved: boolean;
  is_admin?: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterApproved, setFilterApproved] = useState<string>("all");
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchMembers();
    }
  }, [userProfile, filterApproved, filterBranch]);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/member");
        return;
      }

      // 사용자 프로필 가져오기
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        setError("프로필을 불러올 수 없습니다.");
        return;
      }

      // 관리자가 아닌 사용자는 접근 불가
      if (!profile.is_admin) {
        alert("관리자만 접근할 수 있는 페이지입니다.");
        router.push("/member");
        return;
      }

      setUserProfile(profile);
    } catch (err: any) {
      setError(err.message || "인증 확인 중 오류가 발생했습니다.");
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (filterApproved !== "all") {
        params.append("approved", filterApproved);
      }
      if (filterBranch !== "all") {
        params.append("branch", filterBranch);
      }

      const response = await fetch(`/api/members?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원 목록을 불러오는 중 오류가 발생했습니다.");
      }

      setMembers(data.members || []);
    } catch (err: any) {
      setError(err.message || "회원 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string, approved: boolean) => {
    if (!confirm(approved ? "이 회원을 승인하시겠습니까?" : "이 회원의 승인을 취소하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch("/api/members/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, approved }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "승인 상태를 변경하는 중 오류가 발생했습니다.");
      }

      alert(data.message);
      fetchMembers();
    } catch (err: any) {
      alert(err.message || "승인 상태를 변경하는 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (userId: string, name: string) => {
    if (!confirm(`정말로 ${name}님을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/members/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원을 삭제하는 중 오류가 발생했습니다.");
      }

      alert(data.message);
      fetchMembers();
    } catch (err: any) {
      alert(err.message || "회원을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
  };

  const handleSaveEdit = async (updatedData: Partial<Member>) => {
    if (!editingMember) return;

    try {
      const response = await fetch(`/api/members/${editingMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원 정보를 수정하는 중 오류가 발생했습니다.");
      }

      alert(data.message);
      setEditingMember(null);
      fetchMembers();
    } catch (err: any) {
      alert(err.message || "회원 정보를 수정하는 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/member");
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    return matchesSearch;
  });

  const pendingCount = members.filter(m => !m.approved).length;
  const approvedCount = members.filter(m => m.approved).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <MemberHeader />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-32">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                회원 관리
              </h1>
              <p className="text-xl text-slate-600">
                어메이징 사업부 회원 관리 대시보드
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              로그아웃
            </button>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass rounded-xl p-4 border border-slate-200/50">
              <div className="text-sm text-slate-600 mb-1">전체 회원</div>
              <div className="text-2xl font-bold text-slate-900">{members.length}명</div>
            </div>
            <div className="glass rounded-xl p-4 border border-slate-200/50">
              <div className="text-sm text-slate-600 mb-1">승인 대기</div>
              <div className="text-2xl font-bold text-orange-600">{pendingCount}명</div>
            </div>
            <div className="glass rounded-xl p-4 border border-slate-200/50">
              <div className="text-sm text-slate-600 mb-1">승인 완료</div>
              <div className="text-2xl font-bold text-green-600">{approvedCount}명</div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="glass rounded-xl p-4 border border-slate-200/50 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="이름, 아이디, 전화번호로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                </div>
              </div>
              <select
                value={filterApproved}
                onChange={(e) => setFilterApproved(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              >
                <option value="all">전체 승인 상태</option>
                <option value="false">승인 대기</option>
                <option value="true">승인 완료</option>
              </select>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              >
                <option value="all">전체 본부</option>
                <option value="067본부">067본부</option>
                <option value="290본부">290본부</option>
                <option value="292본부">292본부</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* 회원 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-electric-blue mb-4" />
            <p className="text-slate-600">회원 목록을 불러오는 중...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-12 glass rounded-xl border border-slate-200/50">
            <Users className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600">회원이 없습니다.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      아이디
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      본부/지사
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      직책
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      전화번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      승인 상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-700 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {member.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <div>{member.branch}</div>
                        <div className="text-xs text-slate-500">{member.office}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {member.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.approved ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            승인됨
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <XCircle className="w-3 h-3 mr-1" />
                            대기중
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {new Date(member.created_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {member.is_admin ? (
                          <span className="text-slate-400 text-xs">관리자</span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(member.id, !member.approved)}
                              className={member.approved 
                                ? "flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 hover:shadow-sm transition-all font-medium text-xs" 
                                : "flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 hover:shadow-sm transition-all font-medium text-xs"
                              }
                              title={member.approved ? "승인 취소" : "승인"}
                            >
                              {member.approved ? (
                                <>
                                  <XCircle className="w-4 h-4" />
                                  <span>취소</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  <span>승인</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(member)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 hover:shadow-sm transition-all font-medium text-xs"
                              title="수정"
                            >
                              <Edit className="w-4 h-4" />
                              <span>수정</span>
                            </button>
                            <button
                              onClick={() => handleDelete(member.id, member.name)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 hover:shadow-sm transition-all font-medium text-xs"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>삭제</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* 수정 모달 */}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleSaveEdit}
        />
      )}
    </main>
  );
}

// 수정 모달 컴포넌트
function EditMemberModal({ 
  member, 
  onClose, 
  onSave 
}: { 
  member: Member; 
  onClose: () => void; 
  onSave: (data: Partial<Member>) => void;
}) {
  const [formData, setFormData] = useState({
    name: member.name,
    phone: member.phone,
    branch: member.branch,
    office: member.office,
    position: member.position,
  });

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');
    
    // 최대 11자리까지만 허용
    const limitedNumbers = numbers.slice(0, 11);
    
    // 3-4-4 형식으로 하이픈 추가
    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const branchData = {
    "067본부": [
      "067본부 직할지사",
      "김유겸 지사",
      "류명화 지사",
      "류화자 지사",
      "이주은 지사",
      "엄정화 지사",
      "한채은 지사",
    ],
    "290본부": [
      "290본부 직할지사",
      "김미라 지사",
      "한희영 지사",
      "채혜빈 지사",
      "천민아 지사",
      "이수진 지사",
      "송경호 지사",
      "류진순 지사",
    ],
    "292본부": [
      "292본부 직할지사",
      "신정민 지사",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-6 max-w-md w-full border border-slate-200/50"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">회원 정보 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">전화번호</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength={13}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              placeholder="010-1234-5678"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">본부</label>
            <select
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value, office: "" })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            >
              <option value="067본부">067본부</option>
              <option value="290본부">290본부</option>
              <option value="292본부">292본부</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">지사</label>
            <select
              value={formData.office}
              onChange={(e) => setFormData({ ...formData, office: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            >
              {branchData[formData.branch as keyof typeof branchData]?.map((office) => (
                <option key={office} value={office}>{office}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">직책</label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            >
              <option value="FC">FC</option>
              <option value="팀장">팀장</option>
              <option value="지사장">지사장</option>
              <option value="본부장">본부장</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-electric-blue to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              저장
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
