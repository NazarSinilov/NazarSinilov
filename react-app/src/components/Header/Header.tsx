import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';
import "./Header.scss"
import Basket from "../Basket/Basket";
import {Button} from "@mui/material";

interface HeaderProps {
    getSearchValue: (value: string) => void
    totalPrice : number
}

const Header = ({getSearchValue, totalPrice} :HeaderProps) => {

    const [inputValue, setInputValue] = useState("")

    const getInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const getButtonValue = () => {
        getSearchValue(inputValue)
        setInputValue("")
    }

    return (
        <div className="header">
            <TextField
                onChange={getInputValue}
                id="filled-basic"
                label="Filled"
                variant="filled"
                value={inputValue}
            />
            <Button onClick={getButtonValue} variant="contained" >Поиск</Button>
            <Basket totalPrice={totalPrice}/>
        </div>
    );
};

export default React.memo(Header);