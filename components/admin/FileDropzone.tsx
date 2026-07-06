"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";

interface FileDropzoneProps {
  name: string;
  accept?: string;
  required?: boolean;
  label: string;
  /** Shown when no new file has been picked yet (e.g. the current file name on an edit form). */
  currentFileName?: string;
}

/**
 * Drag-and-drop file picker for admin forms (documents upload/edit). Wraps a
 * plain `<input type="file">` so it still works with native FormData/server
 * actions unchanged — drag-and-drop just fills that same input via
 * DataTransfer, no separate upload path to keep in sync.
 */
export default function FileDropzone({ name, accept, required, label, currentFileName }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pickedFileName, setPickedFileName] = useState<string | null>(null);

  function applyFiles(files: FileList | null) {
    if (!files || files.length === 0 || !inputRef.current) return;
    // Assign via DataTransfer so the underlying <input type="file"> reports
    // the dropped file the same way a normal click-to-browse selection would.
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(files[0]);
    inputRef.current.files = dataTransfer.files;
    setPickedFileName(files[0].name);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    applyFiles(e.dataTransfer.files);
  }

  function clearFile(e: React.MouseEvent) {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    setPickedFileName(null);
  }

  const displayName = pickedFileName ?? currentFileName;

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        className={`flex items-center gap-3 px-4 py-4 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
          isDragging
            ? "border-stone-500 bg-stone-100 dark:bg-stone-800"
            : "border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600"
        }`}
      >
        {displayName ? (
          <>
            <FileText className="w-5 h-5 text-stone-500 dark:text-stone-400 flex-shrink-0" />
            <span className="flex-1 min-w-0 text-sm text-stone-700 dark:text-stone-300 truncate">{displayName}</span>
            <button
              type="button"
              onClick={clearFile}
              title="Bỏ chọn tệp"
              className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <UploadCloud className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <span className="text-sm text-stone-500 dark:text-stone-400">
              Kéo thả tệp vào đây, hoặc bấm để chọn
            </span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        name={name}
        type="file"
        required={required && !currentFileName}
        accept={accept}
        onChange={(e) => setPickedFileName(e.target.files?.[0]?.name ?? null)}
        className="hidden"
      />
    </div>
  );
}
