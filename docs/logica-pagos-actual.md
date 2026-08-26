# Lógica actual de pagos y suscripciones — QuirozSystems

## 1. Ko-fi (donación / café)
- **Ubicación en el código**: 
  - Frontend: `src/components/CoffeeSupportModal.tsx`
  - Backend: `backend/routes/monetization.ts`
- **Tipo de integración**: Únicamente enlaces externos. La aplicación recupera las URLs (`kofiUrl`, `paypalUrl`) desde el endpoint `/api/monetization-config` y las muestra en la interfaz. No existe una pasarela de pago.
- **Registro en BD**: No. La base de datos solo almacena la URL destino de Ko-fi dentro del modelo `MonetizationConfig`. Cuando un usuario dona, no queda ningún registro en el sistema.
- **Rol/beneficio otorgado**: Puramente informativo y voluntario. No se le otorga ningún rol ni beneficio al usuario dentro de la plataforma.

## 2. PayPal (suscripción institucional)
- **Endpoints/controladores involucrados**:
  - `backend/routes/monetization.ts` para obtener la URL de PayPal y el texto del precio.
  - `backend/routes/auth.ts` (maneja el registro, pero sin validación de pago).
  - No hay endpoints que procesen transacciones de PayPal.
- **Webhook de confirmación**: No — no existe ruta ni integración de webhooks.
- **Tablas de BD involucradas**: 
  - `MonetizationConfig` para guardar la URL y el texto del precio (`subscriptionPriceDisplay`).
  - `Institution` (el modelo cuenta con un campo `plan_activo Boolean`, pero no interactúa con ningún flujo de pagos).
- **Planes existentes**: No hay un catálogo de planes reales estructurados en la base de datos (con límites de alumnos, nombres, etc.). Solo hay un campo de texto informativo.
- **Activación del rol institución**: Totalmente manual e insegura actualmente. El rol `INSTITUCION` se asigna automáticamente a cualquier usuario que lo solicite al registrarse en `POST /api/auth/register`, por lo que el pago se omite por completo.
- **Manejo de renovación/expiración**: No implementado.
- **Manejo de fallos/cancelación**: No implementado.

## 3. Huecos o inconsistencias detectadas
1. **Falta de pasarela y automatización**: Los botones redirigen a sitios externos (PayPal/Ko-fi) pero no se comunican de vuelta con el backend de QuirozSystems para confirmar si el pago fue exitoso o falló.
2. **Registro de Instituciones gratuito**: Cualquier persona puede crear una cuenta de Institución gratis desde la pantalla de registro, obteniendo acceso al dashboard de instructores sin haber pagado.
3. **Ausencia de modelos para suscripciones reales**: Falta un modelo que gestione los límites (número de alumnos), fechas de inicio y expiración de suscripciones, estados de pago (activo, vencido, cancelado) y el historial de transacciones.
4. **Desconexión entre el usuario y el registro de la institución**: Al crear una cuenta con rol `INSTITUCION`, no se crea su contraparte en la tabla `Institution` de Prisma. Esto causa que rutas como `/api/add-user` en `institutions.ts` fallen por errores de FK (Foreign Key), ya que usan el `user.id` buscando un `institution.id` que no existe.
5. **Falta de roles en pasarela de pagos**: La suscripción institucional no tiene forma de revocar accesos en caso de pagos fallidos porque el sistema ni siquiera registra las fechas de vigencia.
