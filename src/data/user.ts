import type { ImageSourcePropType } from 'react-native'

// Logged-in user. Replace the placeholder details with real ones.
export const currentUser = {
  name: 'Romer Alicer',
  username: 'romeralicer',
  avatar: require('@/assets/images/profile.jpg') as ImageSourcePropType,
  bio: 'Mobile app developer in the making. Coffee, code, and good vibes. ☕💻',
  email: 'romer.alicer@example.com',
  phone: '+63 900 000 0000',
  location: 'Philippines',
  birthday: 'January 1, 2000',
  work: 'Student / Developer',
  joined: 'November 2026',
  stats: { posts: 12, followers: 248, following: 180 },
}
