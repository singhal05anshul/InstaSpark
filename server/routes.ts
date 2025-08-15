import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertSwipeSchema, 
  insertMessageSchema, 
  insertQuickOfferSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  app.patch("/api/users/:id/venue", async (req, res) => {
    const { venueId } = req.body;
    const user = await storage.updateUser(req.params.id, { 
      currentVenueId: venueId,
      lastSeen: new Date(),
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Update venue active count
    const usersAtVenue = await storage.getUsersAtVenue(venueId);
    await storage.updateVenueActiveCount(venueId, usersAtVenue.length);
    
    res.json(user);
  });

  // Venue routes
  app.get("/api/venues", async (req, res) => {
    const { lat = "40.7128", lng = "-74.0060" } = req.query;
    const venues = await storage.getNearbyVenues(
      parseFloat(lat as string), 
      parseFloat(lng as string)
    );
    res.json(venues);
  });

  app.get("/api/venues/:id", async (req, res) => {
    const venue = await storage.getVenue(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json(venue);
  });

  // Discovery routes
  app.get("/api/users/:userId/discover/:venueId", async (req, res) => {
    const { userId, venueId } = req.params;
    const potentialMatches = await storage.getUsersAtVenue(venueId, userId);
    res.json(potentialMatches);
  });

  // Swipe routes
  app.post("/api/swipes", async (req, res) => {
    try {
      const swipeData = insertSwipeSchema.parse(req.body);
      const swipe = await storage.createSwipe(swipeData);
      
      // Check if there's a mutual like
      if (swipeData.isLike) {
        const reciprocalSwipe = await storage.getSwipe(swipeData.swipedId, swipeData.swiperId);
        if (reciprocalSwipe && reciprocalSwipe.isLike) {
          // Create a match
          const match = await storage.createMatch({
            user1Id: swipeData.swiperId,
            user2Id: swipeData.swipedId,
            venueId: swipeData.venueId,
          });
          res.json({ swipe, match });
          return;
        }
      }
      
      res.json({ swipe });
    } catch (error) {
      res.status(400).json({ message: "Invalid swipe data" });
    }
  });

  // Match routes
  app.get("/api/users/:userId/matches", async (req, res) => {
    const matches = await storage.getUserMatches(req.params.userId);
    res.json(matches);
  });

  // Message routes
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  app.get("/api/matches/:matchId/messages", async (req, res) => {
    const messages = await storage.getMatchMessages(req.params.matchId);
    res.json(messages);
  });

  // Quick offer routes
  app.post("/api/quick-offers", async (req, res) => {
    try {
      const offerData = insertQuickOfferSchema.parse(req.body);
      const offer = await storage.createQuickOffer(offerData);
      res.json(offer);
    } catch (error) {
      res.status(400).json({ message: "Invalid offer data" });
    }
  });

  app.get("/api/users/:userId/quick-offers", async (req, res) => {
    const offers = await storage.getQuickOffersForUser(req.params.userId);
    res.json(offers);
  });

  app.patch("/api/quick-offers/:id", async (req, res) => {
    const { status } = req.body;
    const offer = await storage.updateQuickOfferStatus(req.params.id, status);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offer);
  });

  const httpServer = createServer(app);
  return httpServer;
}
