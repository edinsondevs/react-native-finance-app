# Configuración de Reset de Contraseña con Supabase

## Archivos Modificados/Creados

1. **`app/login/resetPassword.tsx`** - Componente para solicitar el reset de contraseña
2. **`app/login/updatePassword.tsx`** - Componente para ingresar la nueva contraseña
3. **`app/_layout.tsx`** - Agregada ruta de updatePassword al Stack navigator
4. **`app/login/index.tsx`** - Ya tenía el enlace a resetPassword configurado correctamente

## Cómo Funciona

1. El usuario hace clic en "¿Olvidaste tu contraseña?" en el login
2. Se muestra la pantalla `resetPassword.tsx` donde ingresa su email
3. Supabase envía un email con un enlace del tipo: `finanzas-app://login/updatePassword?token=...`
4. Al hacer clic en el enlace del correo, la app abre la pantalla `updatePassword.tsx`
5. El usuario ingresa su nueva contraseña
6. La contraseña se actualiza y se redirige al login

## Configuración Requerida en Supabase

Para que el reset de contraseña funcione correctamente, debes configurar la URL de redirección en tu proyecto de Supabase:

### Paso 1: Accede a tu Dashboard de Supabase

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto: `sipqakcxjvzjmxywypfw`

### Paso 2: Configura las URLs de Redirección

1. En el menú lateral, ve a **Authentication** → **URL Configuration**
2. En la sección **"Redirect URLs"**, agrega las siguientes URLs:
    - **Para desarrollo Expo Go**: `exp://192.168.x.x:8081` (reemplaza con tu IP local)
    - **Para la app compilada**: `finanzas-app://login/updatePassword`
    - **Para testing local**: `http://localhost:8081`

### Paso 3: Configurar el Email Template (Opcional pero recomendado)

1. Ve a **Authentication** → **Email Templates**
2. Selecciona **"Reset Password"**
3. Verifica que el enlace de confirmación use la variable `{{ .ConfirmationURL }}`
4. El template por defecto debería verse algo así:
    ```html
    <h2>Reset Password</h2>
    <p>Follow this link to reset the password for your user:</p>
    <p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
    ```

## URLs de Redirección según el Entorno

### Desarrollo con Expo Go

Si estás usando Expo Go durante el desarrollo:

```typescript
redirectTo: "exp://192.168.x.x:8081/--/login/updatePassword";
```

### Producción (App Compilada)

Usa el esquema definido en `app.json`:

```typescript
redirectTo: "finanzas-app://login/updatePassword";
```

## Verificación

Para verificar que todo funciona:

1. **Prueba el flujo completo**:
    - Ejecuta `npx expo start`
    - Navega a la pantalla de login
    - Haz clic en "¿Olvidaste tu contraseña?"
    - Ingresa un email válido
    - Revisa tu correo y haz clic en el enlace
    - Verifica que la app abra la pantalla de updatePassword
    - Ingresa una nueva contraseña
    - Confirma que puedas iniciar sesión con la nueva contraseña

2. **Debugging**:
    - Revisa los logs de Supabase en el Dashboard → Logs → Auth Logs
    - Verifica los emails en el Dashboard → Auth → Users
    - Si el deep linking no funciona, verifica que el esquema `finanzas-app://` esté configurado en `app.json`

## Notas Importantes

- El componente `resetPassword.tsx` usa los componentes reutilizables del proyecto (`InputComponent`, `ButtomComponent`, `LinkComponent`)
- El diseño es consistente con el resto de la aplicación
- Las validaciones de email y contraseña se hacen del lado del cliente antes de enviar a Supabase
- La contraseña debe tener mínimo 6 caracteres (configuración por defecto de Supabase)
- Después de actualizar la contraseña, el usuario es redirigido automáticamente al login

## Troubleshooting

### El enlace del email no abre la app

- Verifica que el esquema `finanzas-app://` esté en `app.json`
- Asegúrate de que la URL esté en las Redirect URLs de Supabase
- Si usas Expo Go, usa el formato `exp://` en lugar de `finanzas-app://`

### El email no llega

- Verifica en el Dashboard de Supabase → Auth → Users que el email sea válido
- Revisa la bandeja de spam
- Verifica los Auth Logs en Supabase para ver si hubo errores

### Error al actualizar la contraseña

- Asegúrate de que el token no haya expirado (válido por 1 hora por defecto)
- Verifica que la contraseña cumpla con los requisitos mínimos (6 caracteres)
- Revisa los logs de la consola para ver el mensaje de error específico

## Resumen de Implementación

### Componentes Creados/Modificados

#### `app/login/resetPassword.tsx`

- Solicita el email del usuario
- Envía la petición de reset a Supabase
- Redirige al login después de enviar el email

#### `app/login/updatePassword.tsx`

- Recibe al usuario después del deep linking
- Solicita nueva contraseña y confirmación
- Actualiza la contraseña en Supabase
- Redirige al login después del éxito

#### `app/_layout.tsx`

- Agregada ruta `login/updatePassword` para el deep linking

### Flujo de Datos

```
Usuario → resetPassword
    ↓
Supabase.resetPasswordForEmail()
    ↓
Email enviado → Usuario hace clic en enlace
    ↓
Deep Link → updatePassword (con token)
    ↓
Supabase.updateUser({ password })
    ↓
Éxito → Redirect a login
```

### Seguridad

- El token de reset expira después de 1 hora
- El token solo puede usarse una vez
- El usuario debe estar autenticado con el token del email para cambiar la contraseña
- Supabase maneja toda la seguridad del proceso
