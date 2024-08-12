"use server";

import { auth, signIn, signOut } from "@/auth";

export async function ServerSignIn(provider: any) {
  await signIn(provider);
}

export async function ServerSignOut() {
  await signOut();
}

const API_URL = 'https://kakeibo-1.fly.dev';
// const API_URL = 'http://0.0.0.0:8080';

export async function SpringSignIn(name: string, email: string) {
  try {
    const requestBody = {
      name: name ?? "",
      email: email ?? "",
    };

    const response = await fetch(`${API_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // レスポンスデータをコンソールに出力
    console.log("Received response data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function InputBalance(userId: string, productName: string, dueDate: string, price: string, category: string) {
  try {
    const requestBody = {
      userId: userId ?? "",
      balanceName: productName ?? "",
      date: dueDate ?? "",
      price: price ?? "",
      category: category ?? "",
    };

    // リクエストボディをコンソールに出力
    console.log("Sending request with body:", requestBody);

    const response = await fetch(`${API_URL}/api/inputBalance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // レスポンスデータをコンソールに出力
    console.log("Received response data:", data);

   
  } catch (error) {
    console.error("Error fetching data:", error);
    
  }
}


export async function getBalanceYear(userId: string, dataYear: string) {
  try {
    // クエリパラメータを作成
    const queryParams = new URLSearchParams({
      userId: userId ?? "",
      dataYear: dataYear ?? "",
    });

    const response = await fetch(`${API_URL}/api/getYear?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // レスポンスデータをコンソールに出力
    console.log("Received response data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}



export async function getBalanceMonth(userId: string) {
  try {
    // クエリパラメータを作成
    const queryParams = new URLSearchParams({
      userId: userId ?? "",
    });

    const response = await fetch(`${API_URL}/api/getMonth?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // レスポンスデータをコンソールに出力
    console.log("Received response data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function DeleteBalance(userId: string, balanceId: string) {
  try {
    const response = await fetch(`${API_URL}/api/deleteBalance/${userId}/${balanceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Delete request successful");
    return true; // 成功したことを示すためにtrueを返す
  } catch (error) {
    console.error("Error deleting balance:", error);
    return false; // エラーが発生した場合はfalseを返す
  }
}


export async function EditBalance(userId: string, balanceId: string, productName: string, dueDate: string, price: string, category: string) {
  try {
    const requestBody = {
      userId: userId ?? "",
      balanceId: balanceId ?? "",
      balanceName: productName ?? "",
      date: dueDate ?? "",
      price: price ?? "",
      category: category ?? "",
    };

    // リクエストボディをコンソールに出力
    console.log("Sending request with body:", requestBody);

    const response = await fetch(`${API_URL}/api/editBalance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("edit request successful");
    return true; // 成功したことを示すためにtrueを返す
  } catch (error) {
    console.error("Error deleting balance:", error);
    return false; // エラーが発生した場合はfalseを返す
  }
}