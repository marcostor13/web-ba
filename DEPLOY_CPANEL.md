# Guía de Despliegue — GoDaddy cPanel + Node.js

## Requisitos Previos
- Hosting GoDaddy con soporte para **Node.js** (cPanel > Setup Node.js App)
- Node.js >= 18 disponible en el servidor
- Base de datos MySQL creada en cPanel

---

## Paso 1: Compilar la aplicación localmente

```bash
# En tu máquina local
cd c:\Marcos\Proyectos\BA\web\web-ba
npm run build
```

Esto genera la carpeta `dist/` con:
- `dist/server/` — Servidor Node.js SSR
- `dist/client/` — Assets estáticos (CSS, JS, imágenes públicas)

---

## Paso 2: Archivos a subir al servidor

Sube los siguientes archivos/carpetas via FTP o el File Manager de cPanel:

```
dist/                    ← compilado completo
public/                  ← imágenes estáticas (asegúrate de incluir public/uploads/ si tienes imágenes)
node_modules/            ← o corre npm install en el servidor
package.json
.env                     ← renombrado desde .env.production.template con tus valores reales
```

> ⚠️ **Nunca subas** `.env` con credenciales al repositorio git.

---

## Paso 3: Configurar Base de Datos MySQL en cPanel

1. Ir a cPanel → **MySQL Databases**
2. Crear la base de datos: `ba_remodeling`
3. Crear un usuario y asignarle permisos completos
4. Importar el schema SQL desde `database/schema.sql` (si existe) o desde el archivo de importación

---

## Paso 4: Configurar la App Node.js en cPanel

1. Ir a cPanel → **Setup Node.js App**
2. Hacer clic en **Create Application**
3. Configurar:

| Campo | Valor |
|---|---|
| Node.js version | 18.x o superior |
| Application mode | Production |
| Application root | `/home/tuusuario/public_html/web-ba` (ruta donde subiste los archivos) |
| Application URL | Tu dominio o subdominio |
| Application startup file | `dist/server/entry.mjs` |

4. Guardar y hacer clic en **Run NPM Install** si no subiste `node_modules`

---

## Paso 5: Variables de Entorno

En la misma pantalla de "Setup Node.js App", en la sección **Environment Variables**, agregar:

| Variable | Valor |
|---|---|
| `DATABASE_HOST` | `localhost` |
| `DATABASE_USER` | Tu usuario MySQL |
| `DATABASE_PASSWORD` | Tu password MySQL |
| `DATABASE_NAME` | `ba_remodeling` |
| `AUTH_SECRET` | Una cadena larga y aleatoria (mín. 32 chars) |
| `HOST` | `0.0.0.0` |
| `PORT` | El puerto que asigne cPanel (normalmente > 3000) |

---

## Paso 6: Carpeta de Uploads

Las imágenes subidas desde el admin se guardan en `public/uploads/`. Esta carpeta debe existir y tener permisos de escritura en el servidor.

```bash
# En el servidor, vía terminal SSH o File Manager:
mkdir -p public/uploads/projects
mkdir -p public/uploads/cabinets
mkdir -p public/uploads/blog
chmod -R 755 public/uploads
```

---

## Paso 7: Iniciar la Aplicación

Desde "Setup Node.js App" en cPanel, hacer clic en el botón **Start** (o **Restart** si ya estaba corriendo).

La app estará disponible en tu dominio configurado.

---

## Estructura de archivos en el servidor

```
/home/tuusuario/public_html/web-ba/
├── dist/
│   ├── server/
│   │   └── entry.mjs      ← Punto de entrada del servidor
│   └── client/            ← Assets estáticos
├── public/
│   └── uploads/           ← Imágenes subidas (debe ser escribible)
│       ├── projects/
│       ├── cabinets/
│       └── blog/
├── node_modules/
├── package.json
└── .env                   ← Variables de entorno (¡NO subir al repo!)
```

---

## Notas importantes

- **Imágenes antiguas (S3):** Si había imágenes en AWS S3 guardadas en la DB, seguirán apuntando a URLs de S3. Deberás re-subirlas desde el admin para que usen el almacenamiento local.
- **SSL:** Configura el SSL del dominio en cPanel → "SSL/TLS" antes de poner en producción.
- **Logs:** Los logs de la app están disponibles en cPanel → "Setup Node.js App" → ver logs del proceso.
