# Instrucciones para Agregar Invitados

## Cómo funciona el sistema de invitados

Cada invitado tiene un código único que se usa en la URL para personalizar la invitación.

### Formato de URL:
```
https://tu-sitio.com/?invitado=codigo-del-invitado
```

Por ejemplo:
- `https://tu-sitio.com/?invitado=juan-perez`
- `https://tu-sitio.com/?invitado=maria-garcia`

## Cómo agregar tus 50 invitados

1. Abre el archivo `src/data/guestList.js`

2. Reemplaza los ejemplos con tus invitados reales siguiendo este formato:

```javascript
export const guestList = {
  'familia-perez': { name: 'Familia Pérez', tickets: 4 },
  'juan-garcia': { name: 'Juan García y Familia', tickets: 5 },
  'maria-lopez': { name: 'María López', tickets: 2 },
  'carlos-martinez': { name: 'Carlos Martínez', tickets: 1 },
  // ... continúa con los 50 invitados
}
```

### Reglas importantes:

1. **Código del invitado** (parte izquierda):
   - Debe ser único para cada invitado
   - Solo letras minúsculas, números y guiones
   - Sin espacios ni caracteres especiales
   - Ejemplo: `'familia-rodriguez'`

2. **Nombre del invitado** (campo `name`):
   - El nombre completo como quieres que aparezca
   - Puede incluir espacios y acentos
   - Ejemplo: `'Familia Rodríguez'`

3. **Número de boletos** (campo `tickets`):
   - Un número entero (1, 2, 3, 4, 5, etc.)
   - Representa cuántas personas puede traer ese invitado

## Ejemplo completo con 10 invitados:

```javascript
export const guestList = {
  'familia-gonzalez': { name: 'Familia González', tickets: 5 },
  'tios-maria': { name: 'Tíos María y Pedro', tickets: 2 },
  'primos-del-norte': { name: 'Primos del Norte', tickets: 4 },
  'amigos-universidad': { name: 'Amigos de la Universidad', tickets: 3 },
  'vecinos-lopez': { name: 'Vecinos López', tickets: 2 },
  'compañeros-trabajo': { name: 'Compañeros de Trabajo', tickets: 6 },
  'padrinos-boda': { name: 'Padrinos de Boda', tickets: 2 },
  'familia-martinez': { name: 'Familia Martínez', tickets: 4 },
  'amigos-infancia': { name: 'Amigos de la Infancia', tickets: 3 },
  'tia-carmen': { name: 'Tía Carmen', tickets: 1 },
}
```

## Cómo compartir las invitaciones

Una vez que agregues todos tus invitados, genera una URL única para cada uno:

1. **Familia González**: `https://tu-sitio.com/?invitado=familia-gonzalez`
2. **Tíos María**: `https://tu-sitio.com/?invitado=tios-maria`
3. Y así sucesivamente...

Puedes enviar estas URLs por WhatsApp, email o cualquier medio digital.

## Qué verá cada invitado

Cuando un invitado abra su URL personalizada, verá:

```
Con mucho cariño invitamos a:
Familia González
5 boletos asignados
```

## Consejos

- Usa códigos descriptivos pero cortos
- Mantén un registro de qué código corresponde a cada invitado
- Puedes usar una hoja de cálculo para organizar:
  - Columna A: Nombre del invitado
  - Columna B: Código URL
  - Columna C: Número de boletos
  - Columna D: URL completa

## Nota importante

Si un invitado abre la página sin código (sin `?invitado=...`), no verá su nombre personalizado, pero podrá ver toda la información de la boda normalmente.
