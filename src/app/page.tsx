"use client";

import FileUploader from "@/components/FileUploader";

export default function Home() {
  const handleUpload = async (files: File[]) => {
    console.log("Uploading Files : ", files);

    await new Promise((resolve, _reject) => setTimeout(resolve, 2000));

    console.log("Upload Complete");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <section className="w-full max-w-lg text-center bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl mx-auto font-semibold mb-4">
          Next.js Custom File Uploader
        </h2>

        <FileUploader
          maxFiles={6}
          maxSize={100}
          allowedFiles={["any"]}
          onUpload={handleUpload}
          previewClassName="bg-white p-4 rounded-lg shadow-lg"
          dropZoneClassName="bg-white hover:bg-blue-100 hover:border-black transition"
          dropZoneLabelClassName="group-hover:text-black"
          errorClassName="bg-red-100 text-red-600 p-2 rounded-lg border border-red-200"
          fileItemClassName="flex items-center space-x-4 p-4 border-b border-gray-300 hover:bg-gray-100 transition"
          uploadButtonClassName="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-blue-300 transition"
          loadingClassName="bg-blue-100 text-blue-500 p-2 rounded-lg"
          deleteButtonClassName="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          closePreviewButtonClassName="bg-red-200 hover:bg-red-300 p-1"
        />
      </section>
    </main>
  );
}
