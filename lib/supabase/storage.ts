import { createClient } from "@/lib/supabase/client";

const BUCKET = "media";

export async function uploadMedia(
  file: File,
  folder: string = "general"
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}.${ext}`;
  const path = `${folder}/${fileName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    console.error("uploadMedia:", error);
    return { url: null, error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

export async function deleteMediaFromUrl(url: string): Promise<boolean> {
  const supabase = createClient();

  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return false;

  const path = url.substring(idx + marker.length);
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  return !error;
}