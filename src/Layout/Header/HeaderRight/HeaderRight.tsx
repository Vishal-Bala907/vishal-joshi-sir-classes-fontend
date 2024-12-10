import Bookmark from "./Bookmark/Bookmark";
import CartHeader from "./CartHeader/CartHeader";
import CloudDesign from "./CloudDesign/CloudDesign";
import DarkMode from "./DarkMode/DarkMode";
import Languages from "./Languages/Languages";
import MaximizeScreen from "./MaximizeScreen/MaximizeScreen";
import NotificationHeader from "./NotificationHeader/NotificationHeader";
import Profile from "./Profile/Profile";
import ResponsiveSearch from "./ResponsiveSearch/ResponsiveSearch";

const HeaderRight = () => {
  return (
    <div className="nav-right">
      <ul className="header-right">
        {/* <Languages/> */}
        <ResponsiveSearch />
        <DarkMode />
        {/* <CartHeader />
        <NotificationHeader />
        <MaximizeScreen />
        <Bookmark />
        <CloudDesign /> */}
        <Profile/>
        </ul>
    </div>
  );
};

export default HeaderRight;
