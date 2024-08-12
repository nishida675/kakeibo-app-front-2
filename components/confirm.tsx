import React from 'react';

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  onNo: () => void;
  title: string;
  message: string;
};

const Confirm = (props: ModalProps) => {
  return props.open ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-start mt-10 z-20">
      <div className={`w-80 h-48 p-5 flex flex-col items-start shadow-lg bg-gray-300`}>
        <h1 className="text-xl font-bold mb-5">{props.title}</h1>
        <p className="text-lg mb-5">{props.message}</p>
        <div className="flex mt-auto w-full">
          <button
            className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
            onClick={() => props.onOk()}
          >
            はい
          </button>
          <button
            className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
            onClick={() => props.onNo()}
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Confirm;
