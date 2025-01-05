import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./ProfileCard.css";
import style from "./student.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

interface Info {
  name: string;
  email: string;
}

const ProfileCard = () => {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const user = useSelector((state: RootState) => state.user);
  const [userInfo, setUserInfo] = useState<Info>({
    name: user.name,
    email: user.email,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [mouseClick, setMouseClick] = useState<number>(0);
  const [mouseButtonText, setMouseButtonText] = useState<string>("Update");
  const [locked, setLocked] = useState<boolean>(true);

  useEffect(() => {
    if (nameRef.current) nameRef.current.contentEditable = "false";
    if (emailRef.current) emailRef.current.contentEditable = "false";

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      imageRef.current,
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power1.inOut",
      paused: true,
    });
  }, []);

  const handleMouseClick = () => {
    setLocked(!locked); // unloacked for editing

    if (mouseClick % 2 != 0) {
      console.log(userInfo);
      if (nameRef.current && emailRef.current) {
        nameRef.current.style.border = "none";
        nameRef.current.style.background = "transparent";
        emailRef.current.style.border = "none";
        emailRef.current.style.background = "transparent";
      }
    } else {
      if (nameRef.current && emailRef.current) {
        nameRef.current.style.border = "1px solid black";
        nameRef.current.style.backgroundColor = "white";
        emailRef.current.style.border = "1px solid black";
        emailRef.current.style.backgroundColor = "white";
      }
    }

    setMouseButtonText(locked ? "Save Changes" : "Update");
    setMouseClick((prev) => prev + 1);
  };

  return (
    <div
      ref={cardRef}
      className={`${style.profileCard} d-flex justify-content-center align-items-center flex-column p-4`}
    >
      <img
        ref={imageRef}
        className={`${style.dp} my-5`}
        src="/assets/images/avtar/3.jpg"
        alt="profile dp"
      />
      <div className={`profile-email ${style.inp} `}>
        <input
          ref={nameRef}
          className={`${style.inp}  py-2 px-3 rounded-4`}
          type="text"
          value={userInfo.name}
          onChange={(e) => {
            setUserInfo((state) => ({ ...state, name: e.target.value }));
          }}
          readOnly={locked}
        />
      </div>
      <div className={`profile-email ${style.inp}`}>
        <input
          ref={emailRef}
          className={`${style.inp} py-2 px-3 rounded-4`}
          type="text"
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo((state) => ({ ...state, email: e.target.value }));
          }}
          readOnly={locked}
        />
      </div>
      <button
        className="update-button"
        ref={buttonRef}
        onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.1 })}
        onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1 })}
        onClick={handleMouseClick}
      >
        {mouseButtonText}
      </button>
    </div>
  );
};

export default ProfileCard;
