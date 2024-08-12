'use client';

import { useSearchParams } from 'next/navigation';
import EditTaskForm from "@/components/EditTaskForm/EditTaskForm";
import { useEffect, useState } from 'react';
import { useLoginUser } from '@/components/hooks/useLoginUser';


const EditPage= () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const balanceId = searchParams.get('balanceId');
  const date = searchParams.get('date');
  const category = searchParams.get('category');
  const balanceName = searchParams.get('balanceName');
  const price = searchParams.get('price');

  const { loginUser, setLoginUser } = useLoginUser();

  console.log({ id, balanceId, date, category, balanceName, price }); 

  useEffect(() => {
    if (id) {
      setLoginUser(id);
    }
  }, [id]);

  if (!id || !balanceId || !date || !category || !balanceName || !price) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">Edit Task</h2>
        <EditTaskForm
          id={id}
          balanceId={balanceId}
          date={date}
          category={category}
          balanceName={balanceName}
          price={parseFloat(price)}
        />
    </div>
  )
}

export default EditPage;
