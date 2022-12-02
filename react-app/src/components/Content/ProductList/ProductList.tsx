import {Fab, Grid} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {IProduct} from "../../models/IProduct";

interface ProductListProps {
    product: IProduct
    toggleSelect: (price: number, count: number, id: number) => void
    addPrice: (id: number, e : React.MouseEvent) => void
    removePrice: (id: number, e: React.MouseEvent) => void
}

const ProductList = ({product, toggleSelect, addPrice, removePrice}: ProductListProps) => {

    return (
        <Grid onClick={() => toggleSelect(product.price, product.countProducts, product.id)}
              key={`item-${product.id}`} item xs={3} sx={{padding: "20px"}}
              className={product.countProducts ? "green" : ""}>
            <img src={product.images[0]} alt="seaImage"/>
            <p>{product.title}</p>
            <div className="price-block">
                <span>{`Цена: ${product.price} p.`}</span>
                <span>{`Всего: ${product.stock}`}</span>
            </div>
            <div className="count-block">
                <Fab onClick={(e) => removePrice(product.id, e)} size="small" color="primary" aria-label="add">
                    <RemoveIcon/>
                </Fab>
                <span>{`${product.countProducts}`}</span>
                <Fab onClick = {(e) => addPrice(product.id, e)} size="small" color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>
        </Grid>
    );
};

export default React.memo(ProductList);