export function calculatePeriod(
  borrowings: number,
  apy: number,
  monthlyRefundAmount: number
): number {
  //月利 = 年利 / 12 / 100 (100分率から割合に直す) 小数点第三位まで削る
  const monthlyInterest = parseFloat((apy / 12 / 100).toFixed(3));
  //元金(principal)の初期状態は借入金額と同じ
  let principal = borrowings;
  //目標残債 0円
  const targetBalance = 0;
  //返済期間カウント
  let monthCount = 0;

  if (
    isMonthlyInterestHigherThanRepaymentAmount(
      monthlyRefundAmount,
      borrowings,
      monthlyInterest
    )
  ) {
    throw new Error('月利が返済金額より高いです。');
  }

  while (principal > targetBalance) {
    //毎月の元利(毎月の返済額 - (元金 * 月利))
    const monthlyPrincipalAndInterest = Math.floor(principal * monthlyInterest);
    const actualPrincipalRefundAmount =
      monthlyRefundAmount - monthlyPrincipalAndInterest;

    // console.log(
    //   `元金: ${principal}円,  ${monthCount}ヶ月目の元利: ${monthlyPrincipalAndInterest}円`
    // );

    //元金から元利分を引く
    principal -= actualPrincipalRefundAmount;

    //支払いをしたらカウントを１ヶ月追加
    monthCount += 1;
  }

  return monthCount;
}

function isMonthlyInterestHigherThanRepaymentAmount(
  monthlyRefundAmount: number,
  borrowings: number,
  monthlyInterest: number
) {
  return monthlyRefundAmount < borrowings * monthlyInterest;
}

export function formatPeriod(period: number) {
  //1年を12ヶ月として扱う
  const yearMonth = 12;
  return parseFloat((period / yearMonth).toFixed(1));
}
