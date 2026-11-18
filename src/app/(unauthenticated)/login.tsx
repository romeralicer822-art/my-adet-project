import Button from '@/src/components/button'
import Input from '@/src/components/input'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Demo login: continue to the Home tab with any input, including blank fields.
  const onLogin = () => router.replace('/home')

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps='handled'
          className='px-6'
        >
          <View className='items-center mb-10'>
            
            <Text className='text-3xl font-extrabold text-gray-900'>Welcome to SnapJourney</Text>
            
          </View>

          <View className='gap-4'>
            <Input
              label='Email'
              placeholder='Enter your Email'
              keyboardType='email-address'
              autoComplete='email'
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label='Password'
              
              placeholder='Enter your password'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button label='Login' onPress={onLogin} className='mt-2' />
          </View>

          <View className='flex-row justify-center mt-8'>
            <Text className='text-gray-500'>Don't have an account? </Text>
            <Link href='/register' className='text-indigo-600 font-bold'>
              Register
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
