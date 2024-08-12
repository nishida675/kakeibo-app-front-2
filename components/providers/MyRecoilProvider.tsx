// MyRecoilProvider.tsx
"use client"; // クライアントコンポーネントとして設定

import { RecoilRoot } from 'recoil';

export const MyRecoilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
