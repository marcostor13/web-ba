# Guía de Estilos y Reglas de Desarrollo Web

Este documento detalla las especificaciones de diseño (Design System) para la implementación del sitio web, incluyendo paleta de colores, tipografía, componentes y reglas de maquetación.

---

## 1. Colores (Paleta)

Estos son los códigos hexadecimales base para la interfaz.

| Color | Hex | Uso Sugerido (Inferencia) |
| :--- | :--- | :--- |
| **Beige Claro** | `#F4E9DE` | Fondo principal / Background |
| **Negro Suave** | `#151006` | Texto principal / Títulos |
| **Dorado/Marrón**| `#956B24` | Acento / Botones / Bordes |
| **Gris Oscuro** | `#717171` | Texto secundario |
| **Gris Claro** | `#B5B5B5` | Placeholders / Elementos deshabilitados |
| **Blanco** | `#FFFFFF` | Textos sobre fondos oscuros |

---

## 2. Tipografía

**Fuente Principal:** [Urbanist](https://fonts.google.com/specimen/Urbanist) (Google Fonts)

### Headings (Títulos)
| Nivel | Peso (Weight) | Tamaño (Size) | Line Height |
| :--- | :--- | :--- | :--- |
| **H1** | Regular (400) | 60 px | 66 px |
| **H2** | Medium (500) | 35 px | 42 px |
| **H3** | Regular (400) | 30 px | 36 px |
| **H4** | Regular (400) | 22 px | 24 px |

### Body (Cuerpo de texto)
| Estilo | Peso | Tamaño | Line Height | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Large** | Regular | 30 px | 36 px | Introducciones / Destacados |
| **Medium** | Regular | 25 px | 30 px | Subtítulos de sección |
| **Normal** | Regular | 17 px | 20 px | Párrafos estándar |
| **Small** | Regular | 15 px | 24 px | Legales / Detalles |

---

## 3. Componentes UI

### Botones (Buttons)
Reglas generales para el componente botón principal (*Start your project now*).

* **Tipografía:** 15px (Urbanist).
* **Padding Vertical (Top/Bottom):** 20px.
* **Padding Horizontal (Left/Right):** 20px.
* **Bordes:** Grosor de línea de **1px**.
* **Colores base:** `#956B24` (Probable borde/texto) y `#FFFFFF` (Fondo o texto inverso).
* **Estados requeridos:**
    * Default
    * Hover
    * Active
    * Disable

### Enlaces (Links)
Estilos para enlaces de texto (ej. "Texto de Prueba").

* **Estados:** Normal y Hover.
* **Variante Mayúsculas:** Se especifica una variante en *Uppercase* ("TEXTO DE PRUEBA").

### Formularios (Inputs)
Estilo minimalista (probablemente solo borde inferior o sin bordes laterales dado el padding).

* **Tipografía:** Según la jerarquía de texto (ver sección Tipografía).
* **Padding Left:** 0px (El texto comienza alineado al borde).
* **Padding Right:** Automático.
* **Padding Top/Bottom:** 22px.
* **Estados:**
    * *Campo vacío* (Placeholder visible).
    * *Campo activo* (Foco).
    * *Texto largo* (Overflow behavior).
    * *Error:* Mensaje de error visible (ej. "Email Incorrecto").

---

## 4. Layout y Espaciados

### Secciones (Sections)
Reglas de estructura y comportamiento del scroll.

* **Padding Top:** 110px (Fijo).
* **Padding Bottom:** Mínimo 110px (Variable según la pantalla).
* **Padding Horizontal (X):** 54px (Izquierda y Derecha).
* **Espaciado específico de botones:** Se menciona un padding/gap de contextura de 30px para grupos de botones.

### Comportamiento de Scroll (Scroll Snap)
* **Regla de Oro:** Las secciones deben intentar abarcar el **100% del viewport (100vh)**.
* **Navegación:** Al hacer scroll, la web debe "saltar" de sección en sección (*Scroll Snap*).
* **Excepción:** Si el contenido de la sección es demasiado extenso para una sola pantalla, se desactiva el snap y se permite un scroll normal fluido.