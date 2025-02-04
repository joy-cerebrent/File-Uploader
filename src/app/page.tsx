"use client";

import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <section className="w-full max-w-lg text-center bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl mx-auto font-semibold mb-4">
          Next.js Custom File Uploader
        </h2>

        <FileUploader
          maxFiles={6}
          maxSize={100}
          onUpload={async (files) => {
            console.log("Uploading Files : ", files);

            await new Promise((resolve, _reject) => setTimeout(resolve, 2000));

            console.log("Upload Complete");
          }}
          allowedFiles={["any"]}
        />
      </section>
    </main>
  );
}
