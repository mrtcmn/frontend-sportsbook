import React, { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import FixtureRowComponent from '@src/components/FixtureRow.component';
import { IFixtureItem } from '@src/dtos/fixture.dto';
import { useVirtualizer } from '@tanstack/react-virtual';

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
    estimateSize: () => 48,
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
      <section className={'sticky-header'}>header</section>
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
              <div key={item.key} data-index={item.index} ref={item.measureElement}>
                <FixtureRowComponent fixtureItem={data[item.index]} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainFixtureView;
