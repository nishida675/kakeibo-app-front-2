"use client";

import { useState } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import EditButton from "./EditButton/EditButton";

interface Data {
  data: {
    id: string;
    balanceId: string;
    date: string;
    category: string;
    balanceName: string;
    price: number;
  };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setDeleteFunc: React.Dispatch<React.SetStateAction<() => void>>;
}

const DataCard: React.FC<Data> = ({ data, setIsOpen, setTitle, setMessage, setDeleteFunc }) => {
  return (
    <div className="w-72 h-48 p-4 bg-white rounded-md shadow-2xl flex flex-col justify-between">
      <header>
        <h1 className="text-lg font-semibold">{data.category}</h1>
        <div className="mt-1 text-sm line-clamp-3">{data.balanceName}</div>
        <div className="mt-1 text-sm line-clamp-3">{data.price}円</div>
      </header>
      <div>
        <div className="text-sm">{data.date}</div>
        <div className="flex justify-end items-center">
          <div className="flex gap-4">
            <EditButton 
              id={data.id} 
              balanceId={data.balanceId}
              date={data.date}
              category={data.category}
              balanceName={data.balanceName}
              price={data.price}
              setTitle={setTitle}
              setMessage={setMessage}
              />
            <DeleteButton
              id={data.id}
              balanceId={data.balanceId}
              setIsOpen={setIsOpen}
              setTitle={setTitle}
              setMessage={setMessage}
              setDeleteFunc={setDeleteFunc}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
