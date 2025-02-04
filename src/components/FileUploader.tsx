"use client";

import React, { useState, DragEvent } from "react";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

import { UploadIcon, FileIconContainer, DeleteIcon, XIcon } from "@/components/icons";

type AllowedFileType = "image" | "audio" | "video" | "pdf" | "doc" | "ppt" | "any";

type FileUploaderProps = {
  maxFiles?: number;
  maxSize?: number;
  inputClassName?: string;
  onUpload: (files: File[]) => Promise<void>;
  allowedFiles?: AllowedFileType[];
};

export default function FileUploader({
  maxFiles = 5,
  maxSize = 4,
  inputClassName,
  onUpload,
  allowedFiles = ["any"],
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);

  console.log(files)

  const isFileTypeAllowed = (file: File): boolean => {
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

  const handleFiles = (newFiles: FileList | null) => {
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

    const invalidFiles = fileArray.filter((file) => !isFileTypeAllowed(file));
    if (invalidFiles.length > 0) {
      setError(`Some files have unsupported formats.`);
      return;
    }

    setError(null);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const renderFile = (file: File, _index: number) => {
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


  const handlePreview = (file: File) => {
    if (previewFileUrl) {
      URL.revokeObjectURL(previewFileUrl);
    }
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewFileUrl(newPreviewUrl);
    setPreviewFile(file);
  };

  const closePreview = () => {
    if (previewFileUrl) {
      URL.revokeObjectURL(previewFileUrl);
    }
    setPreviewFileUrl(null);
    setPreviewFile(null);
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError("No files to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    if (onUpload) {
      try {
        await onUpload(files);
      } catch (err) {
        setError("Failed to upload files.");
      }
    }

    setIsUploading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragOver}
        onDrop={handleDrop}
        className={twMerge(
          "flex flex-col items-center justify-center h-48 w-80 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer",
          inputClassName
        )}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          id="fileInput"
          aria-label="File Upload"
        />
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center text-center text-gray-500 hover:text-blue-500 cursor-pointer"
        >
          <UploadIcon />
          <p>
            {isDraggingOver
              ? "Drop files here"
              : "Drag and drop files here, or click to select files"}
          </p>
          <p>
            Up to {maxFiles} files, {maxSize} MB each
          </p>
        </label>
      </div>

      {error && (
        <div className="mt-2 bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold ml-1 text-red-600">
            <XIcon />
          </button>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => handlePreview(file)}
            >
              {renderFile(file, index)}
              <button
                className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {(previewFile && previewFileUrl) && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <button
              onClick={closePreview}
              className="absolute p-0.5 top-0 right-0 translate-x-1/3 -translate-y-1/3 transition bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-black rounded-full"
            >
              <XIcon />
            </button>
            {previewFile.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(previewFile)}
                alt={previewFile.name}
                width={500}
                height={500}
              />
            ) : previewFile.type.startsWith("video/") ? (
              <video
                controls
                width={500}
                height={500}
                className="rounded-lg"
              >
                <source src={URL.createObjectURL(previewFile)} type={previewFile.type} />
              </video>
            ) : previewFile.type.startsWith("audio/") ? (
              <audio
                controls
                className="rounded-lg"
              >
                <source src={URL.createObjectURL(previewFile)} type={previewFile.type} />
                Your browser does not support the audio tag.
              </audio>
            ) : previewFile.type === "application/pdf" || previewFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <iframe
                src={URL.createObjectURL(previewFile)}
                width="500"
                height="600"
                title="PDF Preview"
              />
            ) : (
              <p className="text-gray-800">
                Preview not available for this file type.
              </p>
            )}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>

          {isUploading && (
            <div className="w-full mt-2 h-2 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full bg-blue-500 animate-pulse"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
