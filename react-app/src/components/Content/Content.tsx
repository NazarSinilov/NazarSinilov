import React, {useCallback} from 'react';
import {Fab, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Content.scss"
import {IProduct} from "../models/IProduct";

interface ContentProps {
    products: IProduct[]
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
    getPrice: (totalPrice: number) => void
}

const Content = (props: ContentProps) => {
    const {products, setProducts, getPrice} = props

    const addPrice = useCallback((id: number, e : React.MouseEvent) => {
        e.stopPropagation()
        const newProd: IProduct[] = products.map((el, index) => {
            if (id === index) {

                if (el.stock <= 0) {
                    return el
                }

                getPrice(el.price)
                el.countProducts = el.countProducts + 1;
                el.stock = el.stock - 1
            }
            return el;
        })
        setProducts(newProd)
    }, [products ,getPrice, setProducts])

    const removePrice = useCallback((id: number, e: React.MouseEvent) => {
        e.stopPropagation()
        const newProd: IProduct[] = products.map((el, index) => {
            if (id === index) {

                if (el.stock >= 45) {
                    return el
                }

                getPrice(-el.price)
                el.countProducts = el.countProducts - 1;
                el.stock = el.stock + 1
            }
            return el;
        })
        setProducts(newProd)
    }, [products ,getPrice, setProducts])

    const toggleSelect = useCallback((price: number, count: number, id: number) => {
        const newProd : IProduct[] = products.map((el, index) => {
            if (index === id && count === 0) {
                el.countProducts = el.countProducts + 1;
                el.stock = el.stock - 1
                getPrice(el.price)
                return el
            } else if (index === id && count !== 0) {
                el.countProducts = 0
                el.stock = 45
                getPrice(-(el.price * count))
                return el
            }
            return el
        })
        setProducts(newProd)
    }, [products ,getPrice, setProducts])

    return (
        <Grid container spacing={2}>
            {products.map((product: IProduct, index: number) =>
                <Grid onClick={() => toggleSelect(product.price, product.countProducts, index)}
                      key={`item-${index}`} item xs={3} sx={{padding: "20px"}}
                      className={product.countProducts ? "green" : ""}>
                    <img src={product.images[0]} alt="seaImage"/>
                    <p>{product.title}</p>
                    <div className="price-block">
                        <span>{`Цена: ${product.price} p.`}</span>
                        <span>{`Всего: ${product.stock}`}</span>
                    </div>
                    <div className="count-block">
                        <Fab onClick={(e) => removePrice(index, e)} size="small" color="primary" aria-label="add">
                            <RemoveIcon/>
                        </Fab>
                        <span>{`${product.countProducts}`}</span>
                        <Fab onClick={(e) => addPrice(index, e)} size="small" color="primary" aria-label="add">
                            <AddIcon/>
                        </Fab>
                    </div>
                </Grid>
            )}
        </Grid>
    );
};

export default Content;

