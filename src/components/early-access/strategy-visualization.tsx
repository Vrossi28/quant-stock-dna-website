"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LineChart, BarChart, Activity, TrendingUp, Zap } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import i18n from "@/localization/i18n";
import { themeInUse } from "../theme-provider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const generateChartData = (length: number, volatility: number) => {
  let lastValue = 100 + Math.random() * 50;
  const data = [lastValue];

  for (let i = 1; i < length; i++) {
    const change = (Math.random() - 0.48) * volatility;
    lastValue = Math.max(lastValue + change, 10);
    data.push(lastValue);
  }

  return data;
};

interface TradingSignal {
  position: number;
  type: "buy" | "sell" | "alert";
  value: number;
}

interface Strategy {
  id: number;
  name: string;
  color: string;
  active: boolean;
}

export default function StrategyVisualization() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<number[]>([]);
  const [winRate, setWinRate] = useState<number>(68);
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([
    { id: 1, name: "moving.average", color: "#4f46e5", active: true },
    { id: 2, name: "rsi.strategy", color: "#16a34a", active: false },
    { id: 3, name: "volatility.breakout", color: "#ea580c", active: false },
  ]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const locale = i18n.language === "pt" ? "pt-BR" : "en-US";
  const animationRef = useRef<number>(0);
  const dataLength = 30;

  const generateLabels = (length: number) => {
    const labels = [];
    const now = new Date();

    for (let i = length - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      labels.push(
        date.toLocaleDateString(locale, { month: "short", day: "numeric" })
      );
    }

    return labels;
  };

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const initialData = generateChartData(dataLength, 3);
    setChartData(initialData);

    const newSignals: TradingSignal[] = [];
    for (let i = 0; i < 5; i++) {
      const position = 5 + Math.floor(Math.random() * (dataLength - 10));
      const type =
        Math.random() > 0.5 ? "buy" : Math.random() > 0.5 ? "sell" : "alert";
      newSignals.push({
        position,
        type,
        value: initialData[position],
      });
    }
    setSignals(newSignals);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const updateChart = () => {
    setChartData((prev) => {
      const newData = [...prev];
      const lastValue = newData[newData.length - 1];
      const change = (Math.random() - 0.5) * 1.5;
      newData[newData.length - 1] = Math.max(lastValue + change, 10);
      return newData;
    });

    animationRef.current = requestAnimationFrame(updateChart);
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(animationRef.current);
    setHoveredPoint(null);
  };

  const toggleStrategy = (id: number) => {
    setStrategies((prev) =>
      prev.map((strategy) =>
        strategy.id === id
          ? { ...strategy, active: !strategy.active }
          : strategy
      )
    );

    setIsOptimizing(true);
    setTimeout(() => {
      setChartData(generateChartData(dataLength, 3));
      setIsOptimizing(false);
      setWinRate(getRandomNumber(65, 95));
    }, 1500);
  };

  const isDark = themeInUse() == "dark";

  const data = {
    labels: generateLabels(dataLength),
    datasets: [
      {
        label: t("stock.price"),
        data: chartData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: (ctx: { dataIndex: any }) => {
          const index = ctx.dataIndex;
          return signals.some((signal) => signal.position === index)
            ? 6
            : hoveredPoint === index
            ? 5
            : 0;
        },
        pointBackgroundColor: (ctx: { dataIndex: any }) => {
          const index = ctx.dataIndex;
          const signal = signals.find((s) => s.position === index);
          if (signal) {
            return signal.type === "buy"
              ? "#16a34a"
              : signal.type === "sell"
              ? "#dc2626"
              : "#f59e0b";
          }
          return "#3b82f6";
        },
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        options: {
          legend: {
            labels: {
              fontColor: "blue",
              fontSize: 18,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: "green",
                  fontSize: 18,
                  stepSize: 1,
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "purple",
                  fontSize: 14,
                  stepSize: 1,
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const signal = signals.find((s) => s.position === index);
            if (signal) {
              return signal.type === "buy"
                ? t("buy.signal")
                : signal.type === "sell"
                ? t("sell.signal")
                : t("alert");
            }
            return `${t("price")}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "white" : "black",
        },
      },
      y: {
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          callback: (value: any) => `$${value}`,
          color: isDark ? "white" : "black",
        },
      },
    },
    onHover: (_: any, elements: any[]) => {
      if (elements.length > 0) {
        setHoveredPoint(elements[0].index);
      } else {
        setHoveredPoint(null);
      }
    },
  };

  return (
    <div
      className="relative h-[415px] md:h-[350px] w-full overflow-hidden rounded-lg border bg-card p-4 shadow-lg"
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">{t("strategy.visualization")}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t("live.demo")}
          </span>
          <motion.div
            className="h-2 w-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Graphic area */}
      <div className="relative h-[200px]">
        <Line data={data} options={options as any} />

        {/* Optimization overlay */}
        {isOptimizing && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-2 text-sm font-medium">
              {t("optimizing.strategy")}
            </p>
          </motion.div>
        )}
      </div>

      {/* Signals */}
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>{t("buy.signal")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span>{t("sell.signal")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <span>{t("alert")}</span>
        </div>
      </div>

      {/* Strategies */}
      <div className="mt-4">
        <p className="text-xs font-medium">{t("trading.strategies")}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {strategies.map((strategy) => (
            <motion.button
              key={strategy.id}
              className={cn(
                "flex items-center text-secondary-foreground gap-1 rounded-full px-3 py-1 text-xs transition-colors",
                strategy.active ? "bg-primary " : "bg-muted hover:bg-muted/80"
              )}
              onClick={() => toggleStrategy(strategy.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {strategy.id === 1 ? (
                <LineChart className="h-3 w-3" />
              ) : strategy.id === 2 ? (
                <BarChart className="h-3 w-3" />
              ) : (
                <Zap className="h-3 w-3" />
              )}
              {t(strategy.name)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating indicators */}
      <motion.div
        className={`absolute top-16 right-4 md:top-12 md:right-6 flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-600 border border-green-200 ${
          isOptimizing ? `display-none hidden` : ``
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <TrendingUp className="h-3 w-3" />
        <span>
          {t("win.rate")}: {winRate}%
        </span>
      </motion.div>
    </div>
  );
}
