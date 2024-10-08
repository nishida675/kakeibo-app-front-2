'use client';
import { useLoginUser } from "@/components/hooks/useLoginUser";
import React from "react";

export const runtime = "edge";

const ProtectedPage = () => {
  const { loginUser } = useLoginUser();
  return (
    <div>
      <div>ProtectedPage</div>
      <div>id: {loginUser ?? "なし"}</div>
    </div>
  );
};

export default ProtectedPage;
