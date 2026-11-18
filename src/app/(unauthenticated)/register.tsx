import Button from '@/src/components/button'
import Input from '@/src/components/input'
import { Link, router } from 'expo-router'
import { Lock, Mail, User, UserPlus } from 'lucide-react-native'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Errors = { name?: string; email?: string; password?: string; confirm?: string }

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  const onRegister = () => {
    const next: Errors = {}
    if (!name.trim()) next.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address'
    if (password.length < 6) next.password = 'Password must be at least 6 characters'
    if (confirm !== password) next.confirm = 'Passwords do not match'
    setErrors(next)
    if (Object.keys(next).length === 0) router.replace('/login')
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 24 }}
          keyboardShouldPersistTaps='handled'
          className='px-6'
        >
          <View className='items-center mb-8'>
            <View className='h-20 w-20 rounded-3xl bg-indigo-600 items-center justify-center mb-5'>
              <UserPlus size={38} color='#fff' />
            </View>
            <Text className='text-3xl font-extrabold text-gray-900'>Create account</Text>
            <Text className='text-base text-gray-500 mt-1'>Join the community in a few seconds</Text>
          </View>

          <View className='gap-4'>
            <Input
              label='Name'
              icon={User}
              placeholder='Your full name'
              autoCapitalize='words'
              value={name}
              onChangeText={setName}
              error={errors.name}
            />
            <Input
              label='Email'
              icon={Mail}
              placeholder='you@example.com'
              keyboardType='email-address'
              autoComplete='email'
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <Input
              label='Password'
              icon={Lock}
              placeholder='At least 6 characters'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />
            <Input
              label='Confirm Password'
              icon={Lock}
              placeholder='Re-enter your password'
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
              error={errors.confirm}
            />
            <Button label='Register' onPress={onRegister} className='mt-2' />
          </View>

          <View className='flex-row justify-center mt-8'>
            <Text className='text-gray-500'>Already have an account? </Text>
            <Link href='/login' className='text-indigo-600 font-bold'>
              Login
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
