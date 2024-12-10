import SVG from "@/CommonComponent/SVG";
import { Back, Href } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { handleBookmarkChange } from "@/Redux/Reducers/BookmarkHeaderSlice";
import { setFlip } from "@/Redux/Reducers/LayoutSlice";
import { BookmarkedDataType } from "@/Types/LayoutTypes";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Input } from "reactstrap";

export const BookmarkBack = () => {
  const dispatch = useAppDispatch();
  const { linkItemsArray } = useAppSelector((store) => store.bookmarkHeader);
  const [searchedItems, setSearchedItems] = useState<(BookmarkedDataType)[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const searchItems = (e: string) => {
    let copyArray = [...linkItemsArray];
    let result = copyArray.filter((item, i) => item.title?.toLowerCase().includes(e.toLowerCase()));
    setSearchedItems(result);
  };

  const handleBackButton = () => {
    dispatch(setFlip())
    setSearchWord("");
  };

  const bookMarkInputChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setSearchWord(e.target.value);
    searchItems(e.target.value);
  }

  return (
    <div className="back">
      <ul>
        <li>
          <div className="flip-back-content">
            <Input type="text" placeholder="search..." onChange={(e) => bookMarkInputChange(e)} value={searchWord}/>
          </div>
          <div className={`filled-bookmark Typeahead-menu  ${searchWord ? "is-open" : ""} custom-scrollbar`}>
            {searchedItems?.map((item:any, i:number) => (
              <div key={i} className="ProfileCard u-cf">
                <div className="ProfileCard-avatar"><SVG className={`stroke-icon`} iconId={`${item.icon}`} /></div>
                <div className="ProfileCard-details">
                  <div className="ProfileCard-realName">
                    <Link className="realname" href={Href}>{item.title}</Link>
                    <span className="pull-right">
                      <a href={Href}>
                        <SVG iconId="star" className={`svg-color icon-star ${linkItemsArray[item.id - 1].bookmarked ? "starred" : ""}`} onClick={() => dispatch(handleBookmarkChange(linkItemsArray[item.id - 1]))}/>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!searchedItems.length && <p>Opps!! There are no result found.</p> }
          </div>
        </li>
        <li onClick={handleBackButton}>
          <a className="f-w-700 d-block flip-back btn btn-secondary text-white" id="flip-back" href={Href}>{Back}</a>
        </li>
      </ul>
    </div>
  );
};
