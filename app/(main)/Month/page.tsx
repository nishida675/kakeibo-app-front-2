"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { getBalanceMonth, SpringSignIn } from "@/components/serverActions";
import { useLoginUser } from "@/components/hooks/useLoginUser";
import { useLoginId } from "@/components/providers/LoginUserProvider";
import { Chart, PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartConfiguration } from "chart.js";
import DataCard from "@/components/DataCard/DataCard";
import React from "react";
import Confirm from "@/components/confirm";
import MessageDialog from '@/components/Modal';
import { useRecoilState } from "recoil";
import { modalState, modal } from "@/components/hooks/modalState";


export const runtime = "edge";

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

interface SessionData {
  id: string; 
}

interface BalanceData {
  categorySums: { [key: string]: { [category: string]: number } };
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

  const name = session?.user?.name ?? "";
  const email = session?.user?.email ?? "";
  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mdata, setMdata] = useState<BalanceData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useRecoilState(modalState);
  const [theme, setTheme] = useRecoilState(modal);
  const [word, setWord] = useRecoilState(modal);
  const [color, setColor] = useRecoilState(modalState);
  const [DeleteFunc, setDeleteFunc] = useState<() => void>(() => () => {});

  useEffect(() => {
    if (status === "authenticated" && name && email && !data) {
      SpringSignIn(name, email)
        .then((response) => {
          if (response?.status === "success") {
            const sessionData: SessionData = { id: response.sessionData.id };
            setData(sessionData);
            setLoginUser(sessionData.id);
          } else {
            console.error("SpringSignIn failed:", response);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("SpringSignIn encountered an error:", error);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [name, email, setLoginUser, data, status]);

  useEffect(() => {
    if (loginUser) {
      getBalanceMonth(loginUser)
        .then((response) => {
          if (response?.status === "success") {
            setMdata(response);
          } else {
            console.error("getBalanceMonth failed:", response);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("getBalanceMonth encountered an error:", error);
          setLoading(false);
        });
    }
  }, [loginUser]);

  useEffect(() => {
    if (mdata) {
      const categories = Object.entries(mdata.categorySums).map(
        ([, categoryObj]) => Object.keys(categoryObj)[0]
      );
      const values = Object.entries(mdata.categorySums).map(
        ([, categoryObj]) => Object.values(categoryObj)[0]
      );

      const ctx = chartRef.current?.getContext("2d");
      if (ctx) {
        const polarConfig: ChartConfiguration = {
          type: "polarArea",
          data: {
            labels: categories,
            datasets: [
              {
                label: "月別結果",
                data: values,
                backgroundColor: ["#ff0000", "#0000ff", "#ffff00", "#008000", "#ffa500"],
              },
            ],
          },
        };
        const polarChart = new Chart(ctx, polarConfig);

        return () => {
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
      <MessageDialog
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        title={theme}
        message={word}
        color={color}
      />
      <Confirm
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          console.log("Confirm OK clicked");
          DeleteFunc();
        }}
        onNo={() => setIsOpen(false)}
        title={title}
        message={message}
      />
      <div className="w-full max-w-4xl">
        <canvas id="lineChart" ref={chartRef} className="w-full h-96 sm:h-96 md:h-96 lg:h-[500px]"></canvas>
      </div>
      {mdata && loginUser ? (
        mdata.monthData.map((item) => (
          <React.Fragment key={item.balanceId}>
            <DataCard
              data={{
                id: loginUser.toString(),
                balanceId: item.balanceId.toString(),
                date: item.date,
                category: item.category,
                balanceName: item.balanceName,
                price: item.price,
              }}
              setIsOpen={setIsOpen} setTitle={setTitle} setMessage={setMessage} setDeleteFunc={setDeleteFunc}
            />
            <br />
          </React.Fragment>
        ))
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
};

export default MonthPage;
