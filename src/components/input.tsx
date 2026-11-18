import type { LucideIcon } from 'lucide-react-native'
import { Eye, EyeOff } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
    label: string
    icon?: LucideIcon
    error?: string
}

export default function Input({ label, icon: Icon, error, secureTextEntry, ...props }: InputProps) {
    const [focused, setFocused] = useState(false)
    const [hidden, setHidden] = useState(true)
    const isPassword = !!secureTextEntry

    return (
        <View className='gap-1.5'>
            <Text className='text-sm font-semibold text-gray-700'>{label}</Text>
            <View
                className={`h-14 flex-row items-center rounded-2xl border px-4 bg-gray-50 ${
                    error ? 'border-red-500' : focused ? 'border-indigo-600 bg-white' : 'border-gray-200'
                }`}
            >
                {Icon && <Icon size={20} color={focused ? '#4f46e5' : '#9ca3af'} />}
                <TextInput
                    className={`flex-1 h-full text-base text-gray-900 ${Icon ? 'ml-3' : ''}`}
                    placeholderTextColor='#9ca3af'
                    autoCapitalize='none'
                    secureTextEntry={isPassword && hidden}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
                {isPassword && (
                    <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
                        {hidden ? <Eye size={20} color='#9ca3af' /> : <EyeOff size={20} color='#9ca3af' />}
                    </Pressable>
                )}
            </View>
            {!!error && <Text className='text-xs text-red-500'>{error}</Text>}
        </View>
    )
}
