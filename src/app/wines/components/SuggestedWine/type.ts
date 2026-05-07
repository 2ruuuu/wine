import { WineResponse } from "@/app/wines/type";

export type SuggestedWineProps = Pick<
  WineResponse,
  'id' | 'name' | 'region' | 'image'
>;