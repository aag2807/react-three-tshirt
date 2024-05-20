import { proxy } from 'valtio'

export const state = proxy({
  intro: true,
  selectedColor: '#ccc',
  selectedDecal: 'three2',
  colors: [
    '#ccc',
    '#80C670',
    '#726DE8',
    '#EF674E',
    '#353934',
    '#c5172a',
    'Purple'
  ],
  decals: ['react', 'three2', 'pmndrs', 'angular-shield']
})
