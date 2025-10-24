# Cómo Optimizar las Imágenes del Carrusel

Las imágenes actuales están causando problemas de carga. Aquí te explico cómo optimizarlas:

## Opción 1: Usar una herramienta online (Más fácil)

### TinyJPG / TinyPNG
1. Ve a https://tinyjpg.com/
2. Arrastra todas las imágenes del carrusel (fh1.jpeg, fh2.jpeg, etc.)
3. Espera a que se compriman automáticamente
4. Descarga las imágenes optimizadas
5. Reemplaza las imágenes en la carpeta `public/images/`

**Resultado esperado:** Las imágenes pesarán 60-80% menos sin perder calidad visible.

## Opción 2: Usar Squoosh (Más control)

1. Ve a https://squoosh.app/
2. Arrastra cada imagen
3. Configura:
   - Formato: **MozJPEG**
   - Calidad: **80-85**
   - Resize: Ancho máximo **1920px** (mantén el aspecto)
4. Descarga y reemplaza

## Opción 3: Usar ImageMagick (Línea de comandos)

Si tienes ImageMagick instalado, ejecuta en la carpeta de imágenes:

```bash
# Para todas las imágenes JPEG
for file in *.jpeg; do
  magick "$file" -resize 1920x1920\> -quality 85 "optimized_$file"
done
```

## Tamaños Recomendados

- **Ancho máximo:** 1920px
- **Calidad JPEG:** 80-85%
- **Peso objetivo:** 200-500 KB por imagen

## Después de Optimizar

1. Reemplaza las imágenes en `public/images/`
2. Limpia la caché del navegador (Ctrl + Shift + R)
3. Recarga la página

Las imágenes deberían cargar mucho más rápido sin perder calidad visual.
