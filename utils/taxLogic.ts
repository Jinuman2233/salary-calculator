/** 2025년 기준 4대보험·근로소득세·퇴직금 근사 계산 유틸 */

export type PayMode = "annual" | "monthly";

export interface CalculatorInput {
  /** 연봉 또는 월급 (mode에 따름) */
  amount: number;
  mode: PayMode;
  /** 월 비과세액 (식대 등), 기본 200,000 */
  nonTaxable: number;
  /** 공제대상 부양가족 수 (본인 포함) */
  dependents: number;
  /** 근속 연수 (퇴직금 산정용) */
  yearsOfService: number;
}

export interface CalculatorResult {
  annualSalary: number;
  monthlySalary: number;
  taxableMonthly: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalInsurance: number;
  totalTax: number;
  totalDeduction: number;
  netMonthly: number;
  netAnnual: number;
  severancePay: number;
}

/** 국민연금 기준소득월액 (2025) */
const NPS_MIN = 400_000;
const NPS_MAX = 6_370_000;
const NPS_RATE = 0.045;

/** 건강보험 보수월액 상·하한 (2025 근사) */
const HI_MIN = 279_261;
const HI_MAX = 127_257_273;
const HI_RATE = 0.03545;
const LTC_RATE = 0.1295;
const EI_RATE = 0.009;

const DEFAULT_NON_TAXABLE = 200_000;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundWon(value: number): number {
  return Math.floor(value);
}

/** 근로소득공제 (연간) */
function earnedIncomeDeduction(annualGross: number): number {
  if (annualGross <= 5_000_000) return annualGross * 0.7;
  if (annualGross <= 15_000_000) return 3_500_000 + (annualGross - 5_000_000) * 0.4;
  if (annualGross <= 45_000_000) return 7_500_000 + (annualGross - 15_000_000) * 0.15;
  if (annualGross <= 100_000_000) return 12_000_000 + (annualGross - 45_000_000) * 0.05;
  return Math.min(20_000_000, 14_850_000 + (annualGross - 100_000_000) * 0.02);
}

/** 종합소득 누진세율·누진공제 (2025) */
function progressiveIncomeTax(taxBase: number): number {
  if (taxBase <= 0) return 0;
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return taxBase * 0.15 - 1_260_000;
  if (taxBase <= 88_000_000) return taxBase * 0.24 - 5_760_000;
  if (taxBase <= 150_000_000) return taxBase * 0.35 - 15_440_000;
  if (taxBase <= 300_000_000) return taxBase * 0.38 - 19_940_000;
  if (taxBase <= 500_000_000) return taxBase * 0.4 - 25_940_000;
  if (taxBase <= 1_000_000_000) return taxBase * 0.42 - 35_940_000;
  return taxBase * 0.45 - 65_940_000;
}

/** 근로소득세액공제 (간이세액 근사) */
function wageTaxCredit(calculatedTax: number): number {
  if (calculatedTax <= 550_000) return calculatedTax * 0.55;
  if (calculatedTax <= 1_450_000) return 302_500 + (calculatedTax - 550_000) * 0.3;
  let credit = 572_500 + (calculatedTax - 1_450_000) * 0.2;
  return Math.min(740_000, credit);
}

/**
 * 간이세액표 기반 월 근로소득세 근사치.
 * 연간 과세표준 → 산출세액 → 세액공제 후 12로 나눔.
 */
function approximateMonthlyIncomeTax(
  monthlySalary: number,
  nonTaxable: number,
  monthlyInsurance: number,
  dependents: number,
): number {
  const annualSalary = monthlySalary * 12;
  const annualNonTaxable = nonTaxable * 12;
  const annualInsurance = monthlyInsurance * 12;

  const employmentIncome = Math.max(0, annualSalary - annualNonTaxable);
  const afterEarnedDeduction = Math.max(
    0,
    employmentIncome - earnedIncomeDeduction(employmentIncome),
  );

  const personalDeduction = Math.max(1, dependents) * 1_500_000;
  const taxBase = Math.max(
    0,
    afterEarnedDeduction - personalDeduction - annualInsurance,
  );

  const rawTax = progressiveIncomeTax(taxBase);
  const afterCredit = Math.max(0, rawTax - wageTaxCredit(rawTax));
  return roundWon(afterCredit / 12);
}

/** 법정 퇴직금 근사: 평균임금 30일분 × 근속년수 ≈ 월급 × 근속년수 */
function calculateSeverance(monthlySalary: number, yearsOfService: number): number {
  if (yearsOfService <= 0 || monthlySalary <= 0) return 0;
  return roundWon(monthlySalary * yearsOfService);
}

export function calculateSalary(input: CalculatorInput): CalculatorResult {
  const nonTaxable = Number.isFinite(input.nonTaxable)
    ? Math.max(0, input.nonTaxable)
    : DEFAULT_NON_TAXABLE;
  const dependents = Math.max(1, Math.floor(input.dependents || 1));
  const yearsOfService = Math.max(0, input.yearsOfService || 0);

  const amount = Math.max(0, Number(input.amount) || 0);
  const monthlySalary =
    input.mode === "annual" ? roundWon(amount / 12) : roundWon(amount);
  const annualSalary =
    input.mode === "annual" ? roundWon(amount) : roundWon(amount * 12);

  const taxableMonthly = Math.max(0, monthlySalary - nonTaxable);

  const npsBase = clamp(taxableMonthly, NPS_MIN, NPS_MAX);
  const nationalPension =
    taxableMonthly > 0 ? roundWon(npsBase * NPS_RATE) : 0;

  const hiBase = clamp(taxableMonthly, HI_MIN, HI_MAX);
  const healthInsurance =
    taxableMonthly > 0 ? roundWon(hiBase * HI_RATE) : 0;
  const longTermCare = roundWon(healthInsurance * LTC_RATE);
  const employmentInsurance =
    taxableMonthly > 0 ? roundWon(taxableMonthly * EI_RATE) : 0;

  const totalInsurance =
    nationalPension + healthInsurance + longTermCare + employmentInsurance;

  const incomeTax = approximateMonthlyIncomeTax(
    monthlySalary,
    nonTaxable,
    totalInsurance,
    dependents,
  );
  const localIncomeTax = roundWon(incomeTax * 0.1);
  const totalTax = incomeTax + localIncomeTax;
  const totalDeduction = totalInsurance + totalTax;
  const netMonthly = Math.max(0, monthlySalary - totalDeduction);
  const netAnnual = netMonthly * 12;
  const severancePay = calculateSeverance(monthlySalary, yearsOfService);

  return {
    annualSalary,
    monthlySalary,
    taxableMonthly,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalInsurance,
    totalTax,
    totalDeduction,
    netMonthly,
    netAnnual,
    severancePay,
  };
}

export function formatKRW(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(value));
}

export const TAX_CONSTANTS = {
  DEFAULT_NON_TAXABLE,
  NPS_RATE,
  HI_RATE,
  LTC_RATE,
  EI_RATE,
  NPS_MIN,
  NPS_MAX,
} as const;
