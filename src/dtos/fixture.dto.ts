export interface IFixtureItem {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: {
    [key: string]: IOCGInnerObject;
  };
  HEC: boolean;
}

export interface IOCGInnerObject {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: {
    [key: string]: IOCInnerObject;
  };
}

export interface IOCInnerObject {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
}


export interface IBasketItem {
  id: string;
  eventName: string;
  eventCode: string;
  odd: number;
}
