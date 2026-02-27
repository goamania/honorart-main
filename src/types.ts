export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Coasters' | 'Magnets' | 'Trivets';
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}
