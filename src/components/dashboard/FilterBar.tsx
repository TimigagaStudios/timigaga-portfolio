import React from 'react';

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue = '',
  onSearchChange,import React from 'react';

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filterValue = '',
  onFilterChange,
  filterOptions = [],
}) => {
  const inputClasses =
    'min-w-[220px] rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/8 dark:border-white/10 px-4 py-3 text-sm text-[var(--app-heading)] placeholder:text-[var(--app-muted)] outline-none transition-all focus:border-[#95EF90]';

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        className={inputClasses}
      />

      {filterOptions.length > 0 && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="rounded-xl bg-black/[0.03] dark:bg-[#0A0A0A] border border-black/8 dark:border-white/10 px-4 py-3 text-sm text-[var(--app-heading)] outline-none transition-all focus:border-[#95EF90]"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option} className="bg-[#0A0A0A] text-white">
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FilterBar;
  searchPlaceholder = 'Search...',
  filterValue = '',
  onFilterChange,
  filterOptions = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        className="min-w-[220px] rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-[#95EF90]"
      />

      {filterOptions.length > 0 && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="rounded-xl bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#95EF90]"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option} className="bg-[#0A0A0A] text-white">
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FilterBar;
