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

export interface FilterState {
  regions: RegionState[];
  period: Period;
  formattedPeriod: string;
  isRegionsReady: boolean;
  setRegions: (regions: RegionState[]) => void;
  setPeriod: (period: Period) => void;
}
