export interface Region {
  id: string;
  name: string;
  stateName: string;
}

export interface RegionState extends Region {
  isSelected: boolean;
}

export interface RegionsQuery {
  regions: Region[];
}

export interface Period {
  checkIn: string;
  checkOut: string;
}

export interface Guest {
  label: string;
  description: string;
  maxCount?: number;
  id: GuestVariant;
}

export interface GuestCountState {
  count: number;
}

export type Guests = Record<GuestVariant, GuestCountState>;

export type GuestVariant = 'adult' | 'children' | 'infants' | 'pets';

export interface FilterState {
  regions: RegionState[];
  period: Period;
  guests: Guests;
  formattedPeriod: string;
  isRegionsReady: boolean;
  isAnyDestination: boolean;
  guestsCount: number;
  nightsCount: number;
  filtersAppliedCount: number;
  clearFilters: () => void;
  setRegions: (regions: RegionState[]) => void;
  setPeriod: (period: Period) => void;
  setGuests: (guests: Guests) => void;
}
