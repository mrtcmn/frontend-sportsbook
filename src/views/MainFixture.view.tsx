import React, { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import FixtureRowComponent from '@src/components/FixtureRow.component';
import { IFixtureItem } from '@src/dtos/fixture.dto';
import { useVirtualizer } from '@tanstack/react-virtual';
import BasketComponent from '@src/components/Basket.component';

const MainFixtureView = () => {
  const parentRef = React.useRef();

  const { isLoading, error, data } = useQuery({
    queryKey: ['betsData'],
    queryFn: () => fetch('https://nesine-case-study.onrender.com/bets').then((res) => res.json()),
  });

  const getCount = (data: IFixtureItem[]) => {
    if (data && Array.isArray(data)) {
      return data.length;
    }
    return 0;
  };

  const rowVirtualizer = useVirtualizer({
    count: getCount(data),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 62,
    overscan: 5,
  });

  const fixtureItemsV: any = rowVirtualizer.getVirtualItems();

  if (isLoading) {
    return <div className={'mainFixture-wrapper'}>Loading</div>;
  }

  if (error) {
    return <div className={'mainFixture-wrapper'}>error</div>;
  }

  return (
    <div className={'mainFixture-wrapper'}>
      <section className={'stickyHeader'}>
        <div className={'fixtureRow'}>
          <div className={'topArea'}>
            <div className={'firstCol'}>
              <span>Event count: {data.length}</span>
            </div>
            <div className={'otherFields'}>
              <div className={'columnGroup col2'}>
                <div className={'column'}>Yorumlar</div>
                <div className={'column'}></div>
              </div>
              <div className={'columnGroup col3'}>
                <div className={'column'}>1</div>
                <div className={'column'}>x</div>
                <div className={'column'}>2</div>
              </div>
              <div className={'columnGroup col2'}>
                <div className={'column'}>Alt</div>
                <div className={'column'}>Üst</div>
              </div>
              <div className={'columnGroup col4'}>
                <div className={'column'}>H1</div>
                <div className={'column'}>1</div>
                <div className={'column'}>x</div>
                <div className={'column'}>2</div>
              </div>
              <div className={'columnGroup col4'}>
                <div className={'column'}>H2</div>
                <div className={'column'}>1-X</div>
                <div className={'column'}>1-2</div>
                <div className={'column'}>2-X</div>
              </div>
              <div className={'columnGroup col3'}>
                <div className={'column'}>Var</div>
                <div className={'column'}>Yok</div>
                <div className={'column'}>99+</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={'fixtureItems'} ref={parentRef}>
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${fixtureItemsV[0].start}px)`,
            }}
          >
            {fixtureItemsV.map((item: any) => (
              <div className={'fixtureRowWrapper'} key={item.key} data-index={item.index} ref={item.measureElement}>
                <FixtureRowComponent fixtureItem={data[item.index]} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <BasketComponent />
    </div>
  );
};

export default MainFixtureView;
