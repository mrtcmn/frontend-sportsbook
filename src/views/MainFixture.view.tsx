import React, { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import FixtureRowComponent from '@src/components/FixtureRow.component';
import { IFixtureItem } from '@src/dtos/fixture.dto';

const MainFixtureView = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['betsData'],
    queryFn: () => fetch('https://nesine-case-study.onrender.com/bets').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className={'mainFixture-wrapper'}>Loading</div>;
  }

  if (error) {
    return <div className={'mainFixture-wrapper'}>error</div>;
  }

  return (
    <div className={'mainFixture-wrapper'}>
      <section className={'sticky-header'}>header</section>
      <section className={'fixtureItems'}>
        {data.map((item: IFixtureItem) => (
          <Fragment key={item.NID}>
            <FixtureRowComponent fixtureItem={item} />
          </Fragment>
        ))}
      </section>
    </div>
  );
};

export default MainFixtureView;
