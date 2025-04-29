import SVG from "@/CommonComponent/SVG";
import { Href, ImagePath, LogIn } from "@/Constant";
import { UserListData } from "@/Data/Applications/Layout/SidebarData";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Profile = () => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };
  return (
    <li className="profile-nav custom-dropdown w-100 ">
      <div className="user-wrap">
        <div className="user-img">
          <Image
            width={64}
            height={59}
            src={session?.user?.image || `${ImagePath}/profile.png`}
            alt="user"
          />
        </div>
        <div className="user-content w-100 " onClick={() => setShow(!show)}>
          <h6 className="m-0 p-0 w-100 h-100">{session?.user?.email}</h6>
          <p className="mb-0">
            {session?.user?.name || "Admin"}
            <i className="fa-solid fa-chevron-down" />
          </p>
        </div>
        <div className={`custom-menu overflow-hidden ${show ? "show" : ""}`}>
          <ul className="profile-body">
            {/* {UserListData.map((item, index) => (
              <li className='d-flex' key={index}>
                <SVG className='svg-color' iconId={item.icon} />
                <Link className='ms-2' href={item.href}>
                  {item.text}
                </Link>
              </li>
            ))} */}
            <li className="d-flex" onClick={handleLogout}>
              <SVG className="svg-color" iconId="Login" />
              <Link className="ms-2" href={Href}>
                {"Logout"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Profile;
