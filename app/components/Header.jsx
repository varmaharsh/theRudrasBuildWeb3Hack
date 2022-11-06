import { useState } from "react";
import { Button, Dropdown, Input } from "web3uikit";
import { FILTERS } from "../constants";

const Header = ({ heading, subHeading, showFilters, filterBooks }) => {
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].label);
  const [searchText, setSearchText] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const applyFilters = () => {
    filterBooks(selectedFilter, searchText);
    setShowFilterOptions(false);
  };

  const resetFilters = () => {
    filterBooks();
    setSelectedFilter(FILTERS[0].label);
    setSearchText("");
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">{heading}</h1>
          <p className="text-base mt-2 text-slate-400">{subHeading}</p>
        </div>
        {showFilters ? (
          <div className="flex flex-row items-center">
            {showFilterOptions ? (
              <div className="flex flex-row items-center">
                <div>
                  <Dropdown
                    label="Fitler By: "
                    onChange={(item) => setSelectedFilter(item.id)}
                    options={FILTERS}
                  />
                </div>
                <div className="ml-3">
                  <Input
                    label=""
                    name="searchText"
                    value={searchText}
                    onBlur={function noRefCheck() {}}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="ml-3">
                  <Button onClick={applyFilters} size="large" text="Apply" />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <div>
                  <Button
                    onClick={() => setShowFilterOptions(true)}
                    size="large"
                    text="Add Filters"
                  />
                </div>
                {searchText.length > 0 && (
                  <div>
                    <Button onClick={resetFilters} size="large" text="Reset" />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;
