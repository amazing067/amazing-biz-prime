// components/v2/tools/types.ts
import type { ReactNode } from "react";

export type ToolItem = {
  name: string;
  tag: string;
  desc: string;
  detail: string;
  status: "LIVE" | "AI";
};

export type GroupTag = "portal" | "studio" | "touchpoints" | "infra";

export type ToolGroup = {
  tag: GroupTag;
  label: string;
  sub: string;
  desc: string;
  items: ToolItem[];
};

export type ShowcaseProps = {
  group: ToolGroup;
  index: number; // 0-based, 헤더 번호용
  flip?: boolean; // true면 콜라주 우측·리스트 좌측
  collage: ReactNode; // 그룹별 콜라주 노드(부모가 주입)
};
