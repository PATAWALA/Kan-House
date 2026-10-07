"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { uploadMedia, deleteMediaFromUrl } from "@/lib/supabase/storage";
import { cn } from "@/lib/cn";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;      // "products" | "projects" | "resources"
  label?: string;
  aspect?: "square" | "portrait" | "landscape";
}

export default function ImageUploader({
  value,
  onChange,
  folder = "general",
  label = "Image",
  aspect = "portrait",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      // Validation
      if (!file.type.startsWith("image/")) {
        setError("Le fichier doit être une image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 5 Mo.");
        return;
      }

      setError("");
      setUploading(true);

      // Supprime l'ancienne image si elle existe
      if (value && value.includes("/storage/")) {
        await deleteMediaFromUrl(value);
      }

      const { url, error: uploadError } = await uploadMedia(file, folder);

      setUploading(false);

      if (uploadError || !url) {
        setError(uploadError || "Erreur lors de l'upload.");
        return;
      }

      onChange(url);
    },
    [value, folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = async () => {
    if (!value) return;
    if (!confirm("Supprimer cette image ?")) return;

    if (value.includes("/storage/")) {
      await deleteMediaFromUrl(value);
    }
    onChange("");
  };

  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
  }[aspect];

  return (
    <div>
      <label className="block text-[0.65rem] uppercase tracking-[0.22em]
                        text-[var(--color-espresso)]/55 mb-2">
        {label}
      </label>

      {value ? (
        /* ---------- APERÇU ---------- */
        <div className="space-y-3">
          <div
            className={cn(
              "relative w-full max-w-xs bg-[var(--color-cafe-dark)] overflow-hidden",
              aspectClass
            )}
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <Image
              src={value}
              alt="Aperçu"
              fill
              sizes="320px"
              className="object-cover"
            />

            {/* Bouton supprimer en overlay */}
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Supprimer l'image"
              className="absolute top-2 right-2 w-8 h-8 grid place-items-center
                         bg-[var(--color-espresso)]/85 text-[var(--color-cafe-light)]
                         hover:bg-[var(--color-bordeaux)] transition-colors"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-[0.7rem] uppercase tracking-[0.2em]
                       text-[var(--color-espresso)]/55
                       underline underline-offset-[5px]
                       hover:text-[var(--color-espresso)] transition-colors"
          >
            Remplacer l'image
          </button>
        </div>
      ) : (
        /* ---------- ZONE DE DROP ---------- */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative w-full max-w-xs py-10 cursor-pointer",
            "flex flex-col items-center justify-center gap-3",
            "transition-colors",
            dragOver
              ? "bg-[var(--color-cafe-dark)]"
              : "bg-transparent hover:bg-[var(--color-cafe-dark)]/40",
            uploading && "pointer-events-none opacity-60"
          )}
          style={{
            border: `1px dashed ${
              dragOver
                ? "var(--color-espresso)"
                : "var(--color-border-line)"
            }`,
          }}
        >
          {uploading ? (
            <>
              <Loader2
                size={24}
                strokeWidth={1.4}
                className="animate-spin text-[var(--color-espresso)]/55"
              />
              <p className="text-[0.75rem] text-[var(--color-espresso)]/55">
                Upload en cours…
              </p>
            </>
          ) : (
            <>
              {dragOver ? (
                <ImageIcon
                  size={24}
                  strokeWidth={1.4}
                  className="text-[var(--color-espresso)]"
                />
              ) : (
                <Upload
                  size={24}
                  strokeWidth={1.4}
                  className="text-[var(--color-espresso)]/55"
                />
              )}
              <div className="text-center">
                <p className="text-[0.78rem] text-[var(--color-espresso)]/75">
                  Cliquez ou déposez une image
                </p>
                <p className="text-[0.68rem] text-[var(--color-espresso)]/45 mt-1">
                  JPG, PNG, WebP — max 5 Mo
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Champ caché */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInput}
        className="hidden"
      />

      {/* Erreur */}
      {error && (
        <p className="text-[0.75rem] text-[var(--color-bordeaux)] mt-3">
          {error}
        </p>
      )}
    </div>
  );
}