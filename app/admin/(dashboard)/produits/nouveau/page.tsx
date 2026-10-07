import ProductForm from "@/components/admin/ProductForm";

export const metadata = {
  title: "Nouveau produit — Admin Kan House",
};

export default function NouveauProduitPage() {
  return <ProductForm mode="create" />;
}