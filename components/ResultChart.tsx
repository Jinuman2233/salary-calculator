"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatKRW, type CalculatorResult } from "@/utils/taxLogic";

interface ResultChartProps {
  result: CalculatorResult | null;
}

const COLORS = {
  net: "#2563eb",
  deduction: "#94a3b8",
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-slate-800">{item.name}</p>
      <p className="text-blue-600">{formatKRW(item.value)}원</p>
    </div>
  );
}

export default function ResultChart({ result }: ResultChartProps) {
  if (!result || result.monthlySalary <= 0) {
    return (
      <section className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-500">
        급여 금액을 입력하면 실수령액과 공제 내역이 표시됩니다.
      </section>
    );
  }

  const chartData = [
    { name: "실수령액", value: result.netMonthly },
    { name: "공제액", value: result.totalDeduction },
  ];

  const netRatio =
    result.monthlySalary > 0
      ? Math.round((result.netMonthly / result.monthlySalary) * 100)
      : 0;

  const rows = [
    { label: "국민연금 (4.5%)", value: result.nationalPension },
    { label: "건강보험 (3.545%)", value: result.healthInsurance },
    { label: "장기요양보험", value: result.longTermCare },
    { label: "고용보험 (0.9%)", value: result.employmentInsurance },
    { label: "근로소득세", value: result.incomeTax },
    { label: "지방소득세", value: result.localIncomeTax },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">계산 결과</h2>
        <p className="text-sm text-slate-500">월 기준 실수령액 · 공제 비율</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-600 px-4 py-3 text-white sm:col-span-2">
          <p className="text-xs font-medium text-blue-100">예상 월 실수령액</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">
            {formatKRW(result.netMonthly)}
            <span className="ml-1 text-sm font-medium text-blue-100">원</span>
          </p>
          <p className="mt-1 text-xs text-blue-100">
            연 실수령액 약 {formatKRW(result.netAnnual)}원
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium text-slate-500">예상 퇴직금</p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {formatKRW(result.severancePay)}
            <span className="ml-1 text-sm font-medium text-slate-500">원</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">월급 × 근속연수 근사</p>
        </div>
      </div>

      <div className="relative mx-auto h-56 w-full max-w-xs sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === "실수령액" ? COLORS.net : COLORS.deduction}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-slate-500">실수령 비율</span>
          <span className="text-2xl font-bold text-blue-600">{netRatio}%</span>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-center gap-5 text-sm">
        <span className="inline-flex items-center gap-2 text-slate-600">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          실수령액
        </span>
        <span className="inline-flex items-center gap-2 text-slate-600">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          공제액
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full min-w-[280px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">공제 항목</th>
              <th className="px-4 py-2.5 text-right font-medium">월 금액</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-slate-100">
                <td className="px-4 py-2.5 text-slate-700">{row.label}</td>
                <td className="px-4 py-2.5 text-right font-medium text-slate-900">
                  {formatKRW(row.value)}원
                </td>
              </tr>
            ))}
            <tr className="border-t border-slate-200 bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-800">총 공제</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-900">
                {formatKRW(result.totalDeduction)}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
