// src/routes/routesApp.tsx
import { lazy, type ComponentType, type ReactNode } from 'react';
import { Home } from 'lucide-react';


// โครงสร้างข้อมูลรวม
export interface RouteItem {
  key: string;
  path?: string;
  label: string;
  icon?: ReactNode;
  element?: ComponentType<{ children?: ReactNode }>;
  children?: RouteItem[];
  color?: string;
}

// Function to generate consistent color based on route key
const generateConsistentColor = (key: string): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#4c9c77', '#1342de',
    '#DDA0DD', '#98D8C8', '#cfa600', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#E76F51', '#F72585', '#7209B7',
    '#3A0CA3', '#4361EE', '#4CC9F0', '#0d941f', '#FFBE0B',
    '#FB5607', '#FF006E', '#8338EC', '#3A86FF', '#0cd196'
  ];
  
  // Use the route key to generate a consistent index
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// ข้อมูลรวมของเส้นทางและเมนู
export const combinedData: RouteItem[] = [
  {
    key: "HOME",
    path: "/mydata-lite/home",
    label: "หน้าหลัก",
    icon: <Home />,
    element: lazy(() => import("@/pages/home/page")),
    color: generateConsistentColor("HOME")
  },
  // {
  //   key: "A",
  //   path: "/mydata-lite/datastat",
  //   label: "เกี่ยวกับข้อมูล",
  //   icon: <IconMaterialSymbolsDatabase />,
  //   color: generateConsistentColor("A"),
  //   children: [
  //     { key: "A01", path: "/mydata-lite/datastat", label: "ความถูกต้องของข้อมูล", color: generateConsistentColor("A01") },
  //     { key: "A02", path: "/mydata-lite/homegis", label: "ความครอบคลุมการบันทึกพิกัดบ้าน", color: generateConsistentColor("A02") },
  //     { key: "A03", path: "/mydata-lite/persondup", label: "ข้อมูลประชากรซ้ำซ้อน", color: generateConsistentColor("A03") },
  //   ],
  // }
];

// สร้าง RoutesApp จากข้อมูลรวม
export const RoutesApp = combinedData
  .flatMap((item) => (item.children ? item.children : [item]))
  .filter((item) => item.element) // กรองเฉพาะรายการที่มี element
  .map(({ path, element }) => ({ path, element }));

// สร้าง menuItems จากข้อมูลรวม

export const menuItems = combinedData.map((item) => ({
  key: item.key,
  label: item.label,
  icon: item.icon,
  path: item.path,
  color: item.color,
  children: item.children?.map((child) => ({
    key: child.key,
    label: child.label,
    path: child.path,
    color: child.color,
  })),
}));

