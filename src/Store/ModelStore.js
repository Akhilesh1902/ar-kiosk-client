import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const useModelStore = create((set) => ({
  model: {},
  currentModelUrl: '',
  currentModelAnim: 0,
  curModelAnimLength: 0,
  currentModelData: {},
  setCurentModelUrl: (url) => {
    set((state) => ({ ...state, currentModelUrl: url }));
  },
  setCurModelAnim: (num) => {
    set((state) => ({ ...state, currentModelAnim: num }));
  },
  setCurModelAnimLength: (num) => {
    set((state) => ({ ...state, curModelAnimLength: num }));
  },
  setCurrentModelData: (data) => {
    set((state) => ({ ...state, currentModelData: data }));
  },
  pushModel: (data) => {
    // if (model.contains(data)) {
    //   console.log('contains');
    //   return;
    // }
    set((state) => ({
      ...state,
      model: { ...state.model, [data.name]: data },
    }));
  },
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useModelStore);
}
