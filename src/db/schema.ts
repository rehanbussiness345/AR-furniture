import {
  boolean,
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'bed' | 'sofa'
  subcategory: text("subcategory").notNull(), // 'King Size Beds', 'L-Shaped Sofas', ...
  price: integer("price").notNull(), // INR
  comparePrice: integer("compare_price").notNull(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(), // multi-paragraph, \n\n separated
  details: jsonb("details").$type<string[]>().notNull(), // bullet specs
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  colors: jsonb("colors").$type<string[]>().notNull(),
  material: text("material").notNull(),
  dimensions: text("dimensions").notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  stock: integer("stock").notNull().default(10),
  rating: real("rating").notNull().default(4.7),
  reviews: integer("reviews").notNull().default(24),
  bestseller: boolean("bestseller").notNull().default(false),
  newArrival: boolean("new_arrival").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
});

export type ProductRow = typeof products.$inferSelect;
