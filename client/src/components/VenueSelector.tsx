import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Venue } from '../shared/schema';
import { COLORS, FONT_SIZES, SPACING } from '../lib/constants';

interface VenueSelectorProps {
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
}

export function VenueSelector({ selectedVenue, onVenueSelect }: VenueSelectorProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      fetchVenues();
    }
  }, [isModalVisible]);

  const fetchVenues = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call to fetch nearby venues
      // For now, mock some venues
      const mockVenues: Venue[] = [
        {
          id: '1',
          name: 'Sunset Rooftop Bar',
          type: 'bar',
          address: '123 Main St',
          latitude: '40.7128',
          longitude: '-74.0060',
          activeUsersCount: 12,
        },
        {
          id: '2',
          name: 'The Coffee Corner',
          type: 'cafe',
          address: '456 Oak Ave',
          latitude: '40.7130',
          longitude: '-74.0065',
          activeUsersCount: 8,
        },
      ];
      setVenues(mockVenues);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venue: Venue) => {
    onVenueSelect(venue);
    setIsModalVisible(false);
  };

  const renderVenue = ({ item }: { item: Venue }) => (
    <TouchableOpacity
      style={styles.venueItem}
      onPress={() => handleVenueSelect(item)}
    >
      <View style={styles.venueInfo}>
        <Text style={styles.venueName}>{item.name}</Text>
        <Text style={styles.venueAddress}>{item.address}</Text>
        <Text style={styles.venueType}>{item.type}</Text>
      </View>
      <View style={styles.venueStats}>
        <Text style={styles.activeUsers}>{item.activeUsersCount}</Text>
        <Text style={styles.activeUsersLabel}>active</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedVenue ? selectedVenue.name : 'Select a venue'}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Venue</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Finding nearby venues...</Text>
            </View>
          ) : (
            <FlatList
              data={venues}
              renderItem={renderVenue}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.venuesList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 8,
    marginTop: SPACING.sm,
  },
  selectorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  chevron: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textMuted,
    transform: [{ rotate: '90deg' }],
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginTop: SPACING.xl,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  closeButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  venuesList: {
    paddingVertical: SPACING.sm,
  },
  venueItem: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  venueAddress: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  venueType: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    textTransform: 'capitalize',
  },
  venueStats: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: SPACING.md,
  },
  activeUsers: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  activeUsersLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },
});