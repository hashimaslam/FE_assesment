import SearchIcon from "@mui/icons-material/Search";
import { StyledSearchBar } from "./styles";
import { IData } from "../types/types";
import React from "react";

interface IsearchBar {
  setData: Function;
  mainData: IData[];
}
const SearchBar: React.FC<IsearchBar> = ({ setData, mainData }) => {
  const handleChange = ({ target: { value } }: any) => {
    let newData = mainData.filter((item: IData) => {
      let text = (item.first + " " + item.last).toLowerCase();
      if (text.search(value.toLowerCase()) !== -1) {
        return item;
      }
    });
    setData(newData);
  };
  return (
    <>
      <StyledSearchBar
        type="text"
        fullWidth
        placeholder="search"
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" color="disabled" />,
        }}
      />
    </>
  );
};

export default SearchBar;
