"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";

interface DragNdropProps {
  onFilesSelected: (files: File[]) => void;
  width?: string | number;
  height?: string | number;
}

const DragNdrop: React.FC<DragNdropProps> = ({ onFilesSelected, width = "100%", height }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  useEffect(() => {
    if (submitted && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [submitted]);

  return (
    <div className="w-full flex flex-col items-center">
      <section
        className="w-full max-w-xl bg-white/20 border border-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6"
        style={{ width, height }}
      >
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`w-full min-h-[200px] border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-start transition-all ${
            files.length > 0 ? "border-green-500" : "border-blue-500 bg-blue-50/30"
          }`}
        >
          <div className="flex items-center mb-4 text-center">
            <AiOutlineCloudUpload className="text-4xl text-blue-500 mr-4" />
            <div>
              <p className="text-lg font-bold text-blue-600">Drag and drop your images here</p>
              <p className="text-sm text-gray-700">
                Limit 15MB per file. Supported: .JPG, .PNG, .GIF, .WEBP
              </p>
            </div>
          </div>

          <input
            type="file"
            id="image-upload"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="image-upload"
            className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-transparent hover:text-blue-600 hover:border hover:border-blue-600 transition-all text-sm font-semibold cursor-pointer"
          >
            Browse files
          </label>

          {files.length > 0 && (
            <div className="mt-4 w-full max-h-64 overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border rounded-md px-4 py-2 bg-white shadow-sm"
                >
                  <div className="text-sm text-gray-800 truncate">{file.name}</div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <MdClear className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-4 flex flex-col items-center w-full">
              <div className="flex items-center text-green-600">
                <AiOutlineCheckCircle className="mr-2" />
                <p className="text-sm font-medium">{files.length} file(s) selected</p>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-sm font-semibold"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </section>

      {submitted && (
        <div
          ref={resultRef}
          className="w-full mt-10 px-6 py-4 bg-green-100 text-green-800 rounded-lg shadow-md text-center max-w-6xl"
        >
          Files submitted successfully! (Results go here.)
        </div>
      )}
    </div>
  );
};

export default DragNdrop;
