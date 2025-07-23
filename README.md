# Student Portal - Fullstack Application

A comprehensive fullstack student portal application built with modern web technologies. This project provides a complete learning management system with announcements, quizzes, and user authentication.

## 🎯 Project Overview

The Student Portal is a fullstack web application designed to manage student activities, announcements, and quizzes. It features a modern React frontend with a robust NestJS backend, implementing best practices in web development.

### Key Features

- **User Authentication**: Simple login/logout system without password requirements
- **Announcements Management**: Complete CRUD operations for announcements
- **Quiz System**: Full quiz management with scheduling and tracking
- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern UI**: Material-UI components with custom theming
- **Internationalization**: Ready for multi-language support
- **Testing**: Comprehensive test coverage for both frontend and backend

## 🏗️ Architecture

This is a monorepo containing two main applications:

### Frontend (`/frontend`)
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

### Backend (`/backend`)
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Validation**: class-validator

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Kerolos-George/fullstack-student-portal.git
cd student-portal
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run start:dev
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

