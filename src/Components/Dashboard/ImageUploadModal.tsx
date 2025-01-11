import React, { useState } from "react";
import "./imagemd.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateImage } from "@/server/user";

interface ImageUploadModalProps {
  onClose: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    "/assets/images/avtar/3.jpg"
  );

  const user = useSelector((state: any) => state.user);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageSubmit = async () => {
    if (!image) {
      toast.error("Please select an image", { position: "top-left" });
      return;
    }

    try {
      const base64Image = await convertToBase64(image);
      console.log(user._id);
      const response = await updateImage({
        userId: user._id,
        image: base64Image,
      });
      toast.success("Image updated successfully!", { position: "top-left" });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image. Try again.", {
        position: "top-left",
      });
    }
  };

  return (
    <div className="img-modal-wrapper" onClick={onClose}>
      <div className="img-modal-container" onClick={(e) => e.stopPropagation()}>
        <img className="modal-img" src={previewUrl} alt="Selected preview" />
        <label className="img-mdv-lb" htmlFor="select-image">
          Select Image
        </label>
        <input
          type="file"
          accept="image/*"
          id="select-image"
          className="modal-inp"
          onChange={handleImageChange}
        />
        <div className="btn-group">
          <button onClick={handleImageSubmit} className="btn-add">
            Add
          </button>
          <button className="btn-rmv" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
