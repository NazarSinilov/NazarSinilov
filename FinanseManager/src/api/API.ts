import axios from "axios/index";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {
    GOOGLE_SHEET,
    GOOGLE_SHEET_LIST_CATEGORIES,
    GOOGLE_SHEET_LIST_EXPENSE,
    GOOGLE_SHEET_NAME
} from "../constans/constans";
import {IGoogleDriveInfo} from "../interface/interface";
import {store} from "../Redux/store";

export const request = async (method: string, url: string, data?: object) => {
    const result = await axios(`${url}`, {method, data})

    return result.data
}


export const removeExpenseRequest = async (id: number) => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${store.getState().expenses.tableId}/values/${GOOGLE_SHEET_LIST_EXPENSE}!A${id}:E${id}:clear?access_token=${accessToken}`
    return await request("post", url)
}

export const addExpenseRequest = async (expense: Array<string|number|boolean>) => {
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

/*export const getRequest = async () => {
    const {accessToken} = await GoogleSignin.getTokens()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/1UMvnngDHwk6ePkHi7oxvMUdyftalN2JI89ZV8owS2GM/values/List?access_token=${accessToken}&valueRenderOption=FORMATTED_VALUE`
    const response = await request("get", url)

    return response.values
}*/

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


