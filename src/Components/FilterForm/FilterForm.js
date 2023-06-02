import React from "react";
import { Select, MenuItem, Button } from "@material-ui/core";

const FilterForm = ({
  selectedPlayers,
  onFilterChange,
  onApplyFilters
}) => {
  const handleFilterChange = (event) => {
    const filterType = event.target.name;
    const filterValue = event.target.value;

    onFilterChange(filterType, filterValue);
  };

  return (
    <div>
      Number of Results:
      <Select
        name="players"
        value={selectedPlayers}
        onChange={handleFilterChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
        <MenuItem value="20">20</MenuItem>
      </Select>
      <Button variant="contained" onClick={onApplyFilters}>
        Apply
      </Button>
    </div>
  );
};

export default FilterForm;
