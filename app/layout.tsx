import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2025년 연봉 실수령액 계산기 | 4대보험 및 퇴직금 자동 계산",
  description:
    "2025년 기준 연봉·월급 실수령액을 바로 계산하세요. 국민연금·건강보험·고용보험·근로소득세·지방소득세 공제와 예상 퇴직금까지 한 번에 확인하는 무료 계산기입니다.",
  keywords: [
    "연봉 실수령액",
    "월급 계산기",
    "4대보험",
    "퇴직금 계산",
    "2025 급여 계산기",
  ],
  openGraph: {
    title: "2025년 연봉 실수령액 계산기 | 4대보험 및 퇴직금 자동 계산",
    description:
      "연봉 입력만으로 실수령액·4대보험·세금·퇴직금을 자동 계산합니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
