import {
  AudioIcon,
  BookIcon,
  DocIcon,
  FileBox,
  PptIcon,
  VideoIcon,
} from "../icons";

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
  <div className="flex flex-col items-center justify-center w-24 h-24 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg text-sm">
    {iconMap[type]}
    <p className="mt-0.5 text-[0.6rem] leading-tight text-center">{fileName}</p>
  </div>
);
