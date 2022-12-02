import React, {useEffect, useMemo, useState} from 'react';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import "./App.scss"
import {IProduct} from "./components/models/IProduct";
import axios, {AxiosError} from "axios";
import { Alert } from '@mui/material';

const App = () => {

    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState<IProduct[]>([])
    const [error, setError] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const getPrice = (totalPrice: number) : void => {
      setTotalPrice((prevState) => prevState + totalPrice)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const getSearchValue = (value: string) : void => {

        setSearchValue(value)
    }

    const fetchProducts = async (): Promise<void> => {
        setError("")
        try {
            const response = await axios.get<IProduct[]>("https://api.escuelajs.co/api/v1/products?offset=0&limit=12")
            const newArr = response.data.map((el) => ({...el, countProducts : 0, stock: 45 }) )
            setProducts(newArr)
        } catch (e: unknown) {
            const er = e as AxiosError
            setError(er.message)
        }
    }

    const productsMemo: IProduct[] = useMemo(() => products.filter((el) =>
        el.title.toLowerCase().includes(searchValue.toLowerCase())), [products, searchValue]);
    return (
        <div className="shop">
            <Header getSearchValue={getSearchValue} totalPrice={totalPrice} />
            <Content products={productsMemo} setProducts={setProducts} getPrice={getPrice}/>
            {error && <Alert severity="error">{error}</Alert>}
        </div>

    );
};


export default App;