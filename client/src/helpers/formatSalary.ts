export function formatSalaryRange(salary: number[]): string {
  const formatNumber = (num: number): string => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(0) + "k";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    return num.toString();
  };
  return `${formatNumber(salary[0])} - ${formatNumber(salary[1])}`;
}
