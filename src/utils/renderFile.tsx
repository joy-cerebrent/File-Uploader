import { FileIconContainer } from "@/components/icons";
import Image from "next/image";

export const renderFile = (file: File) => {
  switch (true) {
    case file.type.startsWith("image/"):
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={100}
          height={100}
          className="rounded-lg"
        />
      );

    case file.type.startsWith("video/"):
      return (
        <FileIconContainer fileName={file.name} type={"video"} />
      );

    case file.type.startsWith("audio/"):
      return (
        <FileIconContainer fileName={file.name} type={"audio"} />
      );

    case file.type === "application/pdf":
      return (
        <FileIconContainer fileName={file.name} type={"pdf"} />
      );

    case file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return (
        <FileIconContainer fileName={file.name} type={"doc"} />
      );

    case file.type === "application/vnd.ms-powerpoint" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return (
        <FileIconContainer fileName={file.name} type={"ppt"} />
      );

    default:
      return (
        <FileIconContainer fileName={file.name} type={"other"} />
      );
  }
};