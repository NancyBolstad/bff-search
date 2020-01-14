import {
  GetTripPatternsParams, TripPattern, Location,
} from '@entur/sdk'

export type CursorData = {
  v: number,
  params: SearchParams,
}

export type SearchParams = {
  from: Location,
  to: Location,
  cursor?: string,
  initialSearchDate?: Date,
  skipTaxi?: boolean,
} & GetTripPatternsParams

export type SearchResults = {
  transitTripPatterns: TransitTripPatterns,
  nonTransitTripPatterns: NonTransitTripPatterns,
}

export interface TransitTripPatterns {
  tripPatterns: TripPattern[],
  hasFlexibleTripPattern: boolean,
  isSameDaySearch: boolean,
}

export interface NonTransitTripPatterns {
  bicycle?: TripPattern,
  car?: TripPattern,
  foot?: TripPattern,
}
