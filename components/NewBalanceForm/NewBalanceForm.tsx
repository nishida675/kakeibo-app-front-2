"use client";

import { useState, useCallback } from "react";
import { InputBalance } from "../serverActions";
import { useRouter } from "next/navigation"; // next/navigation をインポートする
import { useLoginUser } from "../hooks/useLoginUser";


const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;
  const value = target.value;
  if (!/^\d*\.?\d*$/.test(value)) {
    target.value = value.slice(0, -1);
  }
};

const NewBalanceForm = ({ id, setIsOpen, setTitle, setMessage, setColor  }: { id: string,  setIsOpen: (isOpen: boolean) => void, setTitle: (title: string)  => void, setMessage: (title: string)  => void, setColor: (color: boolean)  => void  }) => {
  const [formData, setFormData] = useState({
    userId: id,
    category: "",
    productName: "",
    price: "",
    dueDate: "",
  });

  const router = useRouter();
  const { loginUser } = useLoginUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const skill = {
      id: loginUser ? loginUser : null, // スキルIDの例
    };
    try {
      await InputBalance(
        formData.userId,
        formData.productName,
        formData.dueDate,
        formData.price,
        formData.category
      );
      setFormData({
        userId: id,
        category: "",
        productName: "",
        price: "",
        dueDate: "",
      });
      setIsOpen(true);
      setTitle("成功");
      setMessage("登録しました");
      setColor(true);
      router.push(`/input/${skill.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsOpen(true);
      setTitle("失敗");
      setMessage("登録できませんでした");
      setColor(false);
      router.push(`/input/${skill.id}`);
    }
  }, [formData, loginUser, router, id, setIsOpen, setTitle, setMessage, setColor]);

  return (
    <div className="mt-10 mx-auto w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="userId" value={id} />
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            カテゴリー
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          >
            <option value="">選択してください</option>
            <option value="収入">収入</option>
            <option value="日用品費">日用品費</option>
            <option value="被服費">被服費</option>
            <option value="交際費">交際費</option>
            <option value="食費">食費</option>
            <option value="住宅費">住宅費</option>
            <option value="水道光熱費">水道光熱費</option>
            <option value="交通費">交通費</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div className="mt-6">
          <label htmlFor="productName" className="block text-sm font-medium">
            商品名
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
            value={formData.productName}
            onChange={handleChange}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="price" className="block text-sm font-medium">
            金額
          </label>
          <div className="flex items-center mt-2">
            <input
              type="text" // 変更: type="text" にして handleInput で制限する
              id="price"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
              onInput={handleInput}
            />
            <span className="ml-2">円</span>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium">
            日付
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            min="2020-01-01"
            max="2999-12-31"
            required
            value={formData.dueDate}
            onChange={handleChange}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <button
          type="submit"
          className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm"
        >
          登録
        </button>
      </form>
    </div>
  );
};

export default NewBalanceForm;
