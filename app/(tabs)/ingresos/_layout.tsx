// import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const IngresosLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name='index'
            options={{
                title:'Historial de Ingresos'
            }}
        />
        <Stack.Screen name='AgregarIngresos'
            options={{
                title:'Añadir Ingreso'
            }}
        />
    </Stack>
  )
}

export default IngresosLayout