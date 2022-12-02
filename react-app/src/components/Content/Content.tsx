import React, {useCallback} from 'react';
import { Grid} from "@mui/material";

import "./Content.scss"
import {IProduct} from "../models/IProduct";
import ProductList from "./ProductList/ProductList";

interface ContentProps {
    products: IProduct[]
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
    getPrice: (totalPrice: number) => void
}

const Content = (props: ContentProps) => {
    const {products, setProducts, getPrice} = props

    const addPrice = useCallback((id: number, e : React.MouseEvent) => {
        e.stopPropagation()

        setProducts((prevProps: IProduct[]) => prevProps.map((el: IProduct) => {
            if (el.id === id) {

                if (el.stock <= 0) {
                    return el
                }

                getPrice(el.price)
                el.countProducts = el.countProducts + 1;
                el.stock = el.stock - 1
            }
            return el;
        }))
    }, [getPrice, setProducts])

    const removePrice = useCallback((id: number, e: React.MouseEvent) => {
        e.stopPropagation()

        setProducts((prevProps: IProduct[]) => prevProps.map((el:IProduct) => {
            if (el.id === id) {
                if (el.stock >= 45) {
                    return el
                }
                getPrice(-el.price)
                el.countProducts = el.countProducts - 1;
                el.stock = el.stock + 1
            }

            return el;
        }))
    }, [getPrice, setProducts])

    const toggleSelect = useCallback((price: number, count: number, id: number) => {

        setProducts((prevProps: IProduct[]) => prevProps.map((el:IProduct) => {
            if (el.id === id && count === 0) {
                el.countProducts = el.countProducts + 1;
                el.stock = el.stock - 1
                getPrice(el.price)

                return el

            } else if (el.id === id && count !== 0) {

                el.countProducts = 0
                el.stock = 45
                getPrice(-(el.price * count))
                return el

            }
            return el
        }))

    }, [getPrice, setProducts])

    return (
        <Grid container spacing={2}>
            {products.map((product: IProduct, index: number) =>
                <ProductList
                    key={`product-${index}`}
                    product={product}
                    toggleSelect = {toggleSelect}
                    addPrice={addPrice}
                    removePrice={removePrice }
                />
            )}
        </Grid>
    );
};

export default Content;

