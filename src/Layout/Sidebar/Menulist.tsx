import SVG from "@/CommonComponent/SVG";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { handlePined } from "@/Redux/Reducers/LayoutSlice";
import { MenuListType, SidebarItemTypes } from "@/Types/LayoutTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "reactstrap";
import { Icon } from "@iconify/react";

const Menulist: React.FC<MenuListType> = ({
  menu,
  setActiveMenu,
  activeMenu,
  level,
}) => {
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const ActiveNavLinkUrl = (path?: string, active?: boolean) => {
    return pathname === path ? (active ? active : true) : "";
  };

  const shouldSetActive = ({ item }: SidebarItemTypes) => {
    var returnValue = false;
    if (item?.path === pathname) {
      returnValue = true;
    }
    if (!returnValue && item?.children) {
      item?.children.every((subItem) => {
        returnValue = shouldSetActive({ item: subItem });
        return !returnValue;
      });
    }
    return returnValue;
  };

  useEffect(() => {
    menu?.forEach((item: any) => {
      let gotValue = shouldSetActive({ item });
      if (gotValue) {
        let temp = [...activeMenu];
        temp[level] = t(item.title);
        setActiveMenu(temp);
      }
    });
    ActiveNavLinkUrl();
  }, []);

  return (
    <>
      {menu?.map((item, index) => {
        // console.log(item.title);
        return (
          <li
            key={index}
            className={`${level === 0 ? "sidebar-list" : ""} ${
              pinedMenu.includes(item.title || "") ? "pined" : ""
            } ${
              (item.children
                ? item.children
                    .map((innerItem) => ActiveNavLinkUrl(innerItem.path))
                    .includes(true)
                : ActiveNavLinkUrl(item.path)) ||
              activeMenu[level] === item.title
                ? "active"
                : ""
            } `}
          >
            {level === 0 && (
              <i
                className="fa-solid fa-thumbtack"
                onClick={() => dispatch(handlePined(item.title))}
              ></i>
            )}
            <Link
              className={`${level / 2 === 0 ? "sidebar-link" : ""} ${
                (item.children
                  ? item.children
                      .map((innerItem) => ActiveNavLinkUrl(innerItem.path))
                      .includes(true)
                  : ActiveNavLinkUrl(item.path)) ||
                activeMenu[level] === item.title
                  ? "active"
                  : ""
              }`}
              href={item?.path ? item?.path : ""}
              onClick={() => {
                const temp = activeMenu;
                temp[level] = item.title !== temp[level] && item.title;
                setActiveMenu([...temp]);
              }}
            >
              {item.icon && (
                <Icon
                  className={`stroke-icon`}
                  icon={item.icon}
                  width="28"
                  height="28"
                />
              )}
              {!item.icon ? (
                t(item.title)
              ) : (
                <h6 className={item.lanClass && item.lanClass}>
                  {t(item.title)}
                </h6>
              )}
              {item.badge && (
                <Badge pill color="primary">
                  {item.badge}
                </Badge>
              )}

              {item.children && (
                <i
                  className={`iconly-Arrow-Right-2 icli ${
                    level / 2 !== 0 ? "custom-menu-arrow" : ""
                  }`}
                ></i>
              )}
            </Link>
            {item.children && (
              <ul
                className={` simple-list ${
                  level / 2 === 0 ? "sidebar-submenu" : "according-submenu"
                }`}
                style={{
                  display: `${
                    (item.children
                      ? item.children
                          .map((innerItem) => ActiveNavLinkUrl(innerItem.path))
                          .includes(true)
                      : ActiveNavLinkUrl(item.path)) ||
                    activeMenu[level] === item.title
                      ? "block"
                      : "none"
                  }`,
                }}
              >
                <Menulist
                  menu={item.children}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  level={level + 1}
                />
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

export default Menulist;
