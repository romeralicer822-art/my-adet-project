import Button from '@/src/components/button'
import { currentUser } from '@/src/data/user'
import { router } from 'expo-router'
import { Briefcase, Cake, CalendarDays, Mail, MapPin, Phone } from 'lucide-react-native'
import type { LucideIcon } from 'lucide-react-native'
import { Alert, Image, ScrollView, Text, View } from 'react-native'

const details: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Mail, label: 'Email', value: currentUser.email },
  { icon: Phone, label: 'Phone', value: currentUser.phone },
  { icon: MapPin, label: 'Location', value: currentUser.location },
  { icon: Cake, label: 'Birthday', value: currentUser.birthday },
  { icon: Briefcase, label: 'Work', value: currentUser.work },
  { icon: CalendarDays, label: 'Joined', value: currentUser.joined },
]

export default function Profile() {
  return (
    <ScrollView className='flex-1 bg-white px-6' showsVerticalScrollIndicator={false}>
      <Text className='text-2xl font-extrabold text-gray-900 mt-6 mb-6'>Profile</Text>

      <View className='items-center'>
        <Image
          source={currentUser.avatar}
          style={{ width: 128, height: 128, borderRadius: 64 }}
        />
        <Text className='text-2xl font-extrabold text-gray-900 mt-4'>{currentUser.name}</Text>
        <Text className='text-base text-gray-500'>@{currentUser.username}</Text>
      </View>

      <View className='mt-7'>
        <Text className='text-lg font-bold text-gray-900 mb-2'>Details</Text>
        {details.map(({ icon: Icon, label, value }) => (
          <View key={label} className='flex-row items-center py-3 border-b border-gray-100'>
            <View className='h-10 w-10 rounded-full bg-indigo-50 items-center justify-center'>
              <Icon size={20} color='#4f46e5' />
            </View>
            <View className='ml-3 flex-1'>
              <Text className='text-xs text-gray-500'>{label}</Text>
              <Text className='text-base text-gray-900'>{value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <Button label='Edit Profile' onPress={() => Alert.alert('Edit Profile', 'Profile editing is coming soon.')} />
      </View>
      <View className='mt-3 mb-10'>
        <Button label='Logout' variant='outline' onPress={() => router.replace('/login')} />
      </View>
    </ScrollView>
  )
}
