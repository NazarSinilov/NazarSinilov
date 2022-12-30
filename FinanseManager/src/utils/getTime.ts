export const getTime = (date: Date) => {
    const hour = date.toLocaleTimeString().split(":").slice(0, 2).join(":")
    return `${hour}`
}