import Image from "next/image";

export const getFilePreview = (previewFile: File) => {
  const fileUrl = URL.createObjectURL(previewFile);

  if (previewFile.type.startsWith("image/")) {
    return (
      <Image
        src={fileUrl}
        alt={previewFile.name}
        width={500}
        height={500}
        className="rounded-lg"
      />
    );
  } else if (previewFile.type.startsWith("video/")) {
    return (
      <video controls width={500} height={500} className="rounded-lg">
        <source src={fileUrl} type={previewFile.type} />
      </video>
    );
  } else if (previewFile.type.startsWith("audio/")) {
    return (
      <audio controls className="rounded-lg">
        <source src={fileUrl} type={previewFile.type} />
        Your browser does not support the audio tag.
      </audio>
    );
  } else if (
    previewFile.type === "application/pdf" ||
    previewFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <iframe
        src={fileUrl}
        width="500"
        height="600"
        title="PDF Preview"
      />
    );
  } else {
    return <p className="text-gray-800">Preview not available for this file type.</p>;
  }
};
