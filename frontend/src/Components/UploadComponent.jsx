import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import GooglePhotos from '../assets/googlephotos.svg';
import downloadIcon from '../assets/download.svg';

export default function UploadComponent() {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages([...images, ...uploadedImages]);

    // Simulate upload progress (for demonstration)
    simulateUploadProgress(uploadedImages.length);
  };

  // const simulateUploadProgress = (totalImages) => {
  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200); // Adjust speed of progress here
  };

  const handleDownload = () => {
    // Logic for downloading images or processing them
  };

  const handleLocalUpload = () => {
    document.getElementById("imageUpload").click();
  };

  const handleGoogleDriveUpload = () => {
    // Logic for handling Google Drive uploads
    alert("Google Drive upload clicked! Implement the logic here.");
  };

  const handlePhotosUpload = () => {
    // Logic for handling Photos uploads
    alert("Photos upload clicked! Implement the logic here.");
  };

  return (
    <div className="min-h-screen text-white flex flex-col pb-[280px]">
      {/* Upload Section */}
      <div className="flex-grow flex flex-col p-5 items-center justify-center space-y-6 mt-[-20px]"> {/* Adjust margin-top here */}
        <div className=" text-center">
          <div className="flex flex-row justify-center w-[1048px]">
            {/* Buttons for different upload sources */}
            <button
              onClick={handleGoogleDriveUpload}
              className="m-[0_27px_91px_0] flex items-center justify-center"
            >
              <img className="text-white text-2xl w-[50px] h-[30px]" style={{ filter: "invert(1)" }} src={GooglePhotos} />
            </button>
            <button
              onClick={handleLocalUpload}
              className="m-[50px_20px_0_0] w-[153px] h-[151px]"
            >
              <FontAwesomeIcon
                icon={faFolder}
                className="text-white text-2xl"
              />
            </button>
            <button
              onClick={handlePhotosUpload}
              className="m-[2px_0_87.4px_0] w-[119px] h-[116.6px]"
            >
              <FontAwesomeIcon
                icon={faGoogleDrive}
                className="text-white text-2xl"
              />
            </button>
          </div>
          <h1 className="text-4xl font-bold text-pink-500 mb-8">Upload Images</h1> {/* Adjust margin-bottom here */}
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <div className="flex justify-center mb-6"> {/* Adjust margin-bottom here */}
            <div className="shadow-[0px_0px_27px_0px_rgba(173,40,40,0.48)] rounded-[16px] bg-[linear-gradient(rgba(22,4,8,0.5),rgba(22,4,8,0.5))] m-[0_0_0_3.3px] flex p-[8px_7px_8px_6px] w-[796px] box-sizing-border">
              <div className="rounded-[12px] border-[1px_solid_rgba(255,255,255,0.1)] bg-[linear-gradient(rgba(22,4,8,0.96),rgba(22,4,8,0.96))] flex flex-row justify-between p-[6.5px_35px_8px_40px] w-[783px] h-[fit-content] box-sizing-border">
                <div className="flex flex-col box-sizing-border">
                  <div className="m-[0_0_8.5px_0] inline-block self-start break-words font-['Inter'] font-semibold text-[20px] leading-[1.35] text-[#FFFFFF]">
                    Zip File Name
                  </div>
                  <span className="break-words font-['Inter'] font-normal text-[16px] leading-[1.5] text-[rgba(255,238,247,0.8)]">
                    Size -- Number of images
                  </span>
                </div>
                <div className="rounded-[8px] bg-[linear-gradient(92.96deg,rgba(255,91,55,0.1),rgba(171,0,82,0.1))] m-[14px_0_13.5px_0] flex flex-row p-[7.5px_0_8.5px_16.1px] w-[114.1px] box-sizing-border">
                  <span
                    onClick={handleDownload} // Added onClick handler for download button
                    
                    className="m-[0_6.2px_0_0] break-words font-['Inter'] font-normal text-[14px] leading-[1.15] bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1))]  bg-clip-text cursor-pointer text-[transparent]"
                  >
                    Download
                  </span>
                  <div className="m-[3.9px_0_2.9px_0] flex w-[14px] h-[14px] box-sizing-border">
                    <img className="w-[9.2px] h-[5.7px] rotate-[-90deg]" src={downloadIcon} alt="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mb-10"> {/* Center and add margin-bottom here */}
            <div className="w-2/3 h-2 bg-gray-800 rounded-full">
              <div
                className="h-full bg-pink-500 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-4 gap-4 mt-10">
            {images.map((image, index) => (
              <div
                key={index}
                className="bg-gray-800 h-32 flex items-center justify-center rounded-lg"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
