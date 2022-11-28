import React from 'react';
import {Fab, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Content.scss"
import {IProduct} from "../models/IProduct";

interface ContentProps {
    products: IProduct[]
    setProducts:  React.Dispatch<React.SetStateAction<IProduct[]>>
}

const Content = (props: ContentProps) => {
    const {products, setProducts} = props

    return (
        <Grid container spacing={2}>
            {products.map( (product: IProduct, index: number) =>
                <Grid key={`item-${index}`} item xs={3} sx={{padding: "20px"}} className="grid-block">
                    <img src={product.images[0]} alt="seaImage"/>
                    <p>{product.title}</p>
                    <div className="price-block">
                        <span>{`Цена: ${product.price}`}</span>
                        <span>Всего: </span>
                    </div>
                    <div className="count-block">
                        <Fab size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <span>{`${0}`}</span>
                        <Fab size="small" color="primary" aria-label="add">
                            <RemoveIcon />
                        </Fab>
                    </div>

                </Grid>
           )}

        </Grid>
    );
};

export default Content;

