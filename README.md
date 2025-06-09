# 💅 formulario-citas - Sistema de Reservas

> Sistema completo de reservas online para salón de uñas con integración a Google Calendar

Sistema completo de reservas online para salón de uñas con integración a Google Calendar, autenticación OAuth y alertas automáticas.

## 🌟 Características Principales

### Para las Clientas:
- ✅ **Login con Google OAuth** - Autenticación segura
- ✅ **Selección intuitiva** - Servicios, fechas y horarios
- ✅ **Integración automática** - Cita se agrega a su Google Calendar
- ✅ **Alertas inteligentes** - Recordatorio 1 hora antes
- ✅ **Responsive Design** - Funciona perfecto en móviles

### Para el Salón:
- ✅ **Panel de administración** - Gestión completa de reservas
- ✅ **Sincronización bidireccional** - Todas las citas en tu Google Calendar
- ✅ **Configuración flexible** - Cerrar días, configurar vacaciones
- ✅ **Base de datos automática** - Todo se guarda en Google Sheets
- ✅ **Sin costos** - Completamente gratuito usando Google Apps Script

## 📁 Estructura del Proyecto

```
formulario-citas/
├── 📄 index.html                 # Formulario principal de reservas
├── 📄 admin.html                 # Panel de administración (opcional)
├── 📂 backend/
│   ├── 📄 codigo.gs             # Google Apps Script - Backend completo
│   └── 📄 instrucciones.md     # Guía de configuración del backend
├── 📂 docs/
│   ├── 📄 instalacion.md        # Guía de instalación paso a paso
│   ├── 📄 configuracion.md      # Configuración de Google OAuth
│   └── 📄 manual-uso.md         # Manual de uso para el salón
├── 📂 assets/
│   └── 📂 images/
│       ├── 🖼️ screenshot-1.png   # Capturas del formulario
│       └── 🖼️ screenshot-2.png   # Capturas del panel admin
└── 📄 README.md                  # Este archivo
```

## 🚀 Instalación Rápida

### 1. **Clonar el repositorio:**
```bash
git clone https://github.com/gracereserve/formulario-citas.git
cd formulario-citas
```

### 2. **Configurar Google Apps Script:**
1. Abrir [script.google.com](https://script.google.com)
2. Crear nuevo proyecto
3. Copiar el código de `backend/codigo.gs`
4. Ejecutar la función `configurarSistema`
5. Implementar como Web App

### 3. **Configurar GitHub Pages:**
1. Ir a Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. ¡Listo! Tu sistema estará en `https://gracereserve.github.io/formulario-citas`

## ⚙️ Configuración

### Google OAuth Setup:
1. [Google Cloud Console](https://console.cloud.google.com)
2. Crear proyecto → Habilitar Google Calendar API
3. Credentials → OAuth client ID
4. Authorized origins: `https://gracereserve.github.io`
5. Actualizar `data-client_id` en `index.html`

### Servicios Incluidos:
- 💅 Manicure permanente (1 hora)
- 💅 Manicure tradicional (1 hora)  
- 💅 Esculpidas (3 horas)
- 💅 Relleno acrílico (2 horas)
- 💅 Relleno poligel (2 horas)
- 🦶 Pedicure con esmalte permanente (1 hora)
- 🦶 Pedicure con esmalte tradicional (1 hora)
- 💅 Barrido de acrílico (2 horas)
- 💇‍♀️ Keratina (2.5 horas)

### Horarios Predeterminados:
- **Lunes, Miércoles, Jueves:** 9:00-12:00, 14:00-21:00
- **Martes, Viernes:** 9:00-12:00, 14:00-19:00  
- **Sábados:** 9:00-12:00, 14:00-17:00
- **Domingos:** Cerrado

## 📱 Uso

### Para las Clientas:
1. Acceder al link: `https://gracereserve.github.io/formulario-citas`
2. Iniciar sesión con Google
3. Completar datos personales
4. Seleccionar servicio deseado
5. Elegir fecha y hora disponible
6. ¡Confirmar reserva!

### Para el Salón:
1. **Ver reservas:** Google Sheets → Pestaña "Reservas"
2. **Cerrar días:** Google Sheets → Pestaña "Configuracion"
3. **Modificar servicios:** Google Sheets → Pestaña "Servicios"
4. **Panel web admin:** `https://gracereserve.github.io/formulario-citas/admin.html`

## 🔧 Funcionalidades Técnicas

### Backend (Google Apps Script):
- ⚡ API RESTful para reservas
- 📊 Validación de horarios en tiempo real
- 📧 Emails automáticos de confirmación
- 📅 Integración bidireccional con Google Calendar
- 🔒 Manejo seguro de datos

### Frontend (HTML/CSS/JS):
- 🎨 Diseño responsive con colores terracota, verde oliva y beige
- 🔐 Autenticación OAuth con Google
- ⏰ Validación inteligente de horarios
- 📱 Optimizado para móviles
- 🎯 UX intuitiva en 4 pasos simples

## 📊 Base de Datos (Google Sheets)

### Hoja "Reservas":
| ID | Fecha | Hora | Nombre | Apellido | Teléfono | Servicio | Duración | Estado |
|----|-------|------|--------|----------|----------|----------|----------|--------|

### Hoja "Configuracion":
| Fecha | Estado | Horario_Especial | Notas |
|-------|--------|------------------|-------|

### Hoja "Servicios":
| Servicio | Duración | Precio | Activo |
|----------|----------|--------|--------|

## 🔗 Links Importantes

- **🌐 Demo Online:** `https://gracereserve.github.io/formulario-citas`
- **⚙️ Panel Admin:** `https://gracereserve.github.io/formulario-citas/admin.html`
- **📊 Google Sheets:** [Tu hoja de cálculo]
- **🔧 Apps Script:** [Tu proyecto de script]

## 📞 Soporte

### Para Problemas Técnicos:
1. Revisar la [Guía de Instalación](docs/instalacion.md)
2. Verificar configuración OAuth
3. Comprobar permisos de Google Apps Script

### Para Personalización:
- Modificar servicios en Google Sheets → "Servicios"
- Cambiar horarios en `index.html` 
- Personalizar colores en CSS
- Agregar nuevos campos al formulario

## 🎯 Próximas Mejoras

- [ ] 📲 Integración con WhatsApp Business API
- [ ] 💳 Sistema de pagos online
- [ ] 📈 Dashboard de estadísticas avanzadas
- [ ] 🔔 Recordatorios por SMS
- [ ] 🌐 Versión multiidioma
- [ ] 📋 Sistema de encuestas post-servicio

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu negocio.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el sistema:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 👩‍💼 Creado Para

Este sistema fue diseñado específicamente para salones de uñas que buscan:
- 🎯 Profesionalizar su proceso de reservas
- ⏰ Reducir tiempo perdido en coordinación
- 📱 Ofrecer una experiencia moderna a sus clientas
- 📊 Tener control total de su agenda
- 💰 Aumentar eficiencia sin costos adicionales

---

### ⭐ Si este proyecto te ayuda con tu negocio, ¡considera darle una estrella!

**Desarrollado con ❤️ para emprendedoras del mundo de la belleza**

---

### 📧 Contacto

- **GitHub:** [@gracereserve](https://github.com/gracereserve)
