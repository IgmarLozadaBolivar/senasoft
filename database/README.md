# 📦 Base de Datos del Sistema SENASoft

## 📋 Descripción General

Este directorio contiene la estructura de base de datos y datos de ejemplo para el sistema de gestión de aprendices del SENA. La base de datos está diseñada para manejar información de aprendices, centros de formación, departamentos y métricas del sistema.

## 🗂️ Estructura de Archivos
````
database/
├── README.md                   # Este archivo
├── collection/
│   ├── metrics_scalar.csv      # Metrics CSV
│   └── metrics_scalar.js       # Payload To Database
└── schema/
    ├── er_diagram.png          # Diagrama ER
    ├── schema.sql              # Estructura (DDL)
    └── sample_data.sql         # Datos (DML)
````

## 🏗️ Arquitectura de Base de Datos

### Motor de Base de Datos

- MySQL 8.0+ (Recomendado)

### Tablas Principales

| Tabla | Descripción | Registros |
|-------|-------------|---------------------|
| `departments` | Departamentos de Colombia | 33 |
| `centers` | Centros de formación SENA | 110+ |
| `apprentices` | Aprendices inscritos | 750+ |
| `programs` | Programas de formación | 5 |
| `recommendations` | Recomendaciones | +2200 |
| `instructors` | Instructores/Formadores | 200 |
| `metrics_globals` | Métricas del sistema | 0 |

## 🚀 Instalación y Configuración

### Prerrequisitos
- MySQL Server 8.0+
- Cliente MySQL (mysql-client, MySQL Workbench, etc.)
- Permisos de administrador en la base de datos

### Instalación Paso a Paso

1. **Crear la base de datos:**
   ```sql
   CREATE DATABASE senasoft CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE senasoft;
   ```

2. **Ejecutar estructura DDL:**
   ```bash
   mysql -u usuario -p senasoft < schemas/schema.sql
   ```

3. **Cargar datos de ejemplo:**
   ```bash
   mysql -u usuario -p senasoft < schemas/sample_data.sql
   ```

### Variables de Entorno Requeridas

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=senasoft
DB_USER=root
DB_PASSWORD=0000

# Conexión completa
DATABASE_URL=mysql://root:0000@localhost:3306/senasoft
```

## 📊 Datos de Ejemplo

### Características de los Datos

✅ **Consistencia**: Todos los datos mantienen integridad referencial  
✅ **Realismo**: Basados en datos reales del SENA (anonimizados)  
✅ **Diversidad**: Incluye diferentes departamentos, centros y programas  
✅ **Escalabilidad**: Diseñados para testing de performance  

### Distribución Geográfica
- **33 Departamentos** de Colombia
- **118 Centros** distribuidos nacionalmente
- **Concentración mayor** en Bogotá, Antioquia y Valle del Cauca
- **Representación rural y urbana** equilibrada

### Datos Académicos
- **5 Programas** de formación técnica y tecnológica
- **750+ Aprendices** con diferentes estados de matrícula
- **200 Instructores** asignados a múltiples programas
- **2,000+ Recomendaciones** asignados por los aprendices hacia sus instructores
- **Métricas históricas** de la edición actual (lastimosamente no incluidos)

---

**Nota**: Los datos incluidos son únicamente para desarrollo y testing. No contienen información personal real de aprendices del SENA.