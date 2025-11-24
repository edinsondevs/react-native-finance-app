// import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const IngresosLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name='index'
            options={{
                title:'Ingresos'
            }}
        />
    </Stack>
  )
}

export default IngresosLayout