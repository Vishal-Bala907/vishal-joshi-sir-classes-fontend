import SVG from "@/CommonComponent/SVG";
import { useAppDispatch } from "@/Redux/Hooks";
import { SearchSuggestionListType } from "@/Types/LayoutTypes";
import Link from "next/link";

const ResponsiveSearchList: React.FC<SearchSuggestionListType> = ({ searchedArray, setSearchedWord }) => {
  const handleSearch = () => setSearchedWord("");

  return (
    <>
      {searchedArray?.map((item, index) => (
        <div className="ProfileCard u-cf" key={index}>
          <div className="ProfileCard-avatar">
            <SVG className="search-bg svg-color" iconId={item.icon} />
          </div>
          <div className="ProfileCard-details">
            <div className="ProfileCard-realName">
              <Link className="realname w-auto d-flex justify-content-start gap-2" href={`${item.path}`} onClick={handleSearch}>
                {item.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
      {!searchedArray?.length && <p>Opps!! There are no result found.</p>}
    </>
  );
};

export default ResponsiveSearchList;
