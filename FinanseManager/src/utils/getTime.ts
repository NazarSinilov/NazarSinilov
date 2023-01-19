export const getTime = (date: Date) => {
  return date.toLocaleTimeString().split(":").slice(0, 2).join(":")
}