import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/supabase/products";

export default async function EditerProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return <ProductForm mode="edit" initialData={product} />;
}