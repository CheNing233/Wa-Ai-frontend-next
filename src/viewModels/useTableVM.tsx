import { useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";

export type RowType = {
  key: string,

  [key: string]: any
}

export type ColumnType = {
  key: string,
  label: string,
}

export type MatcherType = (row: RowType) => boolean
export type MatcherMap = Record<string, MatcherType>

export default function useTableVM(
  data: RowType[]
) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending"
  });
  const [filterMatchers, _setFilterMatchers] = useState<MatcherMap>({});
  const setFilterMatcher = (id: string, newMatcher: MatcherType) => {
    _setFilterMatchers({
      ...filterMatchers,
      [id]: newMatcher
    });
  };
  const removeFilterMatcher = (id: string) => {
    const { [id]: _toBeRemoved, ...rest } = filterMatchers;

    _setFilterMatchers(rest);
  };

  const filteredData = useMemo(() => {
    let _filteredData = data;

    Object.values(filterMatchers).forEach((matcher) => {
      _filteredData = _filteredData.filter(matcher);
    });

    return _filteredData;
  }, [data, filterMatchers]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column] as number;
      const second = b[sortDescriptor.column] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredData, sortDescriptor]);


  return {
    filterMatchers,
    setFilterMatcher,
    removeFilterMatcher,
    sortedData
  };
}
