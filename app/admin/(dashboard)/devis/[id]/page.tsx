import { notFound } from "next/navigation";
import { getQuoteById } from "@/lib/supabase/quotes";
import QuoteDetail from "@/components/admin/QuoteDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getQuoteById(id);
  return {
    title: quote
      ? `${quote.reference} — Admin Kan House`
      : "Devis introuvable",
  };
}

export default async function DevisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) notFound();

  return <QuoteDetail quote={quote} />;
}