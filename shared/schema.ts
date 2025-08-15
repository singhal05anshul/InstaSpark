import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  bio: text("bio"),
  photos: text("photos").array().notNull().default(sql`'{}'::text[]`),
  currentVenueId: varchar("current_venue_id"),
  isActive: boolean("is_active").default(true),
  lastSeen: timestamp("last_seen").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const venues = pgTable("venues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // "bar", "restaurant", "cafe", "pub", etc.
  address: text("address").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  activeUsersCount: integer("active_users_count").default(0),
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  user1Id: varchar("user1_id").notNull(),
  user2Id: varchar("user2_id").notNull(),
  venueId: varchar("venue_id").notNull(),
  matchedAt: timestamp("matched_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const swipes = pgTable("swipes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  swiperId: varchar("swiper_id").notNull(),
  swipedId: varchar("swiped_id").notNull(),
  venueId: varchar("venue_id").notNull(),
  isLike: boolean("is_like").notNull(),
  swipedAt: timestamp("swiped_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  matchId: varchar("match_id").notNull(),
  senderId: varchar("sender_id").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const quickOffers = pgTable("quick_offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull(),
  receiverId: varchar("receiver_id").notNull(),
  venueId: varchar("venue_id").notNull(),
  offerType: text("offer_type").notNull(), // "drink", "join", "coffee"
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"), // "pending", "accepted", "declined"
  sentAt: timestamp("sent_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  lastSeen: true,
  createdAt: true,
});

export const insertVenueSchema = createInsertSchema(venues).omit({
  id: true,
  activeUsersCount: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  matchedAt: true,
});

export const insertSwipeSchema = createInsertSchema(swipes).omit({
  id: true,
  swipedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  sentAt: true,
});

export const insertQuickOfferSchema = createInsertSchema(quickOffers).omit({
  id: true,
  sentAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertSwipe = z.infer<typeof insertSwipeSchema>;
export type Swipe = typeof swipes.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertQuickOffer = z.infer<typeof insertQuickOfferSchema>;
export type QuickOffer = typeof quickOffers.$inferSelect;
