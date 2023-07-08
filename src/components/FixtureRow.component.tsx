import React, { useCallback } from 'react';
import { IFixtureItem } from '@src/dtos/fixture.dto';

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
          {fixtureItem.D} {fixtureItem.DAY} {fixtureItem.LN}
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
            {fixtureItem.C} {fixtureItem.T} {fixtureItem.N}
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
          <div className={'columnGroup col3'}>
            <div className={'column'}>
              <span>1</span>
            </div>
            <div className={'column'}>
              <span>x</span>
            </div>
            <div className={'column'}>
              <span>2</span>
            </div>
          </div>
          <div className={'columnGroup col2'}>
            <div className={'column'}>
              <span>Alt</span>
            </div>
            <div className={'column'}>
              <span>Üst</span>
            </div>
          </div>
          <div className={'columnGroup col4'}>
            <div className={'column'}>
              <span>H1</span>
            </div>
            <div className={'column'}>
              <span>1</span>
            </div>
            <div className={'column'}>
              <span>x</span>
            </div>
            <div className={'column'}>
              <span>2</span>
            </div>
          </div>
          <div className={'columnGroup col4'}>
            <div className={'column'}>
              <span>H2</span>
            </div>
            <div className={'column'}>
              <span>1-X</span>
            </div>
            <div className={'column'}>
              <span>1-2</span>
            </div>
            <div className={'column'}>
              <span>2-X</span>
            </div>
          </div>
          <div className={'columnGroup col3'}>
            <div className={'column'}>
              <span>Var</span>
            </div>
            <div className={'column'}>
              <span>Yok</span>
            </div>
            <div className={'column'}>
              <span>99+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureRowComponent;
