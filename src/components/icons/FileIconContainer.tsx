import { AudioIcon } from "./AudioIcon";
import { BookIcon } from "./BookIcon";
import { DocIcon } from "./DocIcon";
import { FileBox } from "./FileBoxIcon";
import { PptIcon } from "./PptIcon";
import { VideoIcon } from "./VideoIcon";


type FileIconContainerProps = {
  fileName: string;
  type: "pdf" | "doc" | "ppt" | "video" | "audio" | "other";
};

const iconMap: Record<FileIconContainerProps["type"], React.ReactNode> = {
  video: <VideoIcon />,
  audio: <AudioIcon />,
  doc: <DocIcon />,
  ppt: <PptIcon />,
  pdf: <BookIcon />,
  other: <FileBox />,
};

export const FileIconContainer = ({
  fileName,
  type
}: FileIconContainerProps) => (
  <div className="flex flex-col items-center justify-center w-24 h-24 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg text-sm transition">
    {iconMap[type]}
    <p className="mt-0.5 text-[0.6rem] leading-tight text-center">{fileName}</p>
  </div>
);
