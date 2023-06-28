"use client";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useEffect, useState } from "react";

import DragZone from "./components/DragZone";
import SideBar from "./components/Sidebar";

const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [videoSrc, seVideoSrc] = useState("");
  const [result, setResult] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [options, setOptions] = useState("");

  const videoLoad = async () => {
    await ffmpeg.load();
  };

  const uploadVideo = async (data: File | null) => {
    setVideo(data);
    if (data) {
      var url = URL.createObjectURL(data);
      seVideoSrc(url);
    }
  };
  const convertVideo = async (dataString: string) => {
    if (video) {
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

      switch (options) {
        case "Black & White":
          await ffmpeg.run(
            "-i",
            "test.mp4",
            "-vf",
            "format=gray",
            "output.mp4"
          );
          break;
        case "Blur":
          await ffmpeg.run("-i", "test.mp4", "-vf", "dblur", "output.mp4");
          break;
        case "Stabalize":
          await ffmpeg.run("-i", "test.mp4", "-vf", "deshake", "output.mp4");
          break;
        case "Reverse":
          await ffmpeg.run("-i", "test.mp4", "-vf", "reverse", "output.mp4");
          break;
        case "Vignette":
          await ffmpeg.run("-i", "test.mp4", "-vf", "vignette", "output.mp4");
          break;
        default:
          break;
      }

      const data = ffmpeg.FS("readFile", "output.mp4");
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      setResult(url);
    }
  };

  const handleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    videoLoad();
  }, []);

  return (
    <>
      <SideBar
        showSidebar={showSidebar}
        closeSidebar={handleSideBar}
        chooseOptions={setOptions}
      />
      <main
        className={` ${
          showSidebar
            ? "before:absolute before:top-0 before:bottom-0 before:-left-32 before:right-[95%] before:border-t-2 before:border-r-2 before:border-l-0 before:border-b-2  before:bg-blue-500"
            : ""
        } flex min-h-screen flex-col items-center justify-center p-4 gap-4 overflow-auto relative`}
      >
        <div className="absolute left-24 top-12 flex items-center justify-end mb-6">
          <button
            onClick={() => {
              handleSideBar();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-8 h-8 text-center text-white cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex-col items-center justify-center w-96 h-auto">
          {videoSrc ? (
            <video src={videoSrc} controls width="350" height="350"></video>
          ) : (
            <DragZone uploadVideo={uploadVideo} />
          )}
        </div>
        <form>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                uploadVideo(e.target.files?.item(0));
              }
            }}
          />
        </form>
        <button
          onClick={() => convertVideo(options)}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          convert
        </button>
        <div className="flex-col items-center justify-center w-96 h-56">
          {result && (
            <video src={result} controls width="350" height="350"></video>
          )}
        </div>
      </main>
    </>
  );
}
