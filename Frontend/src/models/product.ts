
export interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  author: string
  quantityInStock: number
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  categories: string[];
  authors: string[];
  pageNumber: number;
  pageSize: number;
}
