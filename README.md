# Althea - Sistema de Gestión Hospitalaria

**Althea** es una aplicación Flutter multiplataforma diseñada para optimizar la gestión hospitalaria. Este sistema permite a pacientes, doctores, recepcionistas y administradores gestionar citas, historias clínicas, horarios y sedes de manera eficiente e integrada.

## Características Principales

### Perfiles de Usuario

1.  **Paciente**
    *   Consulta de médicos disponibles.
    *   Agendamiento de citas médicas.
    *   Visualización de historial de citas.
    *   Gestión de perfil.

2.  **Doctor**
    *   Visualización de horario y agenda.
    *   Gestión de pacientes asignados.
    *   Acceso a historias clínicas.

3.  **Recepcionista**
    *   Búsqueda de pacientes.
    *   Agendamiento de citas en nombre de pacientes.

4.  **Administrador**
    *   Gestión de sedes hospitalarias.
    *   Gestión de médicos (agregar, editar, eliminar).

### Características Técnicas
*   **Arquitectura Limpia**: Implementación de patrones modernos de desarrollo.
*   **State Management**: Manejo de estado reactivo y escalable.
*   **Routing**: Navegación fluida y estructurada con `go_router`.
*   **Theme System**: Tema unificado con `flutter_application_althea`.

## Instalación y Configuración

### Requisitos Previos
*   Flutter SDK (versión compatible).
*   Android Studio o VS Code.

### Pasos de Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd flutter_application_althea
    ```

2.  **Instalar dependencias**:
    ```bash
    flutter pub get
    ```

3.  **Configuración del entorno**:
    *Asegúrate de que las variables de entorno y configuraciones necesarias estén definidas en `lib/core/config/app_config.dart`.*

4.  **Ejecutar la aplicación**:
    ```bash
    flutter run
    ```

## Estructura del Proyecto

*   `lib/core/`: Configuración central, tema, routers y dependencias.
*   `lib/features/`: Módulos de UI organizados por rol (auth, patient, doctor, etc.).
*   `lib/shared/`: Widgets reutilizables y utilidades.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue las mejores prácticas de desarrollo y arquitectura limpia.

## Licencia

Este proyecto es propiedad de sus desarrolladores. Todos los derechos reservados.
