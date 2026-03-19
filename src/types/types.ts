export interface RouteMeta {
  title?: string;
  breadcrumb?: string;
  label?: string;
  icon?: string; // 👈 icon name ต้องตรงกับ Lucide ชื่อคลาส
}

// import type { Dispatch, SetStateAction } from 'react'
// import type { RegisterSWOptions } from 'vite-plugin-pwa/types'

// export type { RegisterSWOptions }
// declare module 'virtual:pwa-register/react' {

//   export function useRegisterSW(options?: RegisterSWOptions): {
//     needRefresh: [boolean, Dispatch<SetStateAction<boolean>>]
//     offlineReady: [boolean, Dispatch<SetStateAction<boolean>>]
//     updateServiceWorker: (reloadPage?: boolean) => Promise<void>
//   }
// }