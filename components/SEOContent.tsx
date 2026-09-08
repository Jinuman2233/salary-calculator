export default function SEOContent() {
  return (
    <article className="mx-auto max-w-3xl space-y-10 text-slate-700">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          2025년 연봉 실수령액·퇴직금 계산 가이드
        </h2>
        <p className="leading-relaxed">
          연봉 협상, 이직, 연말정산을 앞두고 가장 궁금한 것은 &quot;통장에 실제로
          얼마가 들어오는지&quot;입니다. 이 계산기는 2025년 기준 4대 보험 요율과
          근로소득 간이세액 구조를 반영해 월·연 실수령액과 법정 퇴직금 근사치를
          한눈에 보여 줍니다. 아래 안내를 함께 읽으면 공제 항목의 의미와 절세
          포인트를 더 정확히 이해할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">
          2025년 4대 보험 요율 안내
        </h2>
        <p className="leading-relaxed">
          직장가입자가 매월 급여에서 부담하는 4대 보험은 국민연금, 건강보험,
          장기요양보험, 고용보험입니다. 2025년 근로자 부담 요율은 대략
          국민연금 4.5%, 건강보험 3.545%, 장기요양보험은 건강보험료의 12.95%,
          고용보험 0.9% 수준입니다. 실제 고지액은 사업장 보수월액과 상·하한
          적용에 따라 달라지며, 국민연금은 기준소득월액 하한·상한(약 40만 원 ~
          637만 원)이 적용되고, 건강보험도 보수월액 상·하한 구간이 있습니다.
        </p>
        <p className="leading-relaxed">
          비과세 소득(식대 등)은 과세 대상 급여에서 제외되므로 4대 보험과 소득세
          산정 기준 금액이 낮아집니다. 본 도구는 입력하신 월 비과세액을 과세
          대상에서 차감한 뒤 보험료를 계산하고, 근로소득세는 연간 근로소득공제·
          인적공제·세액공제 구조를 반영한 간이세액 근사치로 산출합니다.
          지방소득세는 근로소득세의 10%로 반영됩니다. 회사마다 성과급·수당
          구성이 달라 실제 급여명세서와 수 천 원~수 만 원 차이가 날 수 있으니
          참고용으로 활용해 주세요.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">
          퇴직금은 어떻게 계산하나요?
        </h3>
        <p className="leading-relaxed">
          법정 퇴직금은 원칙적으로 &quot;1일 평균임금 × 30일 × (재직 일수 /
          365)&quot;로 산정됩니다. 근속이 안정적이고 평균임금이 월급과 비슷한
          경우, 실무에서는 &quot;월급 × 근속 연수&quot;로 대략적인 규모를 가늠하는
          경우가 많습니다. 이 계산기의 퇴직금은 후자의 근사 공식입니다.
          DC형 퇴직연금(확정기여형)은 매년 연간 임금총액의 1/12 이상이
          적립되므로 제도 유형에 따라 최종 수령액이 달라질 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">
          비과세 식대 한도와 절세 효과
        </h2>
        <p className="leading-relaxed">
          근로소득 중 식사대(식대)는 일정 한도까지 비과세로 인정됩니다. 한도
          내에서 지급되는 식대는 근로소득세·지방소득세 과세표준에 포함되지
          않으며, 일반적으로 4대 보험 보수월액 산정에서도 제외되는 경우가
          많습니다. 따라서 동일한 총급여라도 비과세 식대 비중이 클수록 실수령액이
          늘어나는 효과가 있습니다. 본 계산기에서는 월 10만 원부터 50만 원까지
          슬라이더로 비과세액을 조절해 절세 체감을 바로 확인할 수 있습니다.
        </p>
        <p className="leading-relaxed">
          다만 비과세 요건을 충족하지 못한 수당을 비과세로 처리하면 추후
          연말정산·세무 조사 시 추징 위험이 있습니다. 회사 급여 규정과
          국세청 비과세 요건을 반드시 확인하세요. 또한 비과세 한도를 넘는
          금액은 과세 대상으로 전환되므로, &quot;총액만 올리기&quot;보다
          &quot;과세/비과세 구성을 최적화&quot;하는 관점이 실수령액 관리에
          유리합니다.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">
          실수령액을 높이는 현실적인 팁
        </h3>
        <p className="leading-relaxed">
          부양가족 공제 대상자를 정확히 등록하면 간이세액 원천징수 단계에서부터
          세금이 줄어들 수 있습니다. 또한 신용카드·의료비·교육비 등 연말정산
          공제 항목을 미리 정리하면 환급 가능성을 높일 수 있습니다. 이직 시에는
          명목 연봉뿐 아니라 퇴직금·퇴직연금 제도(DB/DC/IRP), 식대·차량유지비 등
          비과세 복리후생까지 함께 비교하는 것이 좋습니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">자주 묻는 질문(FAQ)</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Q. 이 계산 결과는 실제 급여명세서와 정확히 같나요?
          </h3>
          <p className="leading-relaxed">
            A. 아니요. 간이세액표·보험 상하한·비과세 구성을 반영한 근사치입니다.
            회사의 수당 체계, 감면 대상 여부, 중도 입퇴사, 상여 지급 월 등에 따라
            실제 원천징수세액은 달라질 수 있습니다. 정확한 금액은 급여명세서와
            원천징수 영수증을 기준으로 확인하세요.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Q. 부양가족 수는 본인을 포함하나요?
          </h3>
          <p className="leading-relaxed">
            A. 네. 기본적으로 근로자 본인을 1명으로 두고, 소득·나이 요건을 충족하는
            배우자·자녀·부모 등을 추가합니다. 공제 대상이 아닌 가족을 넣으면
            세금이 과소 추계될 수 있으니 주의하세요.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Q. 퇴직금과 퇴직연금(DC)은 다른가요?
          </h3>
          <p className="leading-relaxed">
            A. 다릅니다. 퇴직금 제도는 퇴직 시점에 일시금으로 산정되는 반면,
            DC형 퇴직연금은 재직 중 적립금과 운용 성과에 따라 수령액이
            결정됩니다. 본 계산기의 퇴직금은 법정 퇴직금 규모의 빠른 감고용
            근사치이며, DC/DB 상세 시뮬레이션은 별도 제도 조건이 필요합니다.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Q. 2025년 요율은 언제 다시 확인해야 하나요?
          </h3>
          <p className="leading-relaxed">
            A. 건강보험료율·장기요양보험료율, 국민연금 기준소득월액 상·하한은
            연중 또는 매년 조정될 수 있습니다. 급여 정책이 바뀌거나 새 해가
            시작되면 공단·국세청 공지와 회사 안내를 다시 확인하는 것이
            안전합니다.
          </p>
        </div>
      </section>

      <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">
        본 페이지의 계산 결과와 설명은 일반적인 정보 제공 목적이며, 세무·노무
        자문을 대체하지 않습니다. 개별 상황에 대한 최종 판단은 세무사·노무사 또는
        관할 기관 상담을 권장합니다.
      </p>
    </article>
  );
}
