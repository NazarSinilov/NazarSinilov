export const GOOGLE_SHEET_NAME = "Finance expenses"
export const GOOGLE_SHEET_LIST_EXPENSE = "Expenses"
export const GOOGLE_SHEET_LIST_CATEGORIES = "Categories"

export const GOOGLE_SHEET: object = {
    "properties": {
        "title": GOOGLE_SHEET_NAME
    },
    "sheets": [
        {
            "properties": {
                "title": GOOGLE_SHEET_LIST_EXPENSE,
            }
        },
        {
            "properties": {
                "title": GOOGLE_SHEET_LIST_CATEGORIES,
            }
        }
    ]
}

