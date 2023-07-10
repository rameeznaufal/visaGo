import { create } from 'zustand'

export const useCommonStore = create((set) => ({
  sideStrapVisible: false,
  index: -1,
  selectedOffer: null,
  setSideStrapVisible: (visible,index) => set((state) => ({ sideStrapVisible: visible,index:index })),
  setSelectedOffer:(offer) => set((state) => ({ selectedOffer: offer }))
}))