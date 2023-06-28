import { Dispatch, useState } from "react";

export default function DragZone({
  uploadVideo,
}: {
  uploadVideo: Dispatch<File | null>;
}) {
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    uploadVideo(event.dataTransfer.files[0]);
  };
  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
