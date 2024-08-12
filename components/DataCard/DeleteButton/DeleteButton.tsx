"use client";

import { useLoginUser } from "@/components/hooks/useLoginUser";
import { DeleteBalance } from "@/components/serverActions";
import { useRouter } from "next/navigation"; 
import { useCallback } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface DeleteButtonProps {
  id: string;
  balanceId: string;
  setIsOpen: (isOpen: boolean) => void;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
  setDeleteFunc: (DeleteFunc: () => void) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, balanceId, setIsOpen, setTitle, setMessage, setDeleteFunc}) => {
 const { loginUser } = useLoginUser();
 const router = useRouter();
  const handleDelete = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const skill = {
      id: loginUser ? loginUser : null, // スキルIDの例
    };
      setIsOpen(true);
      setTitle("確認");
      setMessage("本当に削除しますか？");
      setDeleteFunc(() => () => {
        console.log("Deleting item with id:", id); // idをここで使用
        DeleteBalance(id, balanceId);
        setIsOpen(false);
        router.push(`/Month`);
      });
  }, [loginUser, router, balanceId, id, setDeleteFunc, setIsOpen, setMessage, setTitle]);

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="hover:text-gray-700 text-lg cursor-pointer">
        <FaTrashAlt />
      </button>
    </form>
  );
};

export default DeleteButton;
