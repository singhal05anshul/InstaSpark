import { z } from "zod";

// User schemas and types
export const insertUserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(18).max(100),
  bio: z.string().optional(),
  photos: z.array(z.string()).default([]),
  currentVenueId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const userSchema = insertUserSchema.extend({
  id: z.string(),
  lastSeen: z.string().optional(),
  createdAt: z.string().optional(),
});

// Venue schemas and types
export const insertVenueSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  address: z.string().min(1),
  latitude: z.string(),
  longitude: z.string(),
});

export const venueSchema = insertVenueSchema.extend({
  id: z.string(),
  activeUsersCount: z.number().default(0),
});

// Match schemas and types
export const insertMatchSchema = z.object({
  user1Id: z.string(),
  user2Id: z.string(),
  venueId: z.string(),
  isActive: z.boolean().default(true),
});

export const matchSchema = insertMatchSchema.extend({
  id: z.string(),
  matchedAt: z.string(),
});

// Swipe schemas and types
export const insertSwipeSchema = z.object({
  swiperId: z.string(),
  swipedId: z.string(),
  venueId: z.string(),
  isLike: z.boolean(),
});

export const swipeSchema = insertSwipeSchema.extend({
  id: z.string(),
  swipedAt: z.string(),
});

// Message schemas and types
export const insertMessageSchema = z.object({
  matchId: z.string(),
  senderId: z.string(),
  content: z.string().min(1),
});

export const messageSchema = insertMessageSchema.extend({
  id: z.string(),
  sentAt: z.string(),
});

// Quick Offer schemas and types
export const insertQuickOfferSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  venueId: z.string(),
  offerType: z.enum(["drink", "join", "coffee"]),
  message: z.string().min(1),
  status: z.enum(["pending", "accepted", "declined"]).default("pending"),
});

export const quickOfferSchema = insertQuickOfferSchema.extend({
  id: z.string(),
  sentAt: z.string(),
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = z.infer<typeof matchSchema>;
export type InsertSwipe = z.infer<typeof insertSwipeSchema>;
export type Swipe = z.infer<typeof swipeSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = z.infer<typeof messageSchema>;
export type InsertQuickOffer = z.infer<typeof insertQuickOfferSchema>;
export type QuickOffer = z.infer<typeof quickOfferSchema>;