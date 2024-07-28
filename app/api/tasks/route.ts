import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  // データを取得する処理
  const data = { message: 'Hello, world!' };

  // JSONレスポンスを返す
  return NextResponse.json(data);
};
