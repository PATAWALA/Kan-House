import { createClient } from "@/lib/supabase/server";
import type { ProjectRow, ProjectInsert } from "./types";

// ============================================
// LECTURE
// ============================================

export async function getProjects(): Promise<ProjectRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProjects:", error);
    return [];
  }
  return (data ?? []) as ProjectRow[];
}

export async function getProjectById(id: string): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ProjectRow;
}

// ============================================
// ÉCRITURE
// ============================================

export async function createProject(
  project: ProjectInsert
): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("createProject:", error);
    return null;
  }
  return data as ProjectRow;
}

export async function updateProject(
  id: string,
  updates: Partial<ProjectInsert>
): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateProject:", error);
    return null;
  }
  return data as ProjectRow;
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("deleteProject:", error);
    return false;
  }
  return true;
}