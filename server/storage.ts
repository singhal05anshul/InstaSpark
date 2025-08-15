import { 
  type User, type InsertUser,
  type Venue, type InsertVenue,
  type Match, type InsertMatch,
  type Swipe, type InsertSwipe,
  type Message, type InsertMessage,
  type QuickOffer, type InsertQuickOffer
} from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  getUsersAtVenue(venueId: string, excludeUserId?: string): Promise<User[]>;
  
  // Venue operations
  getVenue(id: string): Promise<Venue | undefined>;
  createVenue(venue: InsertVenue): Promise<Venue>;
  getNearbyVenues(lat: number, lng: number): Promise<Venue[]>;
  updateVenueActiveCount(venueId: string, count: number): Promise<void>;
  
  // Match operations
  getMatch(id: string): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  getUserMatches(userId: string): Promise<Match[]>;
  checkExistingMatch(user1Id: string, user2Id: string): Promise<Match | undefined>;
  
  // Swipe operations
  createSwipe(swipe: InsertSwipe): Promise<Swipe>;
  getSwipe(swiperId: string, swipedId: string): Promise<Swipe | undefined>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMatchMessages(matchId: string): Promise<Message[]>;
  
  // Quick offer operations
  createQuickOffer(offer: InsertQuickOffer): Promise<QuickOffer>;
  getQuickOffersForUser(userId: string): Promise<QuickOffer[]>;
  updateQuickOfferStatus(id: string, status: string): Promise<QuickOffer | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private venues: Map<string, Venue> = new Map();
  private matches: Map<string, Match> = new Map();
  private swipes: Map<string, Swipe> = new Map();
  private messages: Map<string, Message> = new Map();
  private quickOffers: Map<string, QuickOffer> = new Map();

  constructor() {
    this.initializeVenues();
  }

  private initializeVenues() {
    const defaultVenues: InsertVenue[] = [
      {
        name: "The Beer Garden",
        type: "brewery",
        address: "123 Main St",
        latitude: "40.7128",
        longitude: "-74.0060",
      },
      {
        name: "Central Perk Cafe",
        type: "coffee_shop",
        address: "456 Park Ave",
        latitude: "40.7130",
        longitude: "-74.0058",
      },
      {
        name: "Sunset Rooftop Bar",
        type: "bar",
        address: "789 High St",
        latitude: "40.7125",
        longitude: "-74.0062",
      },
    ];

    defaultVenues.forEach(venue => {
      this.createVenue(venue);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      bio: insertUser.bio ?? null,
      photos: insertUser.photos ?? [],
      currentVenueId: insertUser.currentVenueId ?? null,
      isActive: insertUser.isActive ?? true,
      lastSeen: new Date(),
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUsersAtVenue(venueId: string, excludeUserId?: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      user => user.currentVenueId === venueId && 
              user.isActive && 
              user.id !== excludeUserId
    );
  }

  async getVenue(id: string): Promise<Venue | undefined> {
    return this.venues.get(id);
  }

  async createVenue(insertVenue: InsertVenue): Promise<Venue> {
    const id = randomUUID();
    const venue: Venue = { 
      ...insertVenue, 
      id,
      activeUsersCount: 0,
    };
    this.venues.set(id, venue);
    return venue;
  }

  async getNearbyVenues(lat: number, lng: number): Promise<Venue[]> {
    // Simple distance calculation - in production would use proper geospatial queries
    return Array.from(this.venues.values()).sort(() => Math.random() - 0.5);
  }

  async updateVenueActiveCount(venueId: string, count: number): Promise<void> {
    const venue = this.venues.get(venueId);
    if (venue) {
      venue.activeUsersCount = count;
      this.venues.set(venueId, venue);
    }
  }

  async getMatch(id: string): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = { 
      ...insertMatch, 
      id,
      isActive: insertMatch.isActive ?? true,
      matchedAt: new Date(),
    };
    this.matches.set(id, match);
    return match;
  }

  async getUserMatches(userId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      match => (match.user1Id === userId || match.user2Id === userId) && match.isActive
    );
  }

  async checkExistingMatch(user1Id: string, user2Id: string): Promise<Match | undefined> {
    return Array.from(this.matches.values()).find(
      match => (match.user1Id === user1Id && match.user2Id === user2Id) ||
               (match.user1Id === user2Id && match.user2Id === user1Id)
    );
  }

  async createSwipe(insertSwipe: InsertSwipe): Promise<Swipe> {
    const id = randomUUID();
    const swipe: Swipe = { 
      ...insertSwipe, 
      id,
      swipedAt: new Date(),
    };
    this.swipes.set(id, swipe);
    return swipe;
  }

  async getSwipe(swiperId: string, swipedId: string): Promise<Swipe | undefined> {
    return Array.from(this.swipes.values()).find(
      swipe => swipe.swiperId === swiperId && swipe.swipedId === swipedId
    );
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { 
      ...insertMessage, 
      id,
      sentAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getMatchMessages(matchId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.matchId === matchId)
      .sort((a, b) => a.sentAt!.getTime() - b.sentAt!.getTime());
  }

  async createQuickOffer(insertOffer: InsertQuickOffer): Promise<QuickOffer> {
    const id = randomUUID();
    const offer: QuickOffer = { 
      ...insertOffer, 
      id,
      status: insertOffer.status ?? "pending",
      sentAt: new Date(),
    };
    this.quickOffers.set(id, offer);
    return offer;
  }

  async getQuickOffersForUser(userId: string): Promise<QuickOffer[]> {
    return Array.from(this.quickOffers.values()).filter(
      offer => offer.receiverId === userId && offer.status === "pending"
    );
  }

  async updateQuickOfferStatus(id: string, status: string): Promise<QuickOffer | undefined> {
    const offer = this.quickOffers.get(id);
    if (!offer) return undefined;
    
    offer.status = status;
    this.quickOffers.set(id, offer);
    return offer;
  }
}

export const storage = new MemStorage();
