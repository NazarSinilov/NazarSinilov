import axios from "axios/index";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {
  GOOGLE_DRIVE_URL,
  GOOGLE_SHEET,
  GOOGLE_SHEET_LIST_CATEGORIES,
  GOOGLE_SHEET_LIST_EXPENSE,
  GOOGLE_SHEET_NAME, GOOGLE_SHEET_URL
} from "/constants/constants";
import {IExpense, IGoogleDriveInfo} from "/interface/interface";
import {store} from "/redux/store";


const request = async (method: string, url: string, data?: object, props? : string ) => {
  const {accessToken} = await GoogleSignin.getTokens()
  const URL = url + "access_token=" + accessToken + (props || "")

  if  (method === "get") {
    const result = await axios.get(URL)
    return result.data
  } else {
    const result = await axios(URL, {method, data})
    return result.data
  }
}

export const removeExpenseRequest = async (id: number) => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}!A${id}:E${id}:clear?`
  return await request("post", url)
}

export const editExpenseRequest = async (newExpense: Array<string | number | boolean>, expenseId: number) => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}!A${expenseId}?`
  const props = "&includeValuesInResponse=true&valueInputOption=RAW"
  const body = {
    "values": [
      [...newExpense]
    ]
  }
  await request("put", url, body, props)
}
export const batchUpdateExpensesRequest = async (deleteExpenseId: number) => {
  const variableExpenses = store.getState().expenses.allExpenses.filter((el: IExpense) => el.categoryId === deleteExpenseId)
  const requestData = variableExpenses.map((el: IExpense): { range: string, values: [[number]] } => ({
    range: `${GOOGLE_SHEET_LIST_EXPENSE}!E${el.id}`,
    values: [[0]]
  }))
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values:batchUpdate?`
  const body = {
    valueInputOption: "RAW",
    data: [...requestData],
    responseValueRenderOption: "FORMATTED_VALUE"
  }
  await request("post", url, body)
}

export const addExpenseRequest = async (expense: Array<string | number | boolean>) => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}:append?`
  const props = "&includeValuesInResponse=true&valueInputOption=RAW"
  const body = {
    "values": [
      [...expense]
    ]
  }
  await request("post", url, body, props)
}

export const getExpensesRequest = async () => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}?`
  const props = "&valueRenderOption=FORMATTED_VALUE"
  const response = await request("get", url, {} ,props)

  return response.values
}


export const getCategories = async () => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_CATEGORIES}?`
  const props = "&valueRenderOption=FORMATTED_VALUE"
  const response = await request("get", url, {} , props)

  return response.values
}

export const removeCategory = async (id: number) => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_CATEGORIES}!A${id}:clear?`

  return await request("post", url)
}

export const addCategoryRequest = async (categoryName: string) => {
  const url = `${GOOGLE_SHEET_URL}/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_CATEGORIES}:append?`
  const props = "&includeValuesInResponse=true&valueInputOption=RAW"
  const body = {
    "values": [
      [categoryName]
    ]
  }
  const result = await request("post", url, body, props)

  return result.data
}

export const createGoogleTable = async () => {
  const url = `${GOOGLE_SHEET_URL}?`
  const result = await request("post", url, GOOGLE_SHEET)

  return result.data
}

export const googleDriveInfo = async () => {
  const url = `${GOOGLE_DRIVE_URL}`
  const result = await request("get", url)
  const newArr = result.files

  return newArr.filter((el: IGoogleDriveInfo) => GOOGLE_SHEET_NAME === el.name)
}