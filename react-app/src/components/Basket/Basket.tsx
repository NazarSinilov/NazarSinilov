import React from 'react';

interface BasketProps {
    totalPrice: number
}

const Basket = ({totalPrice}: BasketProps) => {

    return (
        <div>{`Общая стоимость выбранных товаров: ${totalPrice} р`}</div>
    );
};

export default Basket;