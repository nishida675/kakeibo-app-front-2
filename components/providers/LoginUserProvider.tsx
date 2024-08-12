'use client';
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
    memo,
    useContext,
  } from "react";
  
  type LoginUser = string;
  
  export type LoginUserContextType = {
    loginUser: LoginUser | null; 
    setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
  };
  
  export const LoginUserContext = createContext<LoginUserContextType>(
    {} as LoginUserContextType
  );
  
  export const LoginUserProvider = memo((props: { children: ReactNode }) => {
    const { children } = props;
    const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  
    return (
      <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
        {children}
      </LoginUserContext.Provider>
    );
  });

  LoginUserProvider.displayName = 'LoginUserProvider';

  // コンテキストを使用するためのカスタムフック
export const useLoginId = () => useContext(LoginUserContext);