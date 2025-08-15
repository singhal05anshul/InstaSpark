import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: Import components when dependencies are installed
// import { SwipeCard } from '../components/SwipeCard';
// import { VenueSelector } from '../components/VenueSelector';
// import { QuickOfferModal } from '../components/QuickOfferModal';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentVenue, setCurrentVenue] = useState(null);
  const [discoveredUsers, setDiscoveredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize location and fetch nearby venues
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      // TODO: Implement geolocation
      setLoading(false);
    } catch (error) {
      Alert.alert('Location Error', 'Unable to get your location');
      setLoading(false);
    }
  };

  const handleSwipe = (userId: string, isLike: boolean) => {
    // TODO: Implement swipe logic
    console.log(`Swiped ${isLike ? 'right' : 'left'} on user ${userId}`);
  };

  const handleQuickOffer = (userId: string, offerType: string) => {
    // TODO: Implement quick offer logic
    console.log(`Sent ${offerType} offer to user ${userId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6b6b" />
          <Text style={styles.loadingText}>Finding people near you...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        {/* TODO: Add VenueSelector component */}
        <Text style={styles.venueText}>
          {currentVenue ? currentVenue.name : 'Select a venue'}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {discoveredUsers.length > 0 ? (
          <Text style={styles.placeholder}>Swipe cards will appear here</Text>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No one around yet</Text>
            <Text style={styles.emptySubtitle}>
              Check in to a venue to start discovering people
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  venueText: {
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});