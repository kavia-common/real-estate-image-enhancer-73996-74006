"use client";

import React, { useCallback, useRef, useState } from "react";

type Props = {
  onFiles: (files: File[]) => void;
  maxFiles?: number;
};

export default function DropzoneUploader({ onFiles, maxFiles = 30 }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback((list: FileList) => {
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;
    const selected = files.slice(0, maxFiles);
    onFiles(selected);
  }, [onFiles, maxFiles]);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const openPicker = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`dropzone ${dragOver ? "dragover" : ""}`}
      onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragOver={(e) => { e.preventDefault(); }}
      onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }}
      />
      <div style={{ display: "grid", gap: 8, placeItems: "center" }}>
        <div className="badge">Up to {maxFiles} images</div>
        <div style={{ fontSize: 16, color: "#4b5563" }}>
          Drag & drop images here, or
        </div>
        <button className="btn btn-primary" onClick={openPicker}>Browse files</button>
      </div>
    </div>
  );
}
