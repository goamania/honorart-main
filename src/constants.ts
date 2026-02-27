import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'coasters',
    name: 'Coasters',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    description: 'Protect your surfaces with elegance. Hand-painted ceramic and natural stone.'
  },
  {
    id: 'magnets',
    name: 'Magnets',
    image: 'https://images.unsplash.com/photo-1590424753858-394a12a5ec2c?auto=format&fit=crop&q=80&w=800',
    description: 'Small pieces of art for your most-visited space. Strong, beautiful, and functional.'
  },
  {
    id: 'trivets',
    name: 'Trivets',
    image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=800',
    description: 'Heat-resistant mats that double as wall art. For teapots, pans, and style.'
  }
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ethereal Marble Coaster Set',
    price: 45,
    category: 'Coasters',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600',
    description: 'A set of four hand-polished marble coasters with gold-leaf edges.'
  },
  {
    id: '2',
    name: 'Sage Botanical Magnet',
    price: 12,
    category: 'Magnets',
    image: 'https://images.unsplash.com/photo-1590424753858-394a12a5ec2c?auto=format&fit=crop&q=80&w=600',
    description: 'Pressed wild sage encased in crystal-clear resin.'
  },
  {
    id: '3',
    name: 'Terracotta Geometric Trivet',
    price: 38,
    category: 'Trivets',
    image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=600',
    description: 'Architectural ceramic trivet inspired by Mediterranean landscapes.'
  },
  {
    id: '4',
    name: 'Midnight Indigo Coasters',
    price: 42,
    category: 'Coasters',
    image: 'https://images.unsplash.com/photo-1517254456976-ee8682099819?auto=format&fit=crop&q=80&w=600',
    description: 'Deep blue hues meeting natural cork backing.'
  }
];
