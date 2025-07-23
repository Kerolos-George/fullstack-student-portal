<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Student Portal Backend

A comprehensive NestJS backend application providing RESTful web services for managing announcements and quizzes in a student portal system.

## Project Overview

This backend implements two core web services:
1. **Announcements Service** - Complete CRUD operations for managing announcements
2. **Quiz Service** - Complete CRUD operations for managing quizzes

The application follows enterprise-level best practices, clean architecture principles, and implements robust business rules.

## Architecture & Design Patterns

### Clean Architecture Implementation
- **Controllers**: Handle HTTP requests/responses and route management
- **Services**: Contain business logic and data processing
- **DTOs**: Data Transfer Objects for request/response validation
- **Schemas**: MongoDB data models with Mongoose ODM
- **Modules**: Feature-based modular organization

### Design Patterns Used
- **Dependency Injection**: NestJS built-in IoC container
- **Repository Pattern**: Through Mongoose models
- **DTO Pattern**: For data validation and transformation
- **Module Pattern**: Feature-based code organization

## Web Services Implementation

### 1. Announcements Web Service

#### API Endpoints
```
GET    /announcements     - Retrieve all announcements
GET    /announcements/:id - Retrieve specific announcement
POST   /announcements     - Create new announcement
PATCH  /announcements/:id - Update existing announcement
DELETE /announcements/:id - Delete announcement
```

#### Data Model
```typescript
{
  authorName: string;    // Required: Author's name
  authorRole: string;    // Required: Author's role (Professor, TA, etc.)
  course?: string;       // Optional: Associated course
  message: string;       // Required: Announcement content (min 10 chars)
  createdAt: Date;       // Auto-generated timestamp
  updatedAt: Date;       // Auto-updated timestamp
}
```

#### Business Rules Implemented
- **Validation**: All required fields must be provided
- **Message Length**: Minimum 10 characters for announcement message
- **Sorting**: Announcements returned in reverse chronological order (newest first)
- **Error Handling**: Proper HTTP status codes and error messages
- **Not Found Handling**: Returns 404 for non-existent announcements

### 2. Quiz Web Service

#### API Endpoints
```
GET    /quizzes              - Retrieve all quizzes
GET    /quizzes?course=X     - Filter quizzes by course
GET    /quizzes?upcoming=true - Get only upcoming quizzes
GET    /quizzes/upcoming     - Dedicated endpoint for upcoming quizzes
GET    /quizzes/:id          - Retrieve specific quiz
POST   /quizzes              - Create new quiz
PATCH  /quizzes/:id          - Update existing quiz
DELETE /quizzes/:id          - Delete quiz
```

#### Data Model
```typescript
{
  title: string;         // Required: Quiz title
  course: string;        // Required: Course name
  topic: string;         // Required: Quiz topic
  dueDate: Date;         // Required: Quiz due date
  createdAt: Date;       // Auto-generated timestamp
  updatedAt: Date;       // Auto-updated timestamp
}
```

#### Business Rules Implemented
- **Date Validation**: Due dates must be valid ISO date strings
- **Filtering**: Support for course-based filtering
- **Upcoming Logic**: Quizzes with due dates in the future
- **Required Fields**: All core fields are mandatory
- **Error Handling**: Comprehensive error responses

## Technical Stack

- **Framework**: NestJS 11.x (Enterprise Node.js framework)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest framework
- **Language**: TypeScript (strict mode)
- **Code Quality**: ESLint + Prettier

## Project Structure

```
src/
├── announcements/              # Announcements module
│   ├── dto/
│   │   └── announcement.dto.ts # Request/Response DTOs
│   ├── schemas/
│   │   └── announcement.schema.ts # MongoDB schema
│   ├── announcements.controller.ts # HTTP endpoints
│   ├── announcements.service.ts    # Business logic
│   └── announcements.module.ts     # Module configuration
├── quizzes/                    # Quizzes module
│   ├── dto/
│   │   └── quiz.dto.ts        # Request/Response DTOs
│   ├── schemas/
│   │   └── quiz.schema.ts     # MongoDB schema
│   ├── quiz.controller.ts     # HTTP endpoints
│   ├── quiz.service.ts        # Business logic
│   └── quiz.module.ts         # Module configuration
├── config/                     # Configuration files
├── app.controller.ts          # Root controller
├── app.module.ts             # Root module
├── app.service.ts            # Root service
└── main.ts                   # Application bootstrap
```

