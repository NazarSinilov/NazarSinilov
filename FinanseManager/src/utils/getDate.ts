export const getDate = (date: Date): string => {
    const month = date.toLocaleDateString().split(".").slice(0, 2).join(".")
    const hour = date.toLocaleTimeString().split(":").slice(0, 2).join(":")
    return `${month} ${hour}`
}