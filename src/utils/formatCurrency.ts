export function formatCurrency(
  amount: number
): string {
  return `${amount.toLocaleString(
    "fr-FR"
  )} FCFA`;
}

export default formatCurrency;