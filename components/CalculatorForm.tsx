"use client";

import { useEffect, useState } from "react";
import { Calculator, Users, Wallet } from "lucide-react";
import {
  calculateSalary,
  formatKRW,
  type CalculatorInput,
  type CalculatorResult,
  type PayMode,
  TAX_CONSTANTS,
} from "@/utils/taxLogic";

interface CalculatorFormProps {
  onResultChange: (result: CalculatorResult, input: CalculatorInput) => void;
  initialAmount?: number;
}

function parseAmount(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function displayAmount(value: number): string {
  return value > 0 ? formatKRW(value) : "";
}

export default function CalculatorForm({
  onResultChange,
  initialAmount = 50_000_000,
}: CalculatorFormProps) {
  const [mode, setMode] = useState<PayMode>("annual");
  const [amount, setAmount] = useState(initialAmount);
  const [nonTaxable, setNonTaxable] = useState<number>(
    TAX_CONSTANTS.DEFAULT_NON_TAXABLE,
  );
  const [dependents, setDependents] = useState(1);
  const [yearsOfService, setYearsOfService] = useState(3);

  useEffect(() => {
    const input: CalculatorInput = {
      amount,
      mode,
      nonTaxable,
      dependents,
      yearsOfService,
    };
    onResultChange(calculateSalary(input), input);
  }, [amount, mode, nonTaxable, dependents, yearsOfService, onResultChange]);

  const handleModeChange = (next: PayMode) => {
    if (next === mode) return;
    if (next === "monthly") {
      setAmount(Math.round(amount / 12));
    } else {
      setAmount(Math.round(amount * 12));
    }
    setMode(next);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Calculator className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">급여 정보 입력</h2>
          <p className="text-sm text-slate-500">입력 즉시 실수령액이 계산됩니다</p>
        </div>
      </div>

      <div className="mb-5">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          급여 기준
        </span>
        <div
          className="grid grid-cols-2 rounded-xl bg-slate-100 p-1"
          role="group"
          aria-label="연봉 또는 월급 선택"
        >
          {(
            [
              { id: "annual", label: "연봉" },
              { id: "monthly", label: "월급" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleModeChange(opt.id)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                mode === opt.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <label className="mb-5 block">
        <span className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <Wallet className="h-4 w-4 text-blue-600" aria-hidden />
          {mode === "annual" ? "세전 연봉" : "세전 월급"}
        </span>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={displayAmount(amount)}
            onChange={(e) => setAmount(parseAmount(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-lg font-semibold text-slate-900 outline-none ring-blue-600 transition focus:border-blue-600 focus:bg-white focus:ring-2"
            placeholder={mode === "annual" ? "50,000,000" : "4,166,667"}
            aria-label={mode === "annual" ? "세전 연봉" : "세전 월급"}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            원
          </span>
        </div>
      </label>

      <label className="mb-5 block">
        <span className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
          <span>월 비과세액 (식대 등)</span>
          <span className="font-semibold text-blue-600">
            {formatKRW(nonTaxable)}원
          </span>
        </span>
        <input
          type="range"
          min={100_000}
          max={500_000}
          step={10_000}
          value={nonTaxable}
          onChange={(e) => setNonTaxable(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
          aria-valuemin={100000}
          aria-valuemax={500000}
          aria-valuenow={nonTaxable}
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>10만원</span>
          <span>50만원</span>
        </div>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Users className="h-4 w-4 text-blue-600" aria-hidden />
            부양가족 수 (본인 포함)
          </span>
          <input
            type="number"
            min={1}
            max={11}
            value={dependents}
            onChange={(e) =>
              setDependents(Math.max(1, Math.min(11, Number(e.target.value) || 1)))
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900 outline-none ring-blue-600 focus:border-blue-600 focus:bg-white focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            근속 연수 (퇴직금)
          </span>
          <input
            type="number"
            min={0}
            max={40}
            step={0.5}
            value={yearsOfService}
            onChange={(e) =>
              setYearsOfService(Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900 outline-none ring-blue-600 focus:border-blue-600 focus:bg-white focus:ring-2"
          />
        </label>
      </div>
    </section>
  );
}
