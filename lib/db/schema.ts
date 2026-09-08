import { pgTable, text, timestamp, uuid, numeric, jsonb, index } from 'drizzle-orm/pg-core'

// Better Auth tables
export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified'),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
})

export const accounts = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const verifications = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

// Marketplace tables
export const products = pgTable(
  'marketplace_products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    category: text('category').notNull().default('Black Sand'),
    description: text('description').notNull(),
    quantity: numeric('quantity', { precision: 14, scale: 2 }).notNull().default('0'),
    unit: text('unit').notNull().default('MT'),
    price: numeric('price', { precision: 14, scale: 2 }).notNull().default('0'),
    currency: text('currency').notNull().default('USD'),
    mineralContent: text('mineral_content').notNull(),
    grade: text('grade').notNull(),
    country: text('country').notNull(),
    region: text('region').notNull(),
    availability: text('availability').notNull().default('available'),
    sellerName: text('seller_name').notNull(),
    sellerCompany: text('seller_company').notNull(),
    imageUrls: jsonb('image_urls').notNull().default('[]'),
    documentUrls: jsonb('document_urls').notNull().default('[]'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [index('marketplace_products_availability_idx').on(table.availability)],
)

export const requests = pgTable(
  'marketplace_requests',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').notNull(),
    buyerUserId: text('buyer_user_id').notNull(),
    buyerName: text('buyer_name').notNull(),
    companyName: text('company_name'),
    email: text('email').notNull(),
    phone: text('phone'),
    country: text('country'),
    requestType: text('request_type').notNull().default('quote'),
    requestedQuantity: numeric('requested_quantity', { precision: 14, scale: 2 }).notNull(),
    message: text('message'),
    status: text('status').notNull().default('pending'),
    sellerResponse: text('seller_response'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('marketplace_requests_buyer_idx').on(table.buyerUserId),
    index('marketplace_requests_product_idx').on(table.productId),
  ],
)

export const favorites = pgTable(
  'marketplace_favorites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').notNull(),
    buyerUserId: text('buyer_user_id').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [index('marketplace_favorites_unique').on(table.productId, table.buyerUserId)],
)
