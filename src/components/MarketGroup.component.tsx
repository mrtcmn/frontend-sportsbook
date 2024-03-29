import React, { useCallback, useContext, useMemo } from 'react';
import { IBasketItem, IFixtureItem } from '@src/dtos/fixture.dto';
import { BasketContext } from '@src/contexts/Basket.context';

const MarketGroupComponent = ({ fixtureItem, cols, dataLocation }: { fixtureItem: IFixtureItem; cols: number[]; dataLocation: number }) => {
  const getPathValue = useCallback(
    (path: string[]) => {
      let tempData: any = fixtureItem;

      for (const key of path) {
        tempData = tempData?.[key];

        if (tempData === undefined) {
          return undefined;
        }
      }

      return tempData;
    },
    [fixtureItem],
  );
  const { basketItems, setBasketItems } = useContext(BasketContext);

  const toggleOdds = (id: string, odd: number) => {
    if (!(id && odd)) {
      return;
    }

    const finding = basketItems.find((item: IBasketItem) => item.id === id);
    const multiwayCheck = basketItems.find((item: IBasketItem) => item.id.includes(`${fixtureItem.NID}_`));

    if (finding) {
      const removedVersion = basketItems.filter((i: IBasketItem) => i.id !== id);
      setBasketItems(removedVersion);
    } else {
      if (multiwayCheck) {
        return;
      }
      setBasketItems([
        ...basketItems,
        {
          id: id,
          eventName: fixtureItem.N,
          eventCode: fixtureItem.C,
          odd: odd,
        },
      ]);
    }
  };

  const getSelectionsOfMarketGroup = (basketItems: IBasketItem[], fixtureItem: IFixtureItem): boolean[] => {
    const marketGroup = getPathValue(['OCG', dataLocation.toString(), 'OC']);
    const willReturnVal: boolean[] = [];

    if (marketGroup) {
      Object.keys(marketGroup).forEach((keyOC: string) => {
        const finding = basketItems.find((item: IBasketItem) => item.id === `${fixtureItem.NID}_${dataLocation}_${keyOC}`);

        willReturnVal.push(Boolean(finding));
      });
    }

    return willReturnVal;
  };

  const isSelectedMarketGroup: boolean[] = useMemo(
    () => getSelectionsOfMarketGroup(basketItems, fixtureItem),
    [basketItems], // ...so as long as these dependencies don't change...
  );

  const getIndex = (index: number) => {
    // Because of missing data
    if (cols && Array.isArray(cols) && cols[0] === 0 && dataLocation !== 1) {
      return index - 1;
    }
    return index;
  };

  return (
    <div className={'columnGroup odd col' + cols.length}>
      {cols.map((colsID: number, index: number) => (
        <div
          key={colsID}
          className={'column ' + (isSelectedMarketGroup[getIndex(index)] ? 'active' : '')}
          onClick={() =>
            toggleOdds(`${fixtureItem.NID}_${dataLocation}_${colsID}`, getPathValue(['OCG', dataLocation.toString(), 'OC', colsID.toString(), 'O']))
          }
        >
          <span>{getPathValue(['OCG', dataLocation.toString(), 'OC', colsID.toString(), 'O'])}</span>
        </div>
      ))}
    </div>
  );
};

export default MarketGroupComponent;
