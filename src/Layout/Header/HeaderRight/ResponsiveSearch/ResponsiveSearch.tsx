import SVG from "@/CommonComponent/SVG";
import { Href } from "@/Constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { setResponsiveSearch } from "@/Redux/Reducers/LayoutSlice";

const ResponsiveSearch = () => {
  const dispatch = useAppDispatch();

  return (
    <li className="search d-lg-none d-flex" onClick={() => dispatch(setResponsiveSearch())}>
      <a href={Href}>
        <SVG className="search-bg svg-color" iconId="Search" />
      </a>
    </li>
  );
};

export default ResponsiveSearch;
