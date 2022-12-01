import TextField from '@mui/material/TextField/TextField';
import React, { useState} from 'react';
import "./Header.scss"
import Basket from "../Basket/Basket";
import {Button} from "@mui/material";

interface HeaderProps {
    getSearchValue: (value: string) => void
    totalPrice : number
}

const Header = ({getSearchValue, totalPrice} :HeaderProps) => {

    const [inputValue, setInputValue] = useState("")

    return (
        <div className="header">
            <TextField onChange={(e) => setInputValue(e.target.value)} id="filled-basic" label="Filled" variant="filled" />
            <Button onClick={() => getSearchValue(inputValue)} variant="contained" >Поиск</Button>
            <Basket totalPrice={totalPrice}/>
        </div>
    );
};

export default Header;