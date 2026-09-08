import AdSenseSlot from "@/components/AdSenseSlot";
import CalculatorPanel from "@/components/CalculatorPanel";
import SEOContent from "@/components/SEOContent";

export default function Home() {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <line x1="8" x2="16" y1="6" y2="6" />
              <line x1="16" x2="16" y1="14" y2="18" />
              <path d="M16 10h.01" />
              <path d="M12 10h.01" />
              <path d="M8 10h.01" />
              <path d="M12 14h.01" />
              <path d="M8 14h.01" />
              <path d="M12 18h.01" />
              <path d="M8 18h.01" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight sm:text-base">
              연봉 실수령액 계산기
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              2025 4대보험 · 세금 · 퇴직금
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <AdSenseSlot height={90} slotId="gnb-bottom" />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            2025년 연봉 실수령액 및 퇴직금 계산기
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            연봉 또는 월급을 입력하면 4대 보험, 근로소득세, 지방소득세 공제 후
            실수령액과 예상 퇴직금을 바로 확인할 수 있습니다.
          </p>
        </div>

        <CalculatorPanel />

        <div className="mt-6">
          <AdSenseSlot height={120} slotId="result-bottom" />
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10 pb-16">
          <SEOContent />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-400 sm:px-6">
          © {new Date().getFullYear()} 연봉 실수령액 계산기 · 참고용 근사 계산
        </div>
      </footer>
    </div>
  );
}
