export default function getDate(date: string) {
  const thisDay = new Date(date)
  return new Date(thisDay.getFullYear(), thisDay.getMonth(), thisDay.getDate())
}
