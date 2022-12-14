import axios from "axios";
import {HEADER, URL_API} from "../constans/constans";
import {ITodo} from "../interface/interface";

export const getRequest = async () : Promise<ITodo[]> => {
    const resp = await axios.get(`${URL_API}/all/tasks`)
    return resp.data.data
}

export const postRequest = async (text: string) : Promise<ITodo> => {
    const date : Date = new Date()
    const resp = await axios.post(`${URL_API}/task`, {text, isCheck: false, date} , {headers: HEADER})
    return resp.data.data
}

export const putRequest = async (item : ITodo) : Promise<{ [key: string]: string }> => {
    return (await axios.put(`${URL_API}/task`, item , {headers: HEADER})).data
}

export const deleteRequest = async (item : ITodo) : Promise< {[key: string]: string} > => {
    return (await axios.delete(`${URL_API}/task?_id=${item._id}`, {headers: HEADER})).data
}