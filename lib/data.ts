// ============================================
// TYPES
// ============================================

export type ProductCategory =
  | "Canapés"
  | "Fauteuils"
  | "Tables"
  | "Luminaires"
  | "Rangement"
  | "Textiles";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  description: string;
  image: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDetails = {
  longDescription: string;
  specs: ProductSpec[];
  materials: string[];
  gallery: string[];
};

// ============================================
// CATÉGORIES
// ============================================

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Canapés",
  "Fauteuils",
  "Tables",
  "Luminaires",
  "Rangement",
  "Textiles",
];

export type DigitalCategory =
  | "Fournisseurs"
  | "Logistique"
  | "Coaching"
  | "Guides";

export type DigitalProduct = {
  id: string;
  title: string;
  category: DigitalCategory;
  price: string;
  description: string;
  format: string;        // ex. "PDF · 45 pages", "Coaching 1h", "Liste · 120 contacts"
  badge?: string;        // ex. "Bestseller", "Nouveau"
  image: string;
};

export const DIGITAL_CATEGORIES: DigitalCategory[] = [
  "Fournisseurs",
  "Logistique",
  "Coaching",
  "Guides",
];

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "fournisseurs-articles",
    title: "Fournisseurs Articles + Accessoires",
    category: "Fournisseurs",
    price: "89,99 €",
    description:
      "Liste vérifiée de fournisseurs chinois pour articles et accessoires. Contacts directs, prix indicatifs, conditions de commande.",
    format: "PDF · 45 pages",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
  },
  {
    id: "fournisseurs-meches",
    title: "Fournisseurs Mèches",
    category: "Fournisseurs",
    price: "89,99 €",
    description:
      "Sélection d'usines spécialisées en mèches naturelles, synthétiques et perruques. Contacts QC, délais, minimums de commande.",
    format: "PDF · 32 pages",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85",
  },
  {
    id: "transitaire-guangzhou",
    title: "Transitaires Guangzhou",
    category: "Logistique",
    price: "59,99 €",
    description:
      "Annuaire de transitaires fiables basés à Guangzhou. Tarifs indicatifs, zones couvertes, contacts directs et retours d'expérience.",
    format: "PDF · 24 pages",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=85",
  },
  {
    id: "accompagnement-sourcing",
    title: "Accompagnement Sourcing à Distance",
    category: "Coaching",
    price: "699 €",
    description:
      "Session individuelle de 2h avec un expert sourcing. Analyse de votre projet, identification des fournisseurs, méthode d'achat et contrôle qualité.",
    format: "Coaching · 2h en visio",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85",
  },
];


// ============================================
// PRODUITS
// ============================================

export const PRODUCTS: Product[] = [
  // ================= CANAPÉS =================
  {
    id: "sofa-atelier-1",
    name: "Sofa Atelier N°1",
    category: "Canapés",
    price: "€ 4 200",
    description: "Canapé 3 places en lin lavé, structure chêne massif. Fabrication artisanale.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
  },
  {
    id: "sofa-basse-courbe",
    name: "Sofa Basse Courbe",
    category: "Canapés",
    price: "€ 5 400",
    description: "Courbes enveloppantes, tissu bouclé crème. Pièce maîtresse de salon.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=85",
  },
  {
    id: "sofa-modulable-oslo",
    name: "Sofa Modulable Oslo",
    category: "Canapés",
    price: "€ 6 800",
    description: "Modulable 4 places, assise plume, revêtement laine chinée.",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=85",
  },

  // ================= FAUTEUILS =================
  {
    id: "fauteuil-celeste",
    name: "Fauteuil Céleste",
    category: "Fauteuils",
    price: "€ 2 400",
    description: "Assise velours profond, structure frêne teinté. Confort enveloppant.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
  },
  {
    id: "fauteuil-lounge-vert",
    name: "Fauteuil Lounge Vert",
    category: "Fauteuils",
    price: "€ 1 950",
    description: "Velours émeraude, piétement laiton. Lecture et repos prolongés.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85",
  },
  {
    id: "fauteuil-rotin",
    name: "Fauteuil Rotin Aube",
    category: "Fauteuils",
    price: "€ 1 480",
    description: "Rotin tressé main, coussin lin naturel. Esprit méditerranéen.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=85",
  },

  // ================= TABLES =================
  {
    id: "table-basse-onyx",
    name: "Table Basse Onyx",
    category: "Tables",
    price: "€ 1 850",
    description: "Plateau marbre noir veiné, piétement laiton brossé. Pièce unique.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&q=85",
  },
  {
    id: "console-fume",
    name: "Table Console Fumé",
    category: "Tables",
    price: "€ 2 100",
    description: "Verre fumé, structure acier noir mat. Idéale pour entrée ou couloir.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=85",
  },
  {
    id: "table-manger-chene",
    name: "Table à Manger Chêne",
    category: "Tables",
    price: "€ 3 600",
    description: "Chêne massif huilé, 8 places. Assemblage traditionnel à tenons.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=85",
  },

  // ================= LUMINAIRES =================
  {
    id: "suspension-lune",
    name: "Suspension Lune",
    category: "Luminaires",
    price: "€ 980",
    description: "Abat-jour opalin, structure laiton patiné. Diffusion lumineuse douce.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=85",
  },
  {
    id: "lampe-sol-arco",
    name: "Lampe à Poser Arco",
    category: "Luminaires",
    price: "€ 640",
    description: "Socle marbre, tige laiton, abat-jour lin naturel. Éclairage d'appoint.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=85",
  },
  {
    id: "applique-mur-oro",
    name: "Applique Murale Oro",
    category: "Luminaires",
    price: "€ 420",
    description: "Applique murale en laiton brossé, abat-jour en albâtre translucide.",
    image: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1200&q=85",
  },

  // ================= RANGEMENT =================
  {
    id: "buffet-henne",
    name: "Buffet Hênne",
    category: "Rangement",
    price: "€ 3 200",
    description: "Noyer massif, portes cannées, serrurerie laiton. Finition huilée.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=85",
  },
  {
    id: "bibliotheque-linea",
    name: "Bibliothèque Linéa",
    category: "Rangement",
    price: "€ 4 500",
    description: "Étagères métal noir, tablettes chêne clair. Modulable en 5 sections.",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&q=85",
  },

  // ================= TEXTILES =================
  {
    id: "tapis-berbere",
    name: "Tapis Berbère Atlas",
    category: "Textiles",
    price: "€ 1 800",
    description: "Laine vierge nouée main, motif berbère traditionnel. 200×300 cm.",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=85",
  },
  {
    id: "plaid-cachemire",
    name: "Plaid Cachemire Ivoire",
    category: "Textiles",
    price: "€ 690",
    description: "Cachemire 100%, tissage à la main. Finition franges nouées.",
    image: "https://images.unsplash.com/photo-1580301762395-836cf3b20c99?w=1200&q=85",
  },
];

// ============================================
// SÉLECTIONS — helpers pour la home et les pages
// ============================================

/**
 * Retourne les N premiers produits.
 * Utilisé par la home pour n'afficher que 6 pièces mises en avant.
 */
export function getFeaturedProducts(limit = 6): Product[] {
  return PRODUCTS.slice(0, limit);
}

