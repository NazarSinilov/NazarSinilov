import TextField from '@mui/material/TextField/TextField';
import React, { useState} from 'react';
import {Button} from "@mui/material";
import "./Header.scss"

interface HeaderProps {
    getSearchValue: (value: string) => void
    totalPrice: number
}

const Header = ({getSearchValue, totalPrice} :HeaderProps) => {
    const [inputValue, setInputValue] = useState("")

    return (
        <div className="header">
            <TextField onChange={(e) => setInputValue(e.target.value)} id="filled-basic" label="Filled" variant="filled" />
            <Button onClick={() => getSearchValue(inputValue)} variant="contained" >Поиск</Button>
            <div>{`Общая стоимость выбранных товаров: ${totalPrice} р`}</div>
        </div>
    );
};

export default Header;