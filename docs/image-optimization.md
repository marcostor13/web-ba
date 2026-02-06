# Documentación del Script de Optimización de Imágenes

Este script permite convertir automáticamente imágenes de formato PNG a WebP para mejorar el rendimiento de carga del sitio web.

## Ubicación
El script se encuentra en: `scripts/image-converter.js`

## Requisitos
Asegúrate de tener instalada la dependencia `sharp`:
```bash
npm install sharp
```

## Uso

### 1. Ejecución por defecto
Convierte todas las imágenes PNG dentro de `public/home` a WebP sin borrar los originales.
```bash
node scripts/image-converter.js
```

### 2. Especificar un directorio
Puedes pasar la ruta del directorio como primer argumento.
```bash
node scripts/image-converter.js public/assets/images
```

### 3. Convertir y borrar originales
Añade el flag `--delete` para eliminar los archivos PNG originales tras una conversión exitosa.
```bash
node scripts/image-converter.js public/home --delete
```

## Beneficios
- **Reducción de tamaño:** Las imágenes WebP suelen ser entre un 30% y 50% más ligeras que las PNG sin pérdida perceptible de calidad.
- **Mejor SEO:** Tiempos de carga más rápidos mejoran el ranking en buscadores.
- **Automatización:** Facilita la optimización de nuevos assets sin herramientas externas.
