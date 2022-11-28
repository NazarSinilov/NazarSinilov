import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {Button} from "@mui/material";
import "./Header.scss"

const Header = () => {
    return (
        <div className="header">
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <Button variant="contained"  >Поиск</Button>
            <div>{`Общая стоимость выбранных товаров: ${0} р`}</div>
        </div>
    );
};

export default Header;