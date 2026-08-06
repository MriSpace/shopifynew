export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[];
  category?: string;
  brand?: string;
  [key: string]: any; // For additional properties
}

export interface ProductsResponse {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}
