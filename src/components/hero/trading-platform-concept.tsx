import React, { useState } from "react";
import {
  ArrowRight,
  BarChart2,
  Brain,
  Code,
  LineChart,
  Share2,
  Sliders,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const TradingPlatformConcept = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const steps = [
    {
      id: "dna",
      title: t("stock.dna"),
      icon: <BarChart2 size={20} />,
      color: "bg-blue-500",
      metrics: [
        { label: t("tendency"), value: "65%" },
        { label: t("lateralization"), value: "35%" },
        { label: t("average.volume"), value: "2.4%" },
        { label: t("correlation"), value: "0.72" },
      ],
    },
    {
      id: "strategy",
      title: t("ai.strategy"),
      icon: <Brain size={20} />,
      color: "bg-purple-500",
      elements: [
        { type: "indicator", name: "RSI(14)" },
        { type: "ml", name: "RNA" },
        { type: "action", name: "Breakout" },
      ],
    },
    {
      id: "backtest",
      title: t("backtest"),
      icon: <LineChart size={20} />,
      color: "bg-green-500",
      stats: [
        { label: t("return"), value: "+42%" },
        { label: t("sharpe"), value: "1.85" },
        { label: t("drawdown"), value: "-7.4%" },
        { label: t("win.rate"), value: "68%" },
      ],
    },
    {
      id: "deploy",
      title: t("export.robot"),
      icon: <Code size={20} />,
      color: "bg-orange-500",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const dnaData = [
    { x: 0, y: 65 },
    { x: 1, y: 60 },
    { x: 2, y: 70 },
    { x: 3, y: 55 },
    { x: 4, y: 60 },
    { x: 5, y: 75 },
    { x: 6, y: 72 },
    { x: 7, y: 80 },
    { x: 8, y: 65 },
  ];

  const backtestData = [
    { x: 0, y: 100 },
    { x: 1, y: 102 },
    { x: 2, y: 108 },
    { x: 3, y: 105 },
    { x: 4, y: 112 },
    { x: 5, y: 121 },
    { x: 6, y: 118 },
    { x: 7, y: 125 },
    { x: 8, y: 142 },
  ];

  const generatePath = (data: any[], height: number) => {
    const maxY = Math.max(...data.map((d) => d.y));
    const minY = Math.min(...data.map((d) => d.y));
    const range = maxY - minY || 1;

    return data
      .map((point, i) => {
        const x = (point.x / (data.length - 1)) * 100;
        const y = 100 - ((point.y - minY) / range) * height;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="max-w-full mx-auto w-max bg-transparent border rounded-lg shadow-xl overflow-hidden">
      <div className="p-4">
        {/* Progress steps */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 justify-between items-center ">
          {steps.map((step, index) => (
            <div key={step.id} className="md:mx-2 lg:mx-5 mt-2">
              {/* Enhanced step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === index
                      ? step.color
                      : "bg-secondaryBlue bg-opacity-30"
                  } text-white shadow-md`}
                >
                  {step.icon}
                </div>
                <span className="text-xs text-center mt-1 min-h-[50px] text-gray-600 font-medium dark:text-white">
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative md:h-[280px] h-[480px] overflow-hidden">
          {/* DNA Analysis */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 0
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="flex">
              <div className="w-1/2 p-3">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                  {t("stock.dna")}
                </h4>
                <p className="text-xs text-gray-600 dark:text-white mb-3">
                  {t("stock.dna.description")}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  {steps[0].metrics?.map((metric, idx) => (
                    <div key={idx} className="bg-blue-50 rounded px-2 py-4">
                      <div className="text-xs text-gray-500 ">
                        {metric.label}
                      </div>
                      <div className="font-medium text-blue-700">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 p-3 flex items-center justify-center">
                <svg
                  width="100%"
                  height="120"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Background grid */}
                  <path
                    d="M 0 25 H 100 M 0 50 H 100 M 0 75 H 100"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                  <path
                    d="M 25 0 V 100 M 50 0 V 100 M 75 0 V 100"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />

                  {/* DNA chart line */}
                  <path
                    d={generatePath(dnaData, 80)}
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />

                  {/* Area under curve */}
                  <path
                    d={`${generatePath(dnaData, 80)} L 100 100 L 0 100 Z`}
                    fill="rgba(79, 70, 229, 0.1)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Strategy Building */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 1
                ? "translate-x-0 opacity-100"
                : currentStep < 1
                ? "translate-x-full opacity-0"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="p-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                {t("ai.strategy.building")}
              </h4>
              <p className="text-xs text-gray-600 dark:text-white mb-3">
                {t("ai.strategy.building.description")}
              </p>

              <div className="flex items-center justify-center mb-3 mt-4 text-gray-800">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-sm">
                  {t("stock.dna")}
                </div>
                <ArrowRight
                  className="mx-2 text-gray-400 dark:text-white"
                  size={16}
                />
                <div className="bg-purple-100 border border-purple-200 rounded-lg p-2 text-sm">
                  <Brain size={14} className="inline mr-1" /> {t("ai")}
                </div>
                <ArrowRight
                  className="mx-2 text-gray-400 dark:text-white"
                  size={16}
                />
                <div className="bg-purple-200 border border-purple-300 rounded-lg p-2 text-sm">
                  {t("strategy")}
                </div>
              </div>

              <div className="mt-4 border rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-white mb-2">
                  {t("ai.suggestions")}
                </div>
                <div className="space-y-2">
                  {steps[1].elements?.map((el, idx) => (
                    <div key={idx} className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          el.type === "indicator"
                            ? "bg-blue-500"
                            : el.type === "ml"
                            ? "bg-purple-500"
                            : "bg-green-500"
                        } mr-2`}
                      ></div>
                      <div className="text-sm text-gray-500 dark:text-white">
                        {el.name}
                      </div>
                      <div className="ml-auto text-xs text-gray-500 dark:text-white">
                        {el.type === "indicator"
                          ? t("indicator")
                          : el.type === "ml"
                          ? t("machine.learning")
                          : t("price.action")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Backtest */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 2
                ? "translate-x-0 opacity-100"
                : currentStep < 2
                ? "translate-x-full opacity-0"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="flex">
              <div className="w-1/2 p-3">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                  {t("backtest.optimization")}
                </h4>
                <p className="text-xs text-gray-600 dark:text-white mb-2">
                  {t("backtest.optimization.description")}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  {steps[2].stats?.map((stat, idx) => (
                    <div key={idx} className="bg-green-50 rounded p-2">
                      <div className="text-xs text-gray-500 ">{stat.label}</div>
                      <div
                        className={`font-medium ${
                          stat.label === "Drawdown"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 p-3 flex items-center justify-center">
                <svg
                  width="100%"
                  height="120"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Background grid */}
                  <path
                    d="M 0 25 H 100 M 0 50 H 100 M 0 75 H 100"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                  <path
                    d="M 25 0 V 100 M 50 0 V 100 M 75 0 V 100"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />

                  {/* Backtest chart line */}
                  <path
                    d={generatePath(backtestData, 80)}
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2"
                  />

                  {/* Area under curve */}
                  <path
                    d={`${generatePath(backtestData, 80)} L 100 100 L 0 100 Z`}
                    fill="rgba(34, 197, 94, 0.1)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Export */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 3
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="p-3 text-center">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                {t("export.strategy")}
              </h4>
              <p className="text-xs text-gray-600 mb-4 dark:text-white">
                {t("transform.strategy")}
              </p>

              <div className="flex justify-center items-center space-x-3 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                    <Code size={20} className="text-orange-600" />
                  </div>
                  <div className="text-xs">{t("meta.trader")}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                    <Sliders size={20} className="text-blue-600" />
                  </div>
                  <div className="text-xs">{t("python")}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                    <Share2 size={20} className="text-green-600" />
                  </div>
                  <div className="text-xs">{t("marketplace")}</div>
                </div>
              </div>

              <div className="text-xs text-gray-600 dark:text-white mt-3">
                {t("monitor")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-muted border-t flex justify-between items-center">
        <div>
          <div className="text-xs md:text-sm font-medium text-primary">
            {t("create.strategies")}
          </div>
        </div>
        <Button useArrow variant={"outline"}>
          <a href="#contact_us">{t("learn.more")}</a>
        </Button>
      </div>
    </div>
  );
};

export default TradingPlatformConcept;
