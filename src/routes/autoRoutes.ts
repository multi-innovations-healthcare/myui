/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, lazy, type ComponentType } from 'react';
import type { RouteMeta } from '@/types/types';

// ✅ ใช้ glob จาก /src โดยตรง ไม่ใช้ alias @ เพื่อหลีกเลี่ยง path mismatch ตอน build
const pageModules = import.meta.glob('/src/pages/**/page.tsx');
const metaModules = import.meta.glob('/src/pages/**/metadata.ts', { eager: true }) as Record<string, { default: RouteMeta }>;
const layoutModules = import.meta.glob('/src/pages/**/layout.tsx');
const loadingModule = import.meta.glob('/src/pages/loading.tsx', { eager: true });
const errorModule = import.meta.glob('/src/pages/error.tsx', { eager: true });

// ✅ แปลง path ให้เป็นแบบ dynamic route (ใช้ :param)
function convertNextStylePath(path: string): string {
  return path
    .replace(/^.*\/pages/, '') // ลบ /src/pages
    .replace(/\/page\.tsx$/, '') // ตัด page.tsx
    .replace(/\[(.+?)\]/g, ':$1') // dynamic param
    .replace(/\/index$/, '') // index.tsx = root
    .replace(/\\/g, '/'); // สำหรับ Windows
}

// ✅ หา layout ใกล้เคียงที่สุดจาก path
function findNearestLayout(routePath: string): (() => Promise<{ default: ComponentType<any> }>) | undefined {
  const segments = routePath.split('/').filter(Boolean);
  while (segments.length > 0) {
    const layoutPath = `/src/pages/${segments.join('/')}/layout.tsx`;
    if (layoutPath in layoutModules) return layoutModules[layoutPath] as () => Promise<{ default: ComponentType<any> }>;
    segments.pop();
  }
  const rootLayoutPath = '/src/pages/layout.tsx';
  return rootLayoutPath in layoutModules
    ? layoutModules[rootLayoutPath] as () => Promise<{ default: ComponentType<any> }>
    : undefined;
}

// ✅ โครงสร้าง RouteItem
export interface RouteItem {
  path: string;
  element: React.LazyExoticComponent<ComponentType<any>>;
  meta?: RouteMeta;
  layout?: () => Promise<{ default: ComponentType<any> }>;
}

// ✅ Generate routes ทั้งหมดจาก pageModules
export const RoutesApp: RouteItem[] = Object.entries(pageModules)
  .filter(([, loader]) => typeof loader === 'function')
  .map(([path, loader]) => {
    const routePath = convertNextStylePath(path);

    // ✅ หาคีย์ของ metadata โดยไม่ hardcode path
    const metaKey = Object.keys(metaModules).find((key) => key.endsWith(`${routePath}/metadata.ts`));
    const meta = {
      ...metaKey ? metaModules[metaKey]?.default : {},
      breadcrumb: routePath,
    };

    const layout = findNearestLayout(routePath);

    return {
      path: routePath,
      element: lazy(loader as () => Promise<{ default: ComponentType<any> }>),
      meta,
      layout,
    };
  });

// ✅ Loading fallback
export const GlobalLoading =
  (loadingModule['/src/pages/loading.tsx'] as { default: ComponentType } | undefined)?.default ??
  (() => createElement('div', null, 'Loading...'));

// ✅ Error fallback
export const GlobalError =
  (errorModule['/src/pages/error.tsx'] as { default: ComponentType } | undefined)?.default ??
  (() => createElement('div', null, 'Something went wrong'));
