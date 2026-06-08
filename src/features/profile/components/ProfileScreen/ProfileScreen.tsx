import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Typography, Card, colors, spacing } from '#shared';
import { useProfile } from '../../useProfile';

export default function ProfileScreen() {
  const { profile, isLoading, updateProfilePicture } = useProfile();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size='large'
          color={colors.brand}
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
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xxxl * 1.5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  card: {
    padding: spacing.lg,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
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
    color: colors.textMuted,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontWeight: '600',
    color: colors.textMuted,
  },
  goalText: {
    flex: 1,
    textAlign: 'right',
    marginLeft: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  emptyText: {
    color: colors.textMuted,
  },
});
