export type AllowedFileType = "image" | "video" | "audio" | "pdf" | "doc" | "ppt" | "any";

export type FileUploaderProps = {
  maxFiles?: number;
  maxSize?: number;
  allowedFiles?: AllowedFileType[];
  onUpload: (files: File[]) => Promise<void>;
  previewClassName?: string;
  dropZoneClassName?: string;
  dropZoneLabelClassName?: string;
  errorClassName?: string;
  fileItemClassName?: string;
  uploadButtonClassName?: string;
  loadingClassName?: string;
  deleteButtonClassName?: string;
  closePreviewButtonClassName?: string;
}
