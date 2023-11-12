import { atom } from 'recoil'

export const offsetState = atom({
  key: 'offsetState',
  default: 0,
})

export const contactListState = atom({
  key: 'contactListState',
  default: [],
})
