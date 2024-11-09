import { PrayerName } from "@/enum/PrayerName";

export const Colors: { [key in PrayerName]: any } = {
  [PrayerName.Imsak]: {
    text: '#065984',
    background: '#DAF2FE',
    border: '#9AC1D9',
    0: '#D3EEFE',
    1: '#CAEAFC',
    2: '#C2E6FB',
    3: '#B8E3F9',
    4: '#B0DFFA',
    5: '#A9DAF9',
    bottom: "#9FD7F7"
  },
  [PrayerName.Gunes]: {
    text: '#993413',
    background: '#FEEAD5',
    border: '#E1AC90',
    0: '#FEE4CD',
    1: '#FEDFC4',
    2: '#FFD8BC',
    3: '#FED3B4',
    4: '#FDCDAA',
    5: '#FDC7A2',
    bottom: "#FDC19A"
  },
  [PrayerName.Ogle]: {
    text: '#844D0F',
    background: '#FEF6CB',
    border: '#D9BC84',
    0: '#FDF1C3',
    1: '#FCEEBB',
    2: '#FCEBB4',
    3: '#FAE8AB',
    4: '#FBE4A4',
    5: '#F9E29B',
    bottom: "#F8DE93"
  },
  [PrayerName.Ikindi]: {
    text: '#993413',
    background: '#FFEDD5',
    border: '#E1A585',
    0: '#FFE7CD',
    1: '#FFE2C3',
    2: '#FFDCBC',
    3: '#FED5B3',
    4: '#FECFAA',
    5: '#FEC9A1',
    bottom: "#FEC49A"
  },
  [PrayerName.Aksam]: {
    text: '#1D40AF',
    background: '#DFEDFF',
    border: '#8AA7E7',
    0: '#D6E8FE',
    1: '#CFE2FD',
    2: '#C8DDFD',
    3: '#C0D9FD',
    4: '#B8D3FE',
    5: '#AFCDFD',
    bottom: '#A7C8FC'
  },
  [PrayerName.Yatsi]: {
    text: '#3730A3',
    background: '#E4E8FE',
    border: '#9595E0',
    0: '#DDE1FD',
    1: '#D7DAFD',
    2: '#D1D4FC',
    3: '#CACEFD',
    4: '#C4C8FB',
    5: '#BDC1FA',
    bottom: '#B7BBFA'
  },
};
