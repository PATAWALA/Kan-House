// ============================================
// KAN HOUSE — Types de la base de données
// Reflète exactement le schéma SQL Supabase
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================
// TYPES COMMUNS
// ============================================

export type ProductSpec = {
  label: string;
  value: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export type OrderAddress = {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export type QuoteVenueType = "hotel" | "restaurant" | "villa" | "lounge";

export type QuoteStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "won"
  | "lost";

// ============================================
// TABLE : products
// ============================================

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string | null;
  long_description: string | null;
  image: string | null;
  gallery: string[];
  specs: ProductSpec[];
  materials: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ProductInsert = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  description?: string | null;
  long_description?: string | null;
  image?: string | null;
  gallery?: string[];
  specs?: ProductSpec[];
  materials?: string[];
  featured?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProductUpdate = Partial<ProductInsert>;

// ============================================
// TABLE : categories
// ============================================

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  position: number;
  created_at: string;
};

export type CategoryInsert = {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  position?: number;
  created_at?: string;
};

export type CategoryUpdate = Partial<CategoryInsert>;

// ============================================
// TABLE : orders (commandes B2C)
// ============================================

export type OrderRow = {
  id: string;
  reference: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  items: OrderItem[];
  subtotal: number | null;
  shipping: number | null;
  total: number;
  status: OrderStatus;
  payment_id: string | null;
  address: OrderAddress | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderInsert = {
  id?: string;
  reference: string;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  items: OrderItem[];
  subtotal?: number | null;
  shipping?: number | null;
  total: number;
  status?: OrderStatus;
  payment_id?: string | null;
  address?: OrderAddress | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type OrderUpdate = Partial<OrderInsert>;

// ============================================
// TABLE : quotes (devis B2B)
// ============================================

export type QuoteRow = {
  id: string;
  reference: string;
  venue_type: QuoteVenueType | null;
  surface: string | null;
  rooms: string | null;
  collections: string[];
  company: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
};

export type QuoteInsert = {
  id?: string;
  reference: string;
  venue_type?: QuoteVenueType | null;
  surface?: string | null;
  rooms?: string | null;
  collections?: string[];
  company?: string | null;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  status?: QuoteStatus;
  created_at?: string;
  updated_at?: string;
};

export type QuoteUpdate = Partial<QuoteInsert>;

// ============================================
// TABLE : projects (portfolio)
// ============================================

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  location: string | null;
  year: string | null;
  surface: string | null;
  description: string | null;
  image: string | null;
  gallery: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectInsert = {
  id?: string;
  slug: string;
  title: string;
  category?: string | null;
  location?: string | null;
  year?: string | null;
  surface?: string | null;
  description?: string | null;
  image?: string | null;
  gallery?: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProjectUpdate = Partial<ProjectInsert>;

// ============================================
// TABLE : resources (produits digitaux)
// ============================================

export type ResourceRow = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  price: string;
  description: string | null;
  format: string | null;
  badge: string | null;
  image: string | null;
  file_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ResourceInsert = {
  id?: string;
  slug: string;
  title: string;
  category?: string | null;
  price: string;
  description?: string | null;
  format?: string | null;
  badge?: string | null;
  image?: string | null;
  file_url?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type ResourceUpdate = Partial<ResourceInsert>;

// ============================================
// TABLE : settings (clé-valeur)
// ============================================

export type SettingRow = {
  key: string;
  value: Json | null;
  updated_at: string;
};

export type SettingInsert = {
  key: string;
  value?: Json | null;
  updated_at?: string;
};

export type SettingUpdate = Partial<SettingInsert>;

// ============================================
// DATABASE — format attendu par Supabase v2
// ============================================

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: ProductUpdate;
        Relationships: [];
      };
      categories: {
        Row: CategoryRow;
        Insert: CategoryInsert;
        Update: CategoryUpdate;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: OrderUpdate;
        Relationships: [];
      };
      quotes: {
        Row: QuoteRow;
        Insert: QuoteInsert;
        Update: QuoteUpdate;
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
        Relationships: [];
      };
      resources: {
        Row: ResourceRow;
        Insert: ResourceInsert;
        Update: ResourceUpdate;
        Relationships: [];
      };
      settings: {
        Row: SettingRow;
        Insert: SettingInsert;
        Update: SettingUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};