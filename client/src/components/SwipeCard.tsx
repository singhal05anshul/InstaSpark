import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { User } from '../shared/schema';
import { COLORS, FONT_SIZES, SPACING } from '../lib/constants';

interface SwipeCardProps {
  user: User;
  onSwipe: (userId: string, isLike: boolean) => void;
  onQuickOffer: (userId: string) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 1.2;

export function SwipeCard({ user, onSwipe, onQuickOffer }: SwipeCardProps) {
  const handleLike = () => onSwipe(user.id, true);
  const handlePass = () => onSwipe(user.id, false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: user.photos[0] || 'https://via.placeholder.com/300' }}
          style={styles.photo}
          resizeMode="cover"
        />
        
        <View style={styles.overlay}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>
              {user.name}, {user.age}
            </Text>
            {user.bio && (
              <Text style={styles.bio} numberOfLines={2}>
                {user.bio}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.passButton} onPress={handlePass}>
          <Text style={styles.passButtonText}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickOfferButton}
          onPress={() => onQuickOffer(user.id)}
        >
          <Text style={styles.quickOfferButtonText}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Text style={styles.likeButtonText}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
    padding: SPACING.md,
  },
  userInfo: {
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: SPACING.xs,
  },
  bio: {
    fontSize: FONT_SIZES.md,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    width: '100%',
  },
  passButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passButtonText: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  quickOfferButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickOfferButtonText: {
    fontSize: 20,
  },
  likeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  likeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});