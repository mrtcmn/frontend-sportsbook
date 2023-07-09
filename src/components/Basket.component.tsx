import React, { useContext, useEffect, useState } from 'react';
import { BasketContext } from '@src/contexts/Basket.context';
import { IBasketItem } from '@src/dtos/fixture.dto';

const STAKE = 1;
const BasketComponent = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { basketItems, setBasketItems } = useContext(BasketContext);

  useEffect(() => {
    const totalAmountCalc = basketItems.reduce((acc: number, cur: IBasketItem, index: number) => {
      if (index === 0) {
        acc = cur.odd * acc * STAKE;
      } else {
        acc = cur.odd * acc;

      }

      return acc;
    }, 1);
    setTotalAmount(totalAmountCalc.toFixed(2));
  }, [basketItems]);

  return (
    <section className={'basket'}>
      <div className={'odds'}>
        {basketItems.map((item: IBasketItem) => (
          <p key={item.id}>
            4 Kod: {item.eventCode} Maç: {item.eventName} <strong>Oran: {item.odd}</strong>
          </p>
        ))}
      </div>
      <p className="totalAmount">Toplam Tutar: {basketItems.length === 0 ? 0 : totalAmount}₺</p>
    </section>
  );
};

export default BasketComponent;