/**
 * Retourne les produits d'une catégorie donnée.
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

// ============================================
// DÉTAILS PRODUIT (fiche)
// ============================================

export const PRODUCT_DETAILS: Record<string, ProductDetails> = {
  "sofa-atelier-1": {
    longDescription:
      "Le Sofa Atelier N°1 est né d'une collaboration entre nos ateliers parisiens et une manufacture familiale du Zhejiang. Sa structure en chêne massif certifié FSC est assemblée à tenons et mortaises, puis habillée d'un lin lavé aux fibres longues qui gagne en beauté avec le temps. Chaque pièce est numérotée et signée.",
    specs: [
      { label: "Dimensions", value: "220 × 92 × 78 cm" },
      { label: "Assise", value: "Plume et mousse haute résilience" },
      { label: "Structure", value: "Chêne massif certifié FSC" },
      { label: "Revêtement", value: "Lin lavé 100%" },
      { label: "Fabrication", value: "France · Chine" },
      { label: "Délai", value: "6 à 8 semaines" },
    ],
    materials: ["Chêne massif", "Lin lavé", "Plume naturelle"],
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=85",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
    ],
  },

  "sofa-basse-courbe": {
    longDescription:
      "Le Sofa Basse Courbe conjugue confort profond et silhouette fluide. Son revêtement en bouclé crème est tissé en Italie, sa structure en hêtre massif est assemblée à la main. Les coussins d'assise en plume naturelle se bonifient avec l'usage. Idéal pour les salons généreux et les espaces d'accueil hôteliers.",
    specs: [
      { label: "Dimensions", value: "240 × 100 × 74 cm" },
      { label: "Assise", value: "Plume naturelle" },
      { label: "Structure", value: "Hêtre massif" },
      { label: "Revêtement", value: "Bouclé crème (Italie)" },
      { label: "Fabrication", value: "Italie · France" },
      { label: "Délai", value: "7 à 9 semaines" },
    ],
    materials: ["Hêtre massif", "Bouclé crème", "Plume naturelle"],
    gallery: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=85",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
    ],
  },

  "sofa-modulable-oslo": {
    longDescription:
      "Le Sofa Modulable Oslo se compose de 4 modules indépendants qui se recomposent au gré des envies. Sa laine chinée grise, tissée au Portugal, résiste à l'usage intensif. Idéal pour les grands salons ouverts, les lofts et les espaces de coworking haut de gamme.",
    specs: [
      { label: "Dimensions", value: "320 × 180 × 72 cm" },
      { label: "Composition", value: "4 modules indépendants" },
      { label: "Assise", value: "Mousse HR 35 kg/m³" },
      { label: "Structure", value: "Hêtre massif" },
      { label: "Revêtement", value: "Laine chinée (Portugal)" },
      { label: "Délai", value: "8 à 10 semaines" },
    ],
    materials: ["Hêtre massif", "Laine chinée"],
    gallery: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=85",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=85",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=85",
    ],
  },

  "fauteuil-celeste": {
    longDescription:
      "Le Fauteuil Céleste incarne la rencontre du confort enveloppant et d'une ligne épurée. Son velours profond, tissé en Italie, est tendu sur une structure en frêne teinté. Les accoudoirs galbés invitent à la lecture prolongée, les pieds fuselés apportent la légèreté nécessaire aux intérieurs contemporains.",
    specs: [
      { label: "Dimensions", value: "78 × 82 × 74 cm" },
      { label: "Assise", value: "Mousse HR + garnissage plume" },
      { label: "Structure", value: "Frêne teinté" },
      { label: "Revêtement", value: "Velours italien" },
      { label: "Fabrication", value: "Italie · France" },
      { label: "Délai", value: "4 à 6 semaines" },
    ],
    materials: ["Frêne teinté", "Velours italien"],
    gallery: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=85",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600&q=85",
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=1600&q=85",
    ],
  },

  "fauteuil-lounge-vert": {
    longDescription:
      "Le Fauteuil Lounge Vert est un hommage aux salons anglais revisités. Son velours émeraude profond, tendu sur une structure en hêtre massif, est rehaussé par un piétement en laiton patiné. Une pièce signature pour les bibliothèques, fumoirs et lounges d'hôtel.",
    specs: [
      { label: "Dimensions", value: "84 × 88 × 76 cm" },
      { label: "Assise", value: "Mousse HR + garnissage plume" },
      { label: "Structure", value: "Hêtre massif" },
      { label: "Revêtement", value: "Velours émeraude" },
      { label: "Piétement", value: "Laiton patiné" },
      { label: "Délai", value: "5 à 7 semaines" },
    ],
    materials: ["Hêtre massif", "Velours émeraude", "Laiton patiné"],
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=85",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600&q=85",
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=1600&q=85",
    ],
  },

  "fauteuil-rotin": {
    longDescription:
      "Le Fauteuil Rotin Aube renoue avec une tradition millénaire, revisitée dans des lignes résolument contemporaines. Chaque brin de rotin est tressé à la main selon des motifs transmis de génération en génération. Le coussin amovible en lin naturel est déhoussable et lavable.",
    specs: [
      { label: "Dimensions", value: "72 × 76 × 82 cm" },
      { label: "Matériau", value: "Rotin tressé main" },
      { label: "Coussin", value: "Lin naturel déhoussable" },
      { label: "Structure", value: "Bois de frêne" },
      { label: "Fabrication", value: "France" },
      { label: "Délai", value: "3 à 5 semaines" },
    ],
    materials: ["Rotin naturel", "Lin", "Frêne"],
    gallery: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600&q=85",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=85",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
    ],
  },

  "table-basse-onyx": {
    longDescription:
      "La Table Basse Onyx marie le minéral et le métal dans un équilibre rare. Son plateau en marbre noir veiné, sélectionné bloc par bloc, repose sur un piétement en laiton brossé qui révèle la patine du temps. Chaque table est unique — les veines du marbre ne se répètent jamais.",
    specs: [
      { label: "Dimensions", value: "120 × 70 × 34 cm" },
      { label: "Plateau", value: "Marbre noir veiné 20 mm" },
      { label: "Piétement", value: "Laiton brossé" },
      { label: "Poids", value: "48 kg" },
      { label: "Fabrication", value: "Italie" },
      { label: "Délai", value: "5 à 7 semaines" },
    ],
    materials: ["Marbre noir", "Laiton brossé"],
    gallery: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=85",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=85",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=85",
    ],
  },

  "console-fume": {
    longDescription:
      "La Table Console Fumé est une pièce d'équilibre : plateau en verre fumé fumé noir de 12 mm, structure en acier noir mat, lignes tendues. Sa faible profondeur la rend idéale pour les entrées, couloirs et espaces de passage. Elle peut également servir de bureau sur-mesure.",
    specs: [
      { label: "Dimensions", value: "140 × 40 × 78 cm" },
      { label: "Plateau", value: "Verre fumé 12 mm" },
      { label: "Structure", value: "Acier noir mat" },
      { label: "Charge max", value: "40 kg" },
      { label: "Fabrication", value: "France" },
      { label: "Délai", value: "4 à 6 semaines" },
    ],
    materials: ["Verre fumé", "Acier noir mat"],
    gallery: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=85",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=85",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=85",
    ],
  },

  "table-manger-chene": {
    longDescription:
      "La Table à Manger Chêne est taillée dans un seul plateau de chêne massif huilé, assemblé à tenons et mortaises selon des techniques traditionnelles. Ses 8 places en font la pièce centrale des grandes salles à manger. Le bois, huilé à la main, se patine avec les années.",
    specs: [
      { label: "Dimensions", value: "260 × 100 × 76 cm" },
      { label: "Plateau", value: "Chêne massif 40 mm" },
      { label: "Piétement", value: "Chêne massif" },
      { label: "Capacité", value: "8 personnes" },
      { label: "Finition", value: "Huile naturelle" },
      { label: "Délai", value: "8 à 10 semaines" },
    ],
    materials: ["Chêne massif", "Huile naturelle"],
    gallery: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=85",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=85",
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=85",
    ],
  },

  "suspension-lune": {
    longDescription:
      "La Suspension Lune diffuse une lumière opaline sans éblouir. Son abat-jour en verre soufflé à la bouche est monté sur une structure en laiton patiné, façonnée à la main. Idéale pour un salon, une salle à manger ou un espace d'accueil hôtelier.",
    specs: [
      { label: "Dimensions", value: "Ø 45 × 40 cm" },
      { label: "Matériau", value: "Verre opalin soufflé" },
      { label: "Structure", value: "Laiton patiné" },
      { label: "Douille", value: "E27 — ampoule non fournie" },
      { label: "Fabrication", value: "France" },
      { label: "Délai", value: "3 à 4 semaines" },
    ],
    materials: ["Verre opalin", "Laiton patiné"],
    gallery: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=85",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&q=85",
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1600&q=85",
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=1600&q=85",
    ],
  },

  "lampe-sol-arco": {
    longDescription:
      "La Lampe à Poser Arco associe un socle en marbre blanc de Carrare à une tige en laiton brossé et un abat-jour en lin naturel. Elle apporte une lumière d'appoint chaude, idéale sur une table de chevet, un bureau ou une console d'entrée.",
    specs: [
      { label: "Dimensions", value: "Ø 32 × 62 cm" },
      { label: "Socle", value: "Marbre blanc de Carrare" },
      { label: "Tige", value: "Laiton brossé" },
      { label: "Abat-jour", value: "Lin naturel" },
      { label: "Fabrication", value: "Italie" },
      { label: "Délai", value: "3 à 4 semaines" },
    ],
    materials: ["Marbre de Carrare", "Laiton", "Lin"],
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&q=85",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=85",
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1600&q=85",
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=1600&q=85",
    ],
  },

  "applique-mur-oro": {
    longDescription:
      "L'Applique Murale Oro est une pièce discrète et précieuse : structure en laiton brossé, abat-jour en albâtre translucide qui diffuse une lumière chaude et tamisée. Parfaite pour encadrer une tête de lit, éclairer un couloir ou rythmer un mur de salon.",
    specs: [
      { label: "Dimensions", value: "18 × 12 × 28 cm" },
      { label: "Matériau", value: "Laiton brossé" },
      { label: "Abat-jour", value: "Albâtre translucide" },
      { label: "Douille", value: "E14 — ampoule non fournie" },
      { label: "Fabrication", value: "France" },
      { label: "Délai", value: "2 à 3 semaines" },
    ],
    materials: ["Laiton brossé", "Albâtre"],
    gallery: [
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1600&q=85",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=85",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&q=85",
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=1600&q=85",
    ],
  },

  "buffet-henne": {
    longDescription:
      "Le Buffet Hênne est un hommage au travail du bois. Son corps en noyer massif est rehaussé de portes cannées, d'une serrurerie en laiton et d'une finition huilée à la main. Un meuble bas, généreux, destiné à traverser les générations.",
    specs: [
      { label: "Dimensions", value: "180 × 45 × 82 cm" },
      { label: "Matériau", value: "Noyer massif" },
      { label: "Portes", value: "Cannage naturel" },
      { label: "Serrurerie", value: "Laiton massif" },
      { label: "Finition", value: "Huile naturelle" },
      { label: "Délai", value: "8 à 10 semaines" },
    ],
    materials: ["Noyer massif", "Cannage", "Laiton"],
    gallery: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=85",
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
    ],
  },

  "bibliotheque-linea": {
    longDescription:
      "La Bibliothèque Linéa est une structure en métal noir, fine et rigoureuse, qui accueille 5 tablettes en chêne clair. Modulable, elle peut être adossée à un mur ou servir de séparation ouverte. Une pièce sobre, graphique, qui laisse respirer les objets.",
    specs: [
      { label: "Dimensions", value: "240 × 35 × 210 cm" },
      { label: "Structure", value: "Métal noir mat" },
      { label: "Tablettes", value: "Chêne clair massif" },
      { label: "Sections", value: "5 tablettes modulables" },
      { label: "Fabrication", value: "France" },
      { label: "Délai", value: "6 à 8 semaines" },
    ],
    materials: ["Métal noir", "Chêne clair"],
    gallery: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1600&q=85",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
    ],
  },

  "tapis-berbere": {
    longDescription:
      "Le Tapis Berbère Atlas est noué main dans les montagnes du Moyen Atlas, à partir de laine vierge non teintée. Ses motifs géométriques traditionnels sont transmis de mère en fille depuis des siècles. Chaque tapis est unique — ses irrégularités sont la signature du travail manuel.",
    specs: [
      { label: "Dimensions", value: "200 × 300 cm" },
      { label: "Matériau", value: "Laine vierge 100%" },
      { label: "Fabrication", value: "Noué main — Maroc" },
      { label: "Épaisseur", value: "12 mm" },
      { label: "Entretien", value: "Nettoyage à sec" },
      { label: "Délai", value: "En stock" },
    ],
    materials: ["Laine vierge"],
    gallery: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1600&q=85",
      "https://images.unsplash.com/photo-1580301762395-836cf3b20c99?w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=85",
    ],
  },

  "plaid-cachemire": {
    longDescription:
      "Le Plaid Cachemire Ivoire est tissé à la main au Népal, à partir de cachemire 100% grade A. Sa texture aérienne et sa chaleur enveloppante en font la pièce parfaite pour les soirées d'hiver. Franges nouées à la main, finition signature.",
    specs: [
      { label: "Dimensions", value: "140 × 200 cm" },
      { label: "Matériau", value: "Cachemire 100% grade A" },
      { label: "Tissage", value: "Main — Népal" },
      { label: "Finition", value: "Franges nouées main" },
      { label: "Entretien", value: "Nettoyage à sec" },
      { label: "Délai", value: "En stock" },
    ],
    materials: ["Cachemire 100%"],
    gallery: [
      "https://images.unsplash.com/photo-1580301762395-836cf3b20c99?w=1600&q=85",
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=85",
    ],
  },
};

// ============================================
// HELPERS
// ============================================

/**
 * Récupère les détails d'un produit par id.
 * Renvoie null si le produit n'a pas de détails étendus.
 */
export function getProductDetails(id: string): ProductDetails | null {
  return PRODUCT_DETAILS[id] ?? null;
}