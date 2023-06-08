import { Dispatch, useState } from "react";

export default function DragZone({
  setVideo,
  seVideoSrc,
}: {
  setVideo: Dispatch<File | null>;
  seVideoSrc: string;
}) {
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    //seVideoSrc(URL.createObjectURL(event.dataTransfer.files[0]));
    //setVideo(event.dataTransfer.files[0]);
    console.log(event);
  };
  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <div
      className="dragzone p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <p className="mt-24 mb-24 font-semibold">
        Drag a file into <i>drop zone</i>.
      </p>
    </div>
  );
}
