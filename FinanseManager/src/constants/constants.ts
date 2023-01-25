import {Dimensions} from "react-native";

export const GOOGLE_SHEET_NAME = "Finance expenses"
export const GOOGLE_SHEET_LIST_EXPENSE = "Expenses"
export const GOOGLE_SHEET_LIST_CATEGORIES = "Categories"
export const HEIGHT = (Dimensions.get("window").height - 200) / 3
export const GOOGLE_SHEET_URL =  "https://sheets.googleapis.com/v4/spreadsheets"
export const GOOGLE_DRIVE_URL = "https://www.googleapis.com/drive/v3/files?"
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

