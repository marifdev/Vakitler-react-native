export type VakitData = {
  Aksam: string
  AyinSekliURL: string
  GreenwichOrtalamaZamani: number
  Gunes: string
  GunesBatis: string
  GunesDogus: string
  HicriTarihKisa: string
  HicriTarihKisaIso8601: any
  HicriTarihUzun: string
  HicriTarihUzunIso8601: any
  Ikindi: string
  Imsak: string
  KibleSaati: string
  MiladiTarihKisa: string
  MiladiTarihKisaIso8601: string
  MiladiTarihUzun: string
  MiladiTarihUzunIso8601: string
  Ogle: string
  Yatsi: string
}

export type Data = {
  currentVakit: VakitData
  currentVakitIndex: number
  currentVakitName: "imsak" | "gunes" | "ogle" | "ikindi" | "aksam" | "yatsi"
  nextVakitIndex: number
  nextVakitName: string
  vakitler: { name: string, time: string }[]
  timeRemaining: {
    hours: number
    minutes: number
  }
}