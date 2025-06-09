# 🔧 Configuración del Backend - Google Apps Script

## 📋 Instrucciones Paso a Paso

### 1. **Crear Google Apps Script**
1. Ve a [script.google.com](https://script.google.com)
2. Haz clic en "Nuevo proyecto"
3. Renombra el proyecto: "Backend Salón Reservas"

### 2. **Configurar el Código**
1. Borra todo el código predeterminado
2. Copia y pega el código completo de `codigo.gs`
3. Guarda el proyecto (Ctrl + S)

### 3. **Configurar Variables**
Antes de ejecutar, actualiza estas variables en el código:

```javascript
// Configuración del sistema
const CONFIG = {
  SALON_EMAIL: 'tu-email@gmail.com',           // TU EMAIL
  GOOGLE_CLIENT_ID: 'tu-client-id.apps.googleusercontent.com', // TU CLIENT ID
  SALON_NAME: 'Tu Salón de Uñas',              // NOMBRE DE TU SALÓN
  OWNER_CALENDAR_ID: 'tu-email@gmail.com'      // TU EMAIL PARA CALENDAR
};
```

### 4. **Ejecutar Configuración Inicial**
1. En el menú desplegable, selecciona la función `configurarSistema`
2. Haz clic en el botón ▶️ "Ejecutar"
3. **Autoriza todos los permisos** cuando aparezcan:
   - ✅ Google Sheets
   - ✅ Gmail
   - ✅ Google Calendar
   - ✅ Script externo

### 5. **Implementar como Web App**
1. Haz clic en "Implementar" → "Nueva implementación"
2. Configuración:
   - **Tipo:** Aplicación web
   - **Ejecutar como:** Yo (tu-email@gmail.com)
   - **Quién tiene acceso:** Cualquier persona
3. Haz clic en "Implementar"
4. **Copia la URL** que aparece (la necesitarás para el frontend)

### 6. **Verificar Instalación**
Deberías ver:
- ✅ Google Sheet creado: "Sistema Reservas Salón"
- ✅ 3 pestañas: "Reservas", "Configuracion", "Servicios"
- ✅ Datos iniciales cargados en "Servicios"

## 🔧 Configuraciones Adicionales

### Configurar Google OAuth:
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto o usa uno existente
3. Habilita estas APIs:
   - Google Calendar API
   - Gmail API
   - Google Sheets API
4. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente OAuth"
5. Tipo: Aplicación web
6. **Orígenes autorizados:** 
   - `https://tu-usuario.github.io`
   - `http://localhost:8000` (para pruebas locales)
7. Copia el "ID de cliente" y actualízalo en el código

### URLs Importantes:
- **Google Sheet:** Se crea automáticamente y aparece en tu Google Drive
- **Web App URL:** La que copias después de implementar
- **GitHub Pages:** `https://gracereserve.github.io/formulario-citas`

## 📊 Estructura de las Hojas

### Hoja "Reservas":
```
A1: ID | B1: Fecha | C1: Hora | D1: Nombre | E1: Apellido | 
F1: Telefono | G1: Servicio | H1: Duracion | I1: Estado | J1: Fecha_Creacion
```

### Hoja "Configuracion":
```
A1: Fecha | B1: Estado | C1: Horario_Especial | D1: Notas

Ejemplos de uso:
2025-12-25    CERRADO    (vacío)    Navidad
2025-06-15    CERRADO    (vacío)    Vacaciones
2025-07-04    ACTIVO     9:00-15:00    Horario especial
```

### Hoja "Servicios":
```
A1: Servicio | B1: Duracion | C1: Precio | D1: Activo

Se llena automáticamente con todos tus servicios
```

## 🔍 Funciones Principales del Backend

### `configurarSistema()`
- Crea las hojas de Google Sheets
- Configura los encabezados
- Carga los servicios iniciales

### `doPost(e)`
- Recibe las reservas del formulario web
- Valida disponibilidad de horarios
- Guarda en Google Sheets
- Crea eventos en Google Calendar
- Envía emails de confirmación

### `getAvailableSlots(date, duration)`
- Calcula horarios disponibles para una fecha
- Considera duración del servicio
- Excluye horarios ocupados
- Respeta días cerrados/vacaciones

### `createCalendarEvent(reservationData)`
- Crea evento en Google Calendar del cliente
- Crea evento en Google Calendar del salón
- Configura alertas automáticas (1 hora antes)

### `sendConfirmationEmail(reservationData)`
- Envía email de confirmación al cliente
- Incluye todos los detalles de la cita
- Instrucciones para cancelar/reprogramar

## 🚨 Solución de Problemas

### Error: "No se puede ejecutar configurarSistema"
**Solución:** Autoriza todos los permisos requeridos

### Error: "Cannot read property of undefined"
**Solución:** Verifica que las variables CONFIG estén bien configuradas

### Error: "Calendar API not enabled"
**Solución:** Habilita Google Calendar API en Google Cloud Console

### No se reciben emails
**Solución:** Verifica que el email en CONFIG sea correcto

### Horarios no se muestran
**Solución:** Verifica la URL del Web App en el frontend

## 📞 Soporte Técnico

Si tienes problemas:

1. **Verifica permisos:** Asegúrate de autorizar todas las APIs
2. **Revisa logs:** En Apps Script, ve a "Ejecuciones" para ver errores
3. **Comprueba configuración:** Todas las variables deben estar correctas
4. **Testea funciones:** Ejecuta `configurarSistema` manualmente

### URLs de Verificación:
- **Google Sheets:** Debe aparecer en tu Google Drive
- **Apps Script:** `https://script.google.com/home`
- **Cloud Console:** `https://console.cloud.google.com`

¡Una vez configurado correctamente, el sistema funcionará automáticamente! 🎉
