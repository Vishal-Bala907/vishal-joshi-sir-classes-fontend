import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { FaPencilAlt } from "react-icons/fa";
import ImageUploadModal from "./ImageUploadModal";
import "./ProfileCard.css"; // Ensure this file is included

const ProfileCard = () => {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const user = useSelector((state: any) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [mouseClick, setMouseClick] = useState(0);
  const [mouseButtonText, setMouseButtonText] = useState("Update");
  const [locked, setLocked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
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

  // const user = useSelector((state: RootState) => state.user);
  const handleMouseClick = () => {
    setLocked(!locked); // unlock for editing

    if (mouseClick % 2 !== 0) {
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
    <div ref={cardRef} className="profile-card">
      <div className="position-relative">
        <img
          ref={imageRef}
          className="profile-image"
          src={process.env.NEXT_PUBLIC_BASE_URL + user.image_url}
          alt="profile dp"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/assets/images/avatars/user.png";
          }}
        />

        <FaPencilAlt
          onClick={openModal}
          className="pencil text-black bg-secondary"
        />
      </div>
      <div className="profile-info">
        <div className="d-flex flex-row gap-3 align-items-center justify-content-center">
          <p className="text-dark m-0 p-0">Name</p>
          <input
            ref={nameRef}
            className="input-field m-0 p-0"
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            readOnly={locked}
          />
        </div>
        <div className="d-flex flex-row gap-3 align-items-center justify-content-center">
          <p className="text-dark m-0 p-0">Email</p>
          <input
            ref={emailRef}
            className="input-field m-0 p-0"
            type="text"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            readOnly={locked}
          />
        </div>
      </div>
      <button
        ref={buttonRef}
        className="update-button"
        onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.1 })}
        onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1 })}
        onClick={handleMouseClick}
      >
        {mouseButtonText}
      </button>
      {isModalOpen && <ImageUploadModal onClose={closeModal} />}
      {/* <ImageUploadModal onClose={closeModal} /> */}
    </div>
  );
};

export default ProfileCard;
