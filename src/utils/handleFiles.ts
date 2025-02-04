import { AllowedFileType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { isFileTypeAllowed } from "../utils";

export const handleFiles = (
  newFiles: FileList | null,
  setFiles: Dispatch<SetStateAction<File[]>>,
  files: File[],
  maxFiles: number,
  maxSize: number,
  allowedFiles: AllowedFileType[],
  setError: Dispatch<SetStateAction<string | null>>
) => {
  if (!newFiles) return;

  const fileArray = Array.from(newFiles);
  const totalFiles = files.length + fileArray.length;

  if (totalFiles > maxFiles) {
    setError(`You can upload up to ${maxFiles} files only.`);
    return;
  }

  const oversizedFiles = fileArray.filter((file) => file.size / 1024 / 1024 > maxSize);
  if (oversizedFiles.length > 0) {
    setError(`Each file must be smaller than ${maxSize} MB.`);
    return;
  }

  const invalidFiles = fileArray.filter((file) => !isFileTypeAllowed(file, allowedFiles));
  if (invalidFiles.length > 0) {
    setError(`Some files have unsupported formats.`);
    return;
  }

  setError(null);
  setFiles((prev) => [...prev, ...fileArray]);
};