import axios from "axios/index";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {
    GOOGLE_SHEET,
    GOOGLE_SHEET_LIST_CATEGORIES,
    GOOGLE_SHEET_LIST_EXPENSE,
    GOOGLE_SHEET_NAME
} from "../constans/constans";
import {IExpense, IGoogleDriveInfo} from "../interface/interface";
import {store} from "../redux/store";

export const request = async (method: string, url: string, data?: object) => {
    const result = await axios(`${url}`, {method, data})

    return result.data
}


export const removeExpenseRequest = async (id: number) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}!A${id}:E${id}:clear?access_token=${accessToken}`
    return await request("post", url)
}

export const editExpenseRequest = async (newExpense: Array<string | number | boolean>, expenseId: number) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}!A${expenseId}?access_token=${accessToken}&includeValuesInResponse=true&valueInputOption=RAW`
    const body = {
        "values": [
            [...newExpense]
        ]
    }
    await request("put", url, body)
}
export const batchUpdateExpensesRequest = async (deleteExpenseId: number) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const variableExpenses = store.getState().expenses.allExpenses.filter((el: IExpense) => el.categoryId === deleteExpenseId)
    const requestData = variableExpenses.map((el: IExpense): { range: string, values: [[number]] } => ({
        range: `${GOOGLE_SHEET_LIST_EXPENSE}!E${el.id}`,
        values: [[0]]
    }))
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values:batchUpdate?access_token=${accessToken}`
    const body = {
        valueInputOption : "RAW",
        data: [...requestData],
        responseValueRenderOption : "FORMATTED_VALUE"
    }
    await request("post", url, body)
}

export const addExpenseRequest = async (expense: Array<string | number | boolean>) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}:append?access_token=${accessToken}&includeValuesInResponse=true&valueInputOption=RAW`
    const body = {
        "values": [
            [...expense]
        ]
    }
    await request("post", url, body)
}

export const getExpensesRequest = async () => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}?access_token=${accessToken}&valueRenderOption=FORMATTED_VALUE`
    const response = await request("get", url)
    return response.values
}


export const getCategories = async () => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_CATEGORIES}?access_token=${accessToken}&valueRenderOption=FORMATTED_VALUE`
    const response = await request("get", url)

    return response.values
}

export const removeCategory = async (id: number) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_CATEGORIES}!A${id}:clear?access_token=${accessToken}`
    return await request("post", url)
}


export const addCategoryRequest = async (categoryName: string) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_CATEGORIES}:append?access_token=${accessToken}&includeValuesInResponse=true&valueInputOption=RAW`
    const body = {
        "values": [
            [categoryName]
        ]
    }
    const result = await request("post", url, body)
    return result.data
}

/*export const putRequest = async () => {
    const {accessToken} = await GoogleSignin.getTokens()
    const result = await axios.put(`https://sheets.googleapis.com/v4/spreadsheets/1UMvnngDHwk6ePkHi7oxvMUdyftalN2JI89ZV8owS2GM/values/A1?access_token=${accessToken}&includeValuesInResponse=true&valueInputOption=RAW`,
        {
            "values": [["1111"]]
        })
    return result.data.updatedData.values
}*/

export const createGoogleTable = async () => {
    const url = "https://sheets.googleapis.com/v4/spreadsheets"
    const result = await request("post", url, GOOGLE_SHEET)

    return result.data
}

export const googleDriveInfo = async () => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://www.googleapis.com/drive/v3/files?access_token=${accessToken}`
    const result = await request("get", url)
    const newArr = result.files
    return newArr.filter((el: IGoogleDriveInfo) => GOOGLE_SHEET_NAME === el.name)

}


