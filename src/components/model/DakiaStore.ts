import RestRequest from "./RestRequest";
export type DakiaStore<T> = {
  requests: T[];
  add: (item: T) => void;
  update: (item: T) => void;
  remove: (key: string) => void;
  selectByIndex: (index: number) => void;
  selectByKey: (key: string) => void;
};
