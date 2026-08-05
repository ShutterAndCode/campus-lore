import {
  BRANCH_OPTIONS,
  YEAR_OPTIONS,
  SORT_OPTIONS,
} from "../constants/searchFilters";

import { useSearchQuery } from "../hooks/useSearchQuery";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchFilters() {
  const {
    branch,
    year,
    sort,
    setBranch,
    setYear,
    setSort,
  } = useSearchQuery();

  return (
    <div className="flex flex-wrap gap-4">
      {/* Branch */}
      <Select
        value={branch}
        onValueChange={setBranch}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Branch" />
        </SelectTrigger>

        <SelectContent>
          {BRANCH_OPTIONS.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year */}
      <Select
        value={year}
        onValueChange={setYear}
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>

        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={sort}
        onValueChange={setSort}
      >
        <SelectTrigger className="w-[190px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}