# 🎨 CustomSelector con Iconos Personalizados

## ✅ Implementación Completa

### 📋 Resumen de Cambios

#### 1. **Componente CustomSelector** ✓

-   ✅ Agregada prop `iconKey` para especificar qué campo contiene el nombre del icono
-   ✅ Icono del lado **izquierdo** por cada item (personalizado según data)
-   ✅ Icono de **verificación (check)** del lado derecho cuando está seleccionado
-   ✅ Cambio de color del icono cuando el item está seleccionado

#### 2. **Servicios Actualizados** ✓

-   ✅ `getMetodosPagoServices`: Agrega iconos automáticamente
-   ✅ `getCategoriasServices`: Agrega iconos automáticamente

#### 3. **Interface Category** ✓

-   ✅ Agregado campo opcional `icon?: string`

#### 4. **Uso en AgregarGastos** ✓

-   ✅ Selector de Categorías con `iconKey='icon'`
-   ✅ Selector de Métodos de Pago con `iconKey='icon'`

---

## 🎯 Cómo Funciona

### Mapeo de Iconos

#### **Métodos de Pago:**

```typescript
{
  "Efectivo": "payments",            // 💵
  "Tarjeta de Credito": "credit-card", // 💳
  "Tarjeta de Debito": "payment",      // 💳
  "Transferencia": "swap-horiz",       // 🔄
  "Otros": "more-horiz"                // ⋯
}
```

#### **Categorías:**

```typescript
{
  "Alimentos": "restaurant",          // 🍽️
  "Restaurantes": "local-dining",     // 🍴
  "Transporte": "directions-car",     // 🚗
  "Entretenimiento": "movie",         // 🎬
  "Servicios": "build",               // 🔧
  "Salud": "local-hospital",          // 🏥
  "Educación": "school",              // 🎓
  "Ropa": "checkroom",                // 👔
  "Hogar": "home",                    // 🏠
  "Tecnología": "devices",            // 📱
  "Otros": "more-horiz"               // ⋯
}
```

---

## 🚀 Ejemplo de Uso

```tsx
<CustomSelector
	data={metodosPagoData}
	labelKey='name'
	valueKey='id'
	iconKey='icon' // 👈 Nuevo! Especifica el campo del icono
	placeholder='Selecciona el metodo de pago'
	value={field.value}
	onSelect={(item) => field.onChange(item)}
/>
```

---

## 🎨 Características Visuales

### Estados del Item:

1. **Normal**:
    - Icono gris (`#666`)
    - Texto negro normal
2. **Seleccionado**:
    - Fondo azul claro (`#f0f8ff`)
    - Icono azul (`#0066cc`)
    - Texto azul y negrita
    - ✓ Check del lado derecho

---

## 📝 Notas

-   Todos los iconos son de **MaterialIcons** de `@expo/vector-icons`
-   Los iconos se agregan automáticamente en los servicios
-   Si un nombre no tiene mapeo, usa un icono por defecto
-   El componente es completamente retrocompatible (iconKey es opcional)

---

## 🔧 Para Agregar Más Iconos

Simplemente edita el `iconMap` en los servicios y agrega más mapeos:

```typescript
const iconMap: Record<string, string> = {
	NuevoMetodo: "nombre-icono-materialicons",
	// ... más iconos
};
```

**Ver iconos disponibles:** https://icons.expo.fyi/Index
