# Guía de Despliegue en GoDaddy (cPanel)

Esta guía detalla los pasos para subir la aplicación BA Kitchen & Bath Remodeling a un entorno de producción en GoDaddy utilizando cPanel y MySQL.

## 1. Preparación de la Base de Datos

### Exportar Base de Datos Local
1. Abre **phpMyAdmin** localmente.
2. Selecciona la base de datos `ba_remodeling`.
3. Haz clic en la pestaña **Exportar**.
4. Elige el método "Rápido" y formato "SQL", luego haz clic en **Exportar**. Se descargará un archivo `.sql`.

### Crear Base de Datos en GoDaddy
1. Entra a tu **cPanel** de GoDaddy.
2. Ve a **Bases de datos MySQL®**.
3. Crea una nueva base de datos (ej: `ba_production`).
4. Crea un nuevo usuario de base de datos y asígnale una contraseña fuerte.
5. Añade el usuario a la base de datos con **Todos los privilegios**.
6. Ve a **phpMyAdmin** en cPanel, selecciona la nueva base de datos y usa la pestaña **Importar** para subir el archivo `.sql` que exportaste localmente.

---

## 2. Construcción del Proyecto (Frontend)

El proyecto está configurado para generar una salida estática que GoDaddy puede servir fácilmente.

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el comando de construcción:
   ```bash
   npm run build
   ```
3. Esto generará una carpeta llamada `dist/` con todos los archivos listos para producción.

---

## 3. Subida de Archivos

Puedes usar el **Administrador de Archivos** de cPanel o un cliente FTP (como FileZilla).

1. Localiza la carpeta `public_html` en tu servidor GoDaddy (o la carpeta del subdominio correspondiente).
2. Sube **todo el contenido** de la carpeta local `dist/` directamente a `public_html`.
   - *Nota: Asegúrate de que el archivo `index.html` quede en la raíz de `public_html`.*
3. Asegúrate de que la carpeta `api/` (que estaba dentro de `public/` y ahora está en `dist/api/`) se haya subido correctamente.

---

## 4. Configuración del Backend (PHP)

### Configurar variables de entorno
El archivo `public/api/config.php` busca un archivo `.env` en la raíz para las credenciales.

1. Crea un archivo llamado `.env` en la raíz de tu `public_html` en GoDaddy.
2. Añade las credenciales de la base de datos que creaste en el paso 1:
   ```env
   DATABASE_HOST=localhost
   DATABASE_USER=tu_usuario_godaddy
   DATABASE_PASSWORD=tu_password_fuerte
   DATABASE_NAME=nombre_db_godaddy
   ```

### Permisos de Carpeta para Imágenes
Para que las subidas de imágenes funcionen correctamente desde el administrador:

1. En el Administrador de Archivos de cPanel, localiza o crea la carpeta de subidas (basado en la lógica de la API, suele ser `api/uploads/` o similar).
2. Asegúrate de que las carpetas de destino de imágenes tengan permisos de escritura (normalmente **755** o **775** en GoDaddy).
3. Específicamente, verifica las rutas:
   - `uploads/projects/`
   - `uploads/cabinets/`
   - `uploads/blog/`

---

## 5. Verificación Final

1. Accede a tu dominio (ej: `https://tudominio.com`).
2. Ve a `/admin` e intenta iniciar sesión.
3. Verifica que los proyectos, gabinetes y posts del blog se carguen correctamente desde la base de datos.
4. Intenta crear un nuevo elemento con imagen para confirmar que el sistema de archivos del servidor permite la escritura.

> [!IMPORTANT]
> Asegúrate de que la versión de PHP en tu cPanel sea **8.1 o superior** para garantizar compatibilidad con todas las funciones utilizadas.
