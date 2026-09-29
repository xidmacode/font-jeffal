export function formatDate(
  date: string | Date
): string {
  const value =
    date instanceof Date
      ? date
      : new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Date invalide";
  }

  return value.toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

export default formatDate;