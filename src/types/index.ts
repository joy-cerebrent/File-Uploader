export type AllowedFileType = "image" | "video" | "audio" | "pdf" | "doc" | "ppt" | "any";

export interface FileUploaderProps {
  maxFiles?: number;
  maxSize?: number;
  inputClassName?: string;
  onUpload?: (files: File[]) => Promise<void>;
  allowedFiles?: AllowedFileType[];
}
