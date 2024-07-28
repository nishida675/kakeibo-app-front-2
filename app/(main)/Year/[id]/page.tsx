"use client";

import { useLoginUser } from "@/components/hooks/useLoginUser";
import { getBalanceYear } from "@/components/serverActions";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto"; 
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BalanceData {
  [key: string]: number; 
}

const YearPage = () => {
  const { loginUser, setLoginUser } = useLoginUser();
  const params = useParams();
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ydata, setYdata] = useState<BalanceData>({});
  const [year, setYear] = useState<string>("");
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
      setId(params.id);
    } else if (Array.isArray(params.id)) {
      setId(params.id[0]);
    } else {
      setId(null);
    }
  }, [params.id]);
  
  useEffect(() => {
    if (id) {
      setLoginUser(id);
    }
  }, [id, setLoginUser]);

  const userId = loginUser ? loginUser : "なし";

  useEffect(() => {
    if (loginUser) {
      getBalanceYear(loginUser, year).then((response) => {
        if (response?.status === 'success') {
          setYdata(response);
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
  }, [year, loginUser]);

  useEffect(() => {
    if (!loading && ydata && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const data = [
          ydata["Month 1"], ydata["Month 2"], ydata["Month 3"], ydata["Month 4"], ydata["Month 5"], ydata["Month 6"],
          ydata["Month 7"], ydata["Month 8"], ydata["Month 9"], ydata["Month 10"], ydata["Month 11"], ydata["Month 12"]
        ];
    
        const positiveData = data.map(value => typeof value === 'number' && value >= 0 ? value : 0);
        const negativeData = data.map(value => typeof value === 'number' && value < 0 ? value : 0);
  
        const allData = [...positiveData, ...negativeData];
        const maxValue = Math.max(...allData);
        const minValue = Math.min(...allData);
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            datasets: [
              {
                data: positiveData,
                label: `プラス貯金額`,
                backgroundColor: 'rgba(0, 0, 255, 0.5)', // 青色を薄く設定
                borderWidth: 1,
                barPercentage: 0.8, // 棒の幅を設定
                categoryPercentage: 1.0, // カテゴリの幅を設定
              },
              {
                data: negativeData,
                label: `マイナス貯金額`,
                backgroundColor: 'rgba(255, 0, 0, 0.5)', // 赤色を薄く設定
                borderWidth: 1,
                barPercentage: 0.8, // 棒の幅を設定
                categoryPercentage: 1.0, // カテゴリの幅を設定
              }
            ]
          },
          options: {
            maintainAspectRatio: false, // 追加
            plugins: {
              datalabels: {
                display: function(context) {
                  const value = context.dataset.data[context.dataIndex];
                  return typeof value === 'number' && value !== 0; // 0またはnullのデータラベルは表示しない
                },
                color: 'black',
                anchor: function(context) {
                  const value = context.dataset.data[context.dataIndex];
                  return typeof value === 'number' && value >= 0 ? 'end' : 'start';
                },
                align: function(context) {
                  const value = context.dataset.data[context.dataIndex];
                  return typeof value === 'number' && value >= 0 ? 'end' : 'start';
                },
                formatter: function(value) {
                  return value + ' 円'; // データラベルに「円」を追加
                }
              },
              legend: {
                position: 'top', // 凡例の位置（'top', 'left', 'bottom', 'right'）
                align: 'center', // 凡例の位置（'start', 'center', 'end'）
                labels: {
                  padding: 10 // 凡例とグラフ本体の間隔
                }
              }
            },
            scales: {
              x: {
                stacked: true, // X軸の積み上げ設定
                ticks: {
                  padding: 20, // ラベルとバーの間隔
                }
              },
              y: {
                stacked: true, // Y軸の積み上げ設定
                min: minValue - Math.abs(minValue) * 0.5, // 最小値に10%の余裕を持たせる
                max: maxValue + Math.abs(maxValue) * 0.5, // 最大値に10%の余裕を持たせる
                ticks: {
                  padding: 10, 
                  callback: function(value) {
                    return value + ' 円'; // Y軸のラベルに「円」を追加
                  }
                },
                grid: {
                  color: (context) => {
                    return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)'; // Y軸0の線を濃い黒にする
                  },
                  lineWidth: (context) => {
                    return context.tick.value === 0 ? 2 : 1; // Y軸0の線を太くする
                  }
                }
              }
            }
          },
          plugins: [ChartDataLabels] // プラグインを追加
        });
      }
    }
  }, [loading, ydata]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">月ごとの推移</div>
      <div className="w-full max-w-4xl">
        <canvas id="lineChart" ref={chartRef} className="w-full h-96 sm:h-96 md:h-96 lg:h-[500px]"></canvas>
      </div>
    </div>
  );
};

export default YearPage;
