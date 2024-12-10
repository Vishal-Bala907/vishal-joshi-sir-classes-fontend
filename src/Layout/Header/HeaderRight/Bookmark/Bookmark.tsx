import SVG from "@/CommonComponent/SVG";
import { Href } from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import { useState } from "react";
import { BookmarkBack } from "./BookmarkBack";
import { BookmarkListData } from "./BookmarkListData";

const Bookmark = () => {
  const [show, setShow] = useState(false);
  const { flip } = useAppSelector((state) => state.layout);
  return (
    <li className="custom-dropdown">
      <a href={Href} onClick={() => setShow(!show)}>
        <SVG iconId="bookmark" />
      </a>
      <div className={`custom-menu bookmark-dropdown py-0 overflow-hidden onhover-show-div bookmark-flip ${show ? "show" : ""}`}>
        <div className="flip-card">
          <div className={`flip-card-inner ${flip ? "flipped" : ""}`}>
            <BookmarkListData />
            <BookmarkBack />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Bookmark;
