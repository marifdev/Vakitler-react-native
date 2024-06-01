import { Colors } from "@/constants/Colors"

export type CurrentVakitType = {
  vakitName: keyof typeof Colors,
  vakitIndex: number
}