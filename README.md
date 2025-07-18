# Empatía Backend API

A robust NestJS backend API for managing online psychology sessions and professional bookings.

**API Documentation**: [https://empatia-backend.vercel.app/api](https://empatia-backend.vercel.app/api)

## 🚀 Features

- **Professional Management**: Complete CRUD operations for psychologists with detailed profiles
- **Time Slot System**: Advanced scheduling system with availability tracking
- **Booking Engine**: Secure booking flow with session type validation
- **Real-time Data**: Optimized queries with TypeORM for fast response times
- **CORS Support**: Configured for seamless frontend integration
- **API Documentation**: Auto-generated Swagger documentation
- **Database Migrations**: Version-controlled database schema management

## 🛠️ Tech Stack

- **Backend Framework**: NestJS + TypeScript
- **Database**: PostgreSQL with TypeORM
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator + class-transformer
- **Deployment**: Vercel
- **Database Hosting**: Supabase/Neon (PostgreSQL)

## 📦 Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd empatia-backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Configure your DATABASE_URL and other variables

# Run database migrations
npm run migration:run

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Application Configuration
NODE_ENV=development
PORT=3001

# Frontend URL for CORS
FRONTEND_URL=https://empatia-online-sessions.vercel.app
```

### Production Setup (Vercel)

Configure these environment variables in your Vercel dashboard:

```env
DATABASE_URL=your-production-database-url
NODE_ENV=production
FRONTEND_URL=https://empatia-online-sessions.vercel.app
```

## 📁 Project Structure

```
src/
├── config/                    # Configuration files
│   └── database.config.ts     # TypeORM configuration
├── entities/                  # TypeORM entities
│   ├── psychologist.entity.ts
│   ├── time-slot.entity.ts
│   ├── user.entity.ts
│   └── index.ts
├── psychologists/             # Psychologists module
│   ├── get-all-psychologists/
│   ├── get-psychologist-with-availability/
│   ├── get-available-time-slots/
│   ├── book-time-slot/
│   ├── infrastructure/
│   └── psychologists.module.ts
├── common/                    # Shared resources
│   ├── dto/                   # Data Transfer Objects
│   └── interfaces/            # TypeScript interfaces
├── database/                  # Database migrations
│   └── migrations/
├── app.module.ts              # Root module
└── main.ts                    # Application entry point
```

## 🎯 Key Features

### Professional Directory API
- **GET /psychologists**: Retrieve all psychologists with availability counts
- **GET /psychologists/:id**: Get specific psychologist with detailed profile
- **Smart Filtering**: Built-in filtering by specialization, rating, and availability

### Time Slot Management
- **GET /psychologists/:id/time-slots**: Get available time slots for a psychologist
- **Date Range Queries**: Filter slots by specific date ranges
- **Availability Tracking**: Real-time availability status updates

### Booking System
- **POST /psychologists/:id/book**: Complete booking flow
- **Session Type Support**: Virtual and clinic session options
- **User Management**: Automatic user creation and session tracking

### Data Validation
- **DTO Validation**: Comprehensive input validation with class-validator
- **Type Safety**: Full TypeScript support throughout the application
- **Error Handling**: Centralized error handling with detailed logging

## 🧠 Technical Decisions & Architecture

### Database Design

#### **Entity Relationships**
- **Psychologist** ↔ **TimeSlot**: One-to-many relationship
- **User** ↔ **TimeSlot**: One-to-many relationship for bookings
- **Normalized Design**: Efficient queries with proper indexing

#### **Time Slot Strategy**
- **Decision**: Store individual time slots rather than recurring patterns
- **Rationale**: 
  - More flexible for irregular schedules
  - Easier to handle cancellations and modifications
  - Better for real-time availability tracking
- **Implementation**: 30-minute slot intervals with availability flags

### API Design Patterns

#### **Use Case Architecture**
- **Decision**: Separate use cases for each business operation
- **Structure**:
  ```
  feature/
  ├── usecase/
  ├── controller/
  ├── dto/
  └── infrastructure/
  ```
- **Benefits**:
  - Clear separation of concerns
  - Easy to test individual components
  - Scalable architecture for new features

#### **Repository Pattern**
- **Decision**: Abstract database operations behind repository interfaces
- **Implementation**: TypeORM repositories with custom query methods
- **Benefits**:
  - Database-agnostic business logic
  - Easy to mock for testing
  - Centralized data access logic

### Performance Optimizations

#### **Query Optimization**
- **Problem**: N+1 queries when loading psychologists with availability counts
- **Solution**: Custom SQL queries with subqueries for availability counts
- **Result**: Single query per request with all necessary data

#### **Caching Strategy**
- **Decision**: Database-level caching with connection pooling
- **Implementation**: TypeORM connection pool with optimized settings
- **Benefits**: Reduced database load and improved response times

#### **CORS Configuration**
- **Decision**: Whitelist approach for security
- **Implementation**: Dynamic CORS configuration based on environment
- **Security**: Only allows requests from trusted frontend domains

## 🚀 Deployment

### Vercel Deployment

The API is automatically deployed to Vercel:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Available at [https://empatia-backend.vercel.app](https://empatia-backend.vercel.app)

### Database Setup

1. **Local Development**: Use local PostgreSQL or Docker
2. **Production**: Use Supabase, Neon, or any PostgreSQL provider
3. **Migrations**: Run `npm run migration:run` after deployment

## 🔄 Development Workflow

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Database operations
npm run migration:generate -- src/migrations/MigrationName
npm run migration:run
npm run migration:revert

# Linting and formatting
npm run lint
npm run format
```

## 📚 API Documentation

### Health Check
- **GET /health**: Server status and configuration info

### Psychologists
- **GET /psychologists**: List all psychologists
- **GET /psychologists/:id**: Get psychologist details
- **GET /psychologists/:id/time-slots**: Get available time slots

### Bookings
- **POST /psychologists/:id/book**: Book a time slot

### Interactive Documentation
Visit `https://empatia-backend.vercel.app/api` for interactive Swagger documentation.

## 🔗 Links

- **API Documentation**: [https://empatia-backend.vercel.app/api](https://empatia-backend.vercel.app/api)
- **Frontend Application**: [https://empatia-online-sessions.vercel.app](https://empatia-online-sessions.vercel.app)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 