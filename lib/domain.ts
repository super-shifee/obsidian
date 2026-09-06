export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN'
export type ProductStatus = 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'ARCHIVED'

export type Product = { id: string; slug: string; name: string; origin: string; grade: string; quantity: number; unit: 'MT' | 'KG'; sellerId: string; status: ProductStatus; verified: boolean; imageUrl?: string }
export type QuotationRequest = { productId: string; quantity: number; destination: string; message?: string }

export type Repository<T> = { list: (query?: string) => Promise<T[]>; get: (id: string) => Promise<T | null> }

export const demoProducts: Product[] = [
  { id: 'p-001', slug: 'premium-ilmenite-sand', name: 'Premium Ilmenite Sand', origin: 'Mozambique', grade: 'TiO₂ 54%+', quantity: 2500, unit: 'MT', sellerId: 'seller-001', status: 'APPROVED', verified: true, imageUrl: '/mineral-hero.png' },
  { id: 'p-002', slug: 'high-grade-graphite', name: 'High-Grade Graphite', origin: 'Madagascar', grade: 'TGC 96%+', quantity: 800, unit: 'MT', sellerId: 'seller-002', status: 'APPROVED', verified: true, imageUrl: '/mineral-hero.png' },
]

export const demoProductRepository: Repository<Product> = { list: async (query = '') => demoProducts.filter((product) => `${product.name} ${product.origin} ${product.grade}`.toLowerCase().includes(query.toLowerCase())), get: async (id) => demoProducts.find((product) => product.id === id) ?? null }
