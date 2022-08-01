import { atom } from 'recoil';

export const dateState = atom({
  key: 'dateState',
  default: new Date(),
});
