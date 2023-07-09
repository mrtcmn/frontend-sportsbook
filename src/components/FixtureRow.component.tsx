import React, { useCallback, useContext } from 'react';
import { IFixtureItem } from '@src/dtos/fixture.dto';
import MarketGroupComponent from '@src/components/MarketGroup.component';

const FixtureRowComponent = ({ fixtureItem }: { fixtureItem: IFixtureItem }) => {
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

  return (
    <div className={'fixtureRow'}>
      <div className={'topArea'}>
        <div className={'firstCol'}>
          <span>
            {fixtureItem.D} {fixtureItem.DAY} {fixtureItem.LN}
          </span>
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
      <div className={'contentArea'}>
        <div className={'firstCol'}>
          <span>
            <strong>{fixtureItem.C}</strong> {fixtureItem.T} {fixtureItem.N}
          </span>
        </div>
        <div className={'otherFields'}>
          <div className={'columnGroup col2'}>
            <div className={'column'}>
              <span>Yorumlar</span>
            </div>
            <div className={'column'}>
              <span>{getPathValue(['OCG', '1', 'MBS'])}</span>
            </div>
          </div>
          <MarketGroupComponent fixtureItem={fixtureItem} cols={[0, 1, 2]} dataLocation={1} />
          <MarketGroupComponent fixtureItem={fixtureItem} cols={[25, 26]} dataLocation={5} />
          <MarketGroupComponent fixtureItem={fixtureItem} cols={[0, 0, 0, 0]} dataLocation={0} />
          <MarketGroupComponent fixtureItem={fixtureItem} cols={[0, 3, 4, 5]} dataLocation={2} />

          <div className={'columnGroup odd col3'}>
            <div className={'column'}>
              <span></span>
            </div>
            <div className={'column'}>
              <span></span>
            </div>
            <div className={'column'}>
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureRowComponent;
