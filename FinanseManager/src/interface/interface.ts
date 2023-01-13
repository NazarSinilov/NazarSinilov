export interface IExpense {
    title: string
    price: number
    isSpent: boolean
    date: Date
    categoryId : number
    id: number
}

export interface IGoogleDriveInfo {
    kind: string
    mimeType: string
    id: string
    name: string
}

export interface ICategories {
    name: string
    id: number
}

export interface IExpenses {
    allExpenses: IExpense[]
    categories: ICategories[]
    tableId: string
    currentDate: Date
    isShowCalendar: boolean
    currentCategories: number
}
