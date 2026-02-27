// src/types.ts dosyanız şu şekilde görünmeli:
export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  path: string; // BU SATIRI EKLEYİN
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}