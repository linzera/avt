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

export interface FilterState {
  regions: RegionState[];
  isRegionsReady: boolean;
  setRegions: (regions: RegionState[]) => void;
}
