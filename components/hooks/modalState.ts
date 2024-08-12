import { atom } from 'recoil';

// モーダルの開閉状態を管理するatomを定義
export const modalState = atom<boolean>({
  key: 'modalState', // 一意のキーを設定
  default: false, // 初期状態は閉じている状態
});

export const modal = atom<string>({
  key: 'modal', // 一意のキーを設定
  default: "", // 初期状態は閉じている状態
});
