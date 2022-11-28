import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import "./App.scss"
import {IProduct} from "./components/models/IProduct";
import axios, { AxiosError} from "axios";

const App = () => {

    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async (): Promise<void> => {
        try {
            const response = await axios.get<IProduct[]>("https://api.escuelajs.co/api/v1/products?offset=0&limit=12")
            const newArr = response.data
            setProducts(newArr)
        } catch (e) {
            throw e as AxiosError
        }
    }

    return (
        <div className="shop">
            <Header />
            <Content products={products} setProducts={setProducts}/>
        </div>
    );
};

export default App;