import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface BtnProps extends TouchableOpacityProps {
    label: string
    variant?: 'primary' | 'outline'
    loading?: boolean
}

export default function Button({ label, variant = 'primary', loading, disabled, className, ...props }: BtnProps) {
  const isPrimary = variant === 'primary'
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      className={`h-14 rounded-2xl flex-row items-center justify-center ${
        isPrimary ? 'bg-indigo-600' : 'bg-white border border-indigo-600'
      } ${disabled || loading ? 'opacity-60' : ''} ${className ?? ''}`}
      {...props}
    >
        {loading ? (
          <ActivityIndicator color={isPrimary ? '#fff' : '#4f46e5'} />
        ) : (
          <Text className={`text-base font-bold ${isPrimary ? 'text-white' : 'text-indigo-600'}`}>{label}</Text>
        )}
    </TouchableOpacity>
  )
}
