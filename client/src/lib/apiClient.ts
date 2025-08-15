import { QueryClient } from '@tanstack/react-query';

// Configuration - automatically detect if running on web or mobile
const getApiBaseUrl = () => {
  // Check if running in React Native Web (browser)
  if (typeof window !== 'undefined') {
    return 'http://localhost:5000/api'; // Web development
  }
  // React Native mobile
  return 'http://localhost:5000/api'; // TODO: Update for production/device testing
};

const API_BASE_URL = getApiBaseUrl();

// Default fetch function for React Query
const defaultQueryFn = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
  const url = `${API_BASE_URL}${queryKey[0]}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Create Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// API request function for mutations
export const apiRequest = async (
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
  } = {}
) => {
  const { method = 'GET', body, headers = {} } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Specific API functions
export const venueApi = {
  getAll: () => queryClient.fetchQuery({ queryKey: ['/venues'] }),
  getById: (id: string) => queryClient.fetchQuery({ queryKey: [`/venues/${id}`] }),
};

export const userApi = {
  discover: (userId: string, venueId: string) =>
    queryClient.fetchQuery({ queryKey: [`/users/${userId}/discover/${venueId}`] }),
  updateVenue: (userId: string, venueId: string) =>
    apiRequest(`/users/${userId}/venue`, {
      method: 'PATCH',
      body: { venueId },
    }),
};

export const matchApi = {
  getByUser: (userId: string) =>
    queryClient.fetchQuery({ queryKey: [`/users/${userId}/matches`] }),
};

export const messageApi = {
  getByMatch: (matchId: string) =>
    queryClient.fetchQuery({ queryKey: [`/matches/${matchId}/messages`] }),
  send: (matchId: string, content: string, senderId: string) =>
    apiRequest(`/matches/${matchId}/messages`, {
      method: 'POST',
      body: { content, senderId },
    }),
};

export const swipeApi = {
  create: (swiperId: string, swipedId: string, venueId: string, isLike: boolean) =>
    apiRequest('/swipes', {
      method: 'POST',
      body: { swiperId, swipedId, venueId, isLike },
    }),
};

export const quickOfferApi = {
  send: (senderId: string, receiverId: string, venueId: string, offerType: string, message: string) =>
    apiRequest('/quick-offers', {
      method: 'POST',
      body: { senderId, receiverId, venueId, offerType, message },
    }),
};