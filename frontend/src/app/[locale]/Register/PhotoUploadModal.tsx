import React from "react";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOptionSelect: (option: "camera" | "gallery") => void;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onOptionSelect,
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-white text-xl mb-4">Choose Photo Upload Option</h3>
        <button
          onClick={() => onOptionSelect("camera")}
          className="w-full p-3 mb-2 text-white bg-customBlue rounded-md"
        >
          Take a Photo Now
        </button>
        <button
          onClick={() => onOptionSelect("gallery")}
          className="w-full p-3 text-white bg-customBlue rounded-md"
        >
          Choose from Gallery
        </button>
        <button
          onClick={(e) => {onClose();}}
          className="w-full p-3 mt-4 text-gray-400 border border-zinc-600 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadModal;
