import {RegionState} from '@explore/context/filter/types';
import {stableSort} from '~/util/sort';

interface Section {
  title: string;
  data: RegionState[];
}

function normalizeTerms(text: string) {
  return text.toLowerCase().trim();
}

export function extractSectionsFromRegionState({
  regions,
  query,
}: {
  regions: RegionState[];
  query?: string;
}): Array<Section> {
  const stateNames = [
    ...new Set(regions.map(region => region.stateName)),
  ].sort();

  const sections = stateNames.map(stateName => ({
    title: stateName,
    data: stableSort(
      regions.filter(region => region.stateName === stateName),
      (a, b) => a.name.localeCompare(b.name),
    ),
  }));

  if (!query) {
    return sections;
  }

  const reducedSections = sections.reduce<Section[]>((result, section) => {
    const {title, data} = section;
    const normalizedQuery = normalizeTerms(query);

    const isTitleMatch = normalizeTerms(title).includes(normalizedQuery);

    if (isTitleMatch) {
      return [...result, section];
    }

    const filteredData = data.filter(region => {
      return normalizeTerms(region.name).includes(normalizedQuery);
    });

    if (filteredData.length === 0) {
      return result;
    }

    return [
      ...result,
      {
        title,
        data: filteredData,
      },
    ];
  }, []);

  return reducedSections;
}
