'use client';

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { getBalanceMonth, SpringSignIn } from "@/components/serverActions";
import { useLoginUser } from "@/components/hooks/useLoginUser";
import { useLoginId } from "@/components/providers/LoginUserProvider";

import { Chart, PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

interface SessionData {
  id: string; // もしくは number など、適切な型
}

interface BalanceData {
  categorySums: {
    [key: string]: {
      [category: string]: number;
    };
  };
  month: string;
  monthData: Array<{
    balanceId: number;
    userId: number;
    balanceName: string;
    date: string;
    price: number;
    category: string;
  }>;
  year: string;
  status: string;
}

const MonthPage = () => {
  const { data: session, status } = useSession();
  const { setLoginUser } = useLoginId();
  const { loginUser } = useLoginUser();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const name = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';
  console.log("Session user name and email: ", name, email);
  const [data, setData] = useState<{ id?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mdata, setMdata] = useState<BalanceData | null>(null);
  
  // useEffectを一度だけ実行するために、依存関係としてnameとemailを指定
  useEffect(() => {
    if (status === "authenticated" && name && email && data?.id === undefined) { // データが既に存在するか確認
      SpringSignIn(name, email).then((response) => {
        if (response?.status === 'success') {
          const sessionData: SessionData = { id: response.sessionData.id }; // 型を明示的に指定
          setData(sessionData);
          setLoginUser(sessionData.id);
          console.log("Login user set: ", sessionData.id);
        } else {
          console.error('SpringSignIn failed:', response);
        }
        setLoading(false);
      }).catch((error) => {
        console.error('SpringSignIn encountered an error:', error);
        setLoading(false);
      });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [name, email, setLoginUser, data, status]);

  useEffect(() => {
    if (loginUser) {
      getBalanceMonth(loginUser).then((response) => {
        if (response?.status === 'success') {
          setMdata(response);
        } else {
          console.error('SpringSignIn failed:', response);
        }
        setLoading(false);
      }).catch((error) => {
        console.error('SpringSignIn encountered an error:', error);
        setLoading(false);
      });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [loginUser]);

  useEffect(() => {
    if (mdata) {
      const categories = Object.entries(mdata.categorySums).map(([rank, categoryObj]) =>
        Object.keys(categoryObj)[0]
      );
      const values = Object.entries(mdata.categorySums).map(([rank, categoryObj]) =>
        Object.values(categoryObj)[0]
      );

      const ctx = chartRef.current?.getContext('2d');
      if (ctx) {
        const polarConfig: ChartConfiguration = {
          type: 'polarArea',
          data: {
            labels: categories,
            datasets: [{
              label: '月別結果',
              data: values,
              backgroundColor: [
                '#ff0000',
                '#0000ff',
                '#ffff00',
                '#008000',
                '#ffa500',
              ]
            }]
          },
        };
        const polarChart = new Chart(ctx, polarConfig);

        return () => {
          // コンポーネントがアンマウントされるときにチャートをクリーンアップ
          polarChart.destroy();
        };
      }
    }
  }, [mdata]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>MonthPage</div>
      <p>現在のIDは: {loginUser}</p>
      <p>現在のID: {data?.id ?? "ない"}</p>
      {session ? (
        <>
          <p>現在のname: {session.user?.name ?? ''}</p>
          <p>現在のemail: {session.user?.email ?? ''}</p>
        </>
      ) : (
        <p>セッションが存在しません</p>
      )}
       <div>
        {mdata ? (
          <>
            <ul>
              {Object.entries(mdata.categorySums).map(([rank, categoryObj]) => (
                <li key={rank}>
                  {rank}: 
                  {Object.entries(categoryObj).map(([category, value]) => (
                    <span key={category}>
                      {category}: {value as number}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
            <div>
              <h3>Month Data {mdata.year}年{mdata.month}月</h3>
              <ul>
                {mdata.monthData.map(item => (
                  <li key={item.balanceId}>
                    {item.date}: {item.balanceName} ({item.category}) - {item.price}円
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>データがありません</p>
        )}
      </div>
      <div className="w-full max-w-4xl">
        <canvas id="lineChart" ref={chartRef} className="w-full h-96 sm:h-96 md:h-96 lg:h-[500px]"></canvas>
      </div>
    </div>
  );
};

export default MonthPage;
