export default function getDate(date: string | Date | number) {
  const thisDay = new Date(date)
  return new Date(thisDay.getFullYear(), thisDay.getMonth(), thisDay.getDate())
}
