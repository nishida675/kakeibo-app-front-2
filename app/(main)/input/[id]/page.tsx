"use client";

import NewBalanceForm from '@/components/NewBalanceForm/NewBalanceForm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLoginUser } from "@/components/hooks/useLoginUser";
import MessageDialog from '@/components/Modal';

export const runtime = "edge";

const InputPage = () => {
  const [id, setId] = useState<string>('');
  const params = useParams();
  const { loginUser, setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(false);

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
      setId(params.id);
    } else if (Array.isArray(params.id)) {
      setId(params.id[0]);
    } else {
      setId(""); // デフォルト値を設定
    }
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    if (id) {
      setLoginUser(id);
    }
    setLoading(false);
  }, [id, setLoginUser]);

  const userId = loginUser ? loginUser : "なし";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-col justify-center py-20">
      <MessageDialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        title={title}
        message={message}
        color={color}
      />
      <h2 className="text-center text-2xl font-bold">収支登録</h2>
      <NewBalanceForm id={id} setIsOpen={setIsOpen} setTitle={setTitle} setMessage={setMessage} setColor={setColor}/>
    </div>
  )
}

export default InputPage;
