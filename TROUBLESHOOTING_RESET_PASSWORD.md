# Solución al Error "Unmatched Route" - Reset Password

## 🔴 Error Actual

```
Unmatched Route
Page could not be found.
finanzas-app://login/updatePassword
```

## ✅ Soluciones Paso a Paso

### Paso 1: Configurar Correctamente Supabase Site URL

Ve a tu Dashboard de Supabase → Authentication → URL Configuration:

**CAMBIA el Site URL de:**

```
❌ http://localhost:8081
```

**A uno de estos (en orden de prioridad):**

#### Opción 1 (Recomendada para Producción):

```
✅ finanzas-app://
```

#### Opción 2 (Para desarrollo con Expo Go):

```
✅ exp://192.168.1.9:8081
```

(Reemplaza con tu IP local que ves en el QR de Expo)

### Paso 2: Reiniciar Completamente la Aplicación

1. **Detén el servidor de Expo** (Ctrl+C en la terminal)

2. **Limpia la caché:**

    ```bash
    npm run start -- --clear
    ```

    O si usas el comando directo:

    ```bash
    npx expo start -c
    ```

3. **Cierra completamente la app** en tu celular (no solo minimizar, sino forzar cierre)

4. **Vuelve a abrir la app** desde Expo Go

### Paso 3: Verificar la Estructura de Archivos

Asegúrate de que estos archivos existan:

```
✅ app/login/index.tsx
✅ app/login/resetPassword.tsx
✅ app/login/updatePassword.tsx
✅ app/_layout.tsx (con la ruta login/updatePassword configurada)
```

### Paso 4: Prueba Nuevamente el Flujo Completo

1. Abre la app
2. Ve al login
3. Click en "¿Olvidaste tu contraseña?"
4. Ingresa tu email
5. Revisa tu correo
6. **IMPORTANTE:** Asegúrate de estar conectado a Expo Go antes de hacer clic en el enlace
7. Haz clic en el enlace del correo

## 🔧 Alternativas si Sigue sin Funcionar

### Alternativa 1: Modificar el redirectTo según el entorno

Si estás en desarrollo con Expo Go, modifica `resetPassword.tsx`:

```typescript
// En lugar de:
redirectTo: "finanzas-app://login/updatePassword";

// Usa (reemplaza con tu IP):
redirectTo: "exp://192.168.1.9:8081/--/login/updatePassword";
```

### Alternativa 2: Verificar app.json

Asegúrate de que `app.json` tenga el scheme correcto:

```json
{
  "expo": {
    "scheme": "finanzas-app",
    ...
  }
}
```

## 📱 Diferencia entre Expo Go y App Compilada

### Con Expo Go (Desarrollo):

- **Site URL en Supabase:** `exp://TU-IP:8081`
- **redirectTo en código:** `exp://TU-IP:8081/--/login/updatePassword`
- **Redirect URLs en Supabase:** Agregar `exp://**`

### Con App Compilada (Producción):

- **Site URL en Supabase:** `finanzas-app://`
- **redirectTo en código:** `finanzas-app://login/updatePassword`
- **Redirect URLs en Supabase:** Agregar `finanzas-app://**`

## 🎯 Configuración Recomendada Final en Supabase

### Site URL:

```
finanzas-app://
```

### Redirect URLs (agregar todas):

```
exp://**
finanzas-app://**
finanzas-app://login/updatePassword
http://localhost:8081
exp://192.168.1.9:8081
```

## 🐛 Debugging Adicional

Si después de todo esto sigue sin funcionar:

1. **Verifica los logs de Expo:**
    - Mira la terminal donde corre `npm start`
    - Busca errores relacionados con routing

2. **Verifica que el deep linking funcione:**
    - Prueba abrir manualmente: `exp://TU-IP:8081/--/login/resetPassword`
    - Debería abrir la pantalla de resetPassword

3. **Verifica el email que llega:**
    - El enlace debe contener un token de Supabase
    - Debe apuntar a la URL que configuraste en Site URL + el redirectTo

## ⚠️ Nota Importante

El error "Unmatched Route" generalmente ocurre porque:

1. ❌ El servidor de Expo no se reinició después de agregar nuevas rutas
2. ❌ El archivo de ruta no está en la ubicación correcta
3. ❌ Hay un typo en el nombre del archivo o en la configuración de Stack.Screen
4. ❌ El deep linking no está configurado correctamente

En tu caso, la estructura de archivos es correcta, así que el problema es muy probablemente que **necesitas reiniciar el servidor de Expo con caché limpia**.
