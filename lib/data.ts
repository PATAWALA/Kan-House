export type Product = {
  id: string;
  name: string;
  category: "Canapés" | "Tables" | "Fauteuils" | "Luminaires";
  price: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Sofa Atelier N°1", category: "Canapés", price: "€ 4 200", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80" },
  { id: "p2", name: "Table Basse Onyx", category: "Tables", price: "€ 1 850", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&q=80" },
  { id: "p3", name: "Fauteuil Céleste", category: "Fauteuils", price: "€ 2 400", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80" },
  { id: "p4", name: "Suspension Lune", category: "Luminaires", price: "€ 980", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80" },
];