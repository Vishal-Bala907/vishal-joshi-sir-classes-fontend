import {
  StudentMenuList,
  MentorMenuList,
  AdminMenuList,
} from "@/Data/Applications/Layout/SidebarData";
import { MenuItem } from "@/Types/LayoutTypes";
import { Fragment, useEffect, useState } from "react";
import Menulist from "./Menulist";
import { useAppSelector } from "@/Redux/Hooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const SidebarMenuList = () => {
  const user = useSelector((state: any) => state.user);
  const [activeMenu, setActiveMenu] = useState([]);
  const [menuList, setMenuList] = useState(StudentMenuList);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const shouldHideMenu = (mainMenu: MenuItem) => {
    return mainMenu?.Items?.map((data) => data.title).every((titles) =>
      pinedMenu.includes(titles || "")
    );
  };
  const { t } = useTranslation("common");

  useEffect(() => {
    console.log(user.role);
    if (user.role) {
      switch (user.role) {
        case "admin":
          setMenuList(AdminMenuList);
          break;
        case "mentor":
          setMenuList(MentorMenuList);
          break;
        default:
          setMenuList(StudentMenuList);
          break;
      }
    }
  }, [user?.role]);

  return (
    <>
      {menuList &&
        menuList.map((mainMenu: MenuItem, index) => (
          <Fragment key={index}>
            <li
              className={`sidebar-main-title ${
                shouldHideMenu(mainMenu) ? "d-none" : ""
              }`}
            >
              <div>
                <h5
                  className={`f-w-700 sidebar-title ${
                    mainMenu.lanClass && mainMenu.lanClass
                  }`}
                >
                  {t(mainMenu.title)}
                </h5>
              </div>
            </li>
            <Menulist
              menu={mainMenu.Items}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              level={0}
            />
          </Fragment>
        ))}
    </>
  );
};

export default SidebarMenuList;
