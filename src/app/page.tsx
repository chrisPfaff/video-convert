"use client";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useEffect, useState } from "react";

const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [ready, setReady] = useState(false);
  const [videoSrc, seVideoSrc] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const videoLoad = async () => {
    await ffmpeg.load();
    setReady(true);
  };
  const uploadVideo = async (data: File | null, isResult: boolean) => {
    if (isResult) {
      setVideo(data);
      if (data) {
        var url = URL.createObjectURL(data);
        seVideoSrc(url);
      } else {
        if (data) {
          var url = URL.createObjectURL(data);
          setResult(url);
        }
      }
    }
  };
  const convertToGif = async () => {
    if (video) {
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
      await ffmpeg.run("-i", "test.mp4", "-vf", "format=gray", "output.mp4");
      const data = ffmpeg.FS("readFile", "output.mp4");
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      setResult(url);
    }
  };

  useEffect(() => {
    videoLoad();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex-col items-center justify-center w-96 h-auto">
        {videoSrc && (
          <video src={videoSrc} controls width="350" height="350"></video>
        )}
      </div>
      <form>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              uploadVideo(e.target.files?.item(0), true);
            }
          }}
        />
      </form>
      <button
        onClick={convertToGif}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        convert to gif
      </button>
      <div className="flex-col items-center justify-center w-96 h-56">
        {result && (
          <video src={result} controls width="350" height="350"></video>
        )}
      </div>
    </main>
  );
}