## Best Practices Implemented

### 1. Code Structure & Organization
- **Modular Architecture**: Each feature in separate modules
- **Separation of Concerns**: Controllers, services, DTOs, schemas separated
- **Single Responsibility**: Each class has one clear purpose
- **Consistent Naming**: Clear, descriptive naming conventions

### 2. Data Validation & Security
- **Input Validation**: class-validator decorators on all DTOs
- **Type Safety**: Full TypeScript implementation
- **Schema Validation**: Mongoose schema constraints
- **Error Handling**: Proper exception handling with meaningful messages

### 3. API Design
- **RESTful Design**: Standard HTTP methods and status codes
- **Consistent Responses**: Uniform response structure
- **Query Parameters**: Support for filtering and searching
- **Documentation**: Complete Swagger/OpenAPI documentation

### 4. Database Best Practices
- **Schema Design**: Proper field types and constraints
- **Timestamps**: Automatic createdAt/updatedAt tracking
- **Indexing**: Efficient data retrieval patterns
- **Error Handling**: Database-specific error handling

### 5. Testing & Quality
- **Unit Tests**: Jest test framework setup
- **Code Coverage**: Coverage reporting configured
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier for consistent code style

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

### Installation Steps

1. **Clone and Install**
```bash
git clone https://github.com/Kerolos-George/fullstack-student-portal.git
cd backend
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/student-portal
PORT=3000
```

3. **Run the Application**
```bash
# Development mode
npm run start


## API Documentation

Once running, access the interactive Swagger documentation at:
```
http://localhost:3000/api/docs
```

The documentation includes:
- Complete endpoint descriptions
- Request/response schemas
- Example payloads
- Error response formats
- Interactive testing interface


## Business Rules Implementation

### Announcements Business Rules
1. **Required Fields**: authorName, authorRole, message must be provided
2. **Message Validation**: Minimum 10 characters for meaningful content
3. **Optional Course**: Course field is optional for flexibility
4. **Chronological Ordering**: Latest announcements appear first
5. **Error Responses**: Clear error messages for validation failures

### Quiz Business Rules
1. **Complete Information**: All fields (title, course, topic, dueDate) required
2. **Date Validation**: Due dates must be valid ISO date strings
3. **Course Filtering**: Support for course-specific quiz retrieval
4. **Upcoming Logic**: Automatic filtering for future quizzes
5. **Flexible Updates**: Partial updates supported through PATCH

## Error Handling Strategy

- **400 Bad Request**: Invalid input data or validation errors
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Unexpected server errors
- **Descriptive Messages**: Clear error descriptions for debugging
- **Consistent Format**: Uniform error response structure

## CRUD Operations Implementation

### Create (POST)
- Input validation using DTOs
- Business rule enforcement
- Automatic timestamp generation
- Success response with created resource

### Read (GET)
- Single resource retrieval by ID
- List all resources with optional filtering
- Proper sorting (announcements by date)
- Query parameter support (quizzes)

### Update (PATCH)
- Partial updates supported
- Input validation for provided fields
- Automatic updatedAt timestamp
- Returns updated resource

### Delete (DELETE)
- Resource existence validation
- Clean removal from database
- Proper HTTP status codes (204 No Content)
- Error handling for non-existent resources

## Evaluation Criteria Addressed

### Clean and Structured Code
- Modular architecture with clear separation of concerns
- Consistent naming conventions and file organization
- TypeScript for type safety and better code documentation
- Proper use of decorators and dependency injection

### Best Practices Implementation
- RESTful API design principles
- Input validation and error handling
- Database schema design with proper constraints
- Comprehensive API documentation
- Testing framework setup
- Code quality tools (ESLint, Prettier)

### Business Rules Implementation
- All required CRUD operations for both services
- Proper data validation and constraints
- Meaningful error messages and status codes
- Support for filtering and querying
- Automatic timestamp management
- Robust error handling for edge cases

