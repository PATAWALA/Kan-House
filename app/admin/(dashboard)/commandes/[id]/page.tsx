import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/supabase/orders";
import OrderDetail from "@/components/admin/OrderDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  return {
    title: order
      ? `${order.reference} — Admin Kan House`
      : "Commande introuvable",
  };
}

export default async function CommandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  return <OrderDetail order={order} />;
}