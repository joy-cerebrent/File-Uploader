import { AllowedFileType } from "@/types";

export const isFileTypeAllowed = (file: File, allowedFiles: AllowedFileType[]): boolean => {
  if (allowedFiles.includes("any")) return true;

  const fileTypeMap: Record<AllowedFileType, RegExp> = {
    image: /^image\//,
    video: /^video\//,
    audio: /^audio\//,
    pdf: /^application\/pdf$/,
    doc: /^(application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
    ppt: /^(application\/vnd.ms-powerpoint|application\/vnd.openxmlformats-officedocument.presentationml.presentation)$/,
    any: /.*/,
  };

  return allowedFiles.some((type) => fileTypeMap[type].test(file.type));
};