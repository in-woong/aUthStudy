import { atom, selector } from 'recoil';
import { getImage } from '../service/images';
import { dateState } from './date';

export const imageState = atom({
  key: 'imageState',
  default: selector({
    key: 'image/get',
    get: async ({ get }) => {
      const date = get(dateState);
      const image = await getImage(date);
      return image as string;
    },
  }),
});
