// app/(tabs)/profile.tsx
import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Typography, Card } from '../../src/shared';
import { useProfile } from '../../src/shared/profile/useProfile';

export default function ProfileScreen() {
  const { profile, isLoading, updateProfilePicture } = useProfile();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size='large'
          color='#0f172a'
        />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Typography
          variant='body'
          style={styles.emptyText}
        >
          No profile found. Please complete onboarding.
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Typography
        variant='title'
        style={styles.title}
      >
        My Profile
      </Typography>

      <Card style={styles.card}>
        {/* Progress Photo / Avatar Section */}
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={updateProfilePicture}
            style={styles.imageWrapper}
          >
            {profile.photoUri ? (
              <Image
                source={{ uri: profile.photoUri }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Typography style={styles.placeholderText}>
                  Add Photo
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Typography style={styles.label}>Gender</Typography>
          <Typography>{profile.gender}</Typography>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Typography style={styles.label}>Age</Typography>
          <Typography>{profile.age}</Typography>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Typography style={styles.label}>Height</Typography>
          <Typography>{profile.height} cm</Typography>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Typography style={styles.label}>Weight</Typography>
          <Typography>{profile.weight} kg</Typography>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Typography style={styles.label}>Goal</Typography>
          <Typography
            style={styles.goalText}
            numberOfLines={2}
          >
            {profile.goal}
          </Typography>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    paddingTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    padding: 20,
  },
  // New styles for the image
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontWeight: '600',
    color: '#64748b',
  },
  goalText: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
  emptyText: {
    color: '#64748b',
  },
});
