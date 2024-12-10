import { SearchBar } from "../HeaderRight/ResponsiveSearch/SearchBar";
import HeaderSearch from "./HeaderSearch";

const HeaderLeft = () => {
  return (
    <div className="header-left">
      <SearchBar />
      <HeaderSearch />
    </div>
  );
};

export default HeaderLeft;
