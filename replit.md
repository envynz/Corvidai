# Corvidae Portfolio Application

## Overview

This is a full-stack portfolio website for "Corvidae," featuring a React frontend with Express.js backend. The application showcases a personal/company portfolio with sections for about, services, blog integration via RSS feed parsing, and contact functionality. It uses a modern tech stack with TypeScript, shadcn/ui components, Tailwind CSS, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite with React plugin and custom development overlays

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API structure
- **Development**: Hot module replacement with Vite integration

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Blog Posts Table**: Stores blog content with title, excerpt, content, publication date, link, and unique GUID
- **Migration Strategy**: Drizzle Kit for schema migrations

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scrolling to sections
2. **Hero Section**: Landing area with logo, tagline, and call-to-action buttons
3. **About Section**: Personal/company information with skills highlights
4. **Services Section**: Three-column layout showcasing core offerings
5. **Blog Section**: RSS feed integration displaying latest posts from Substack
6. **Contact Section**: Contact form with multiple communication methods
7. **Footer**: Site navigation and social links

### Backend Services
1. **RSS Parser**: Custom RSS feed parser for Substack integration
2. **Blog Post Management**: CRUD operations for blog posts
3. **User Management**: Basic user authentication system
4. **Storage Layer**: Abstracted storage interface with in-memory implementation for development

### UI System
- **Design System**: Custom color palette with Corvidae brand colors (navy, cyan, blue, magenta, orange)
- **Theme**: Dark theme implementation with CSS custom properties
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Animations**: Custom CSS animations for interactive elements

## Data Flow

1. **Blog Content**: RSS feeds are parsed from external sources (Substack) and stored in the database
2. **User Interaction**: Form submissions are handled via React Query mutations
3. **Data Persistence**: Drizzle ORM manages database operations with PostgreSQL
4. **State Management**: TanStack Query handles caching, background updates, and optimistic updates
5. **Real-time Updates**: Blog posts are automatically synced when the blog section loads

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL serverless)
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Form Handling**: React Hook Form with Zod validation

### Development Tools
- **Build System**: Vite for fast development and production builds
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESBuild for production bundling
- **Development**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Environment**: NODE_ENV-based configuration switching
- **Database**: Production uses DATABASE_URL environment variable

### Development Environment
- **Hot Reload**: Vite dev server with Express middleware integration
- **Database**: Drizzle Push for schema synchronization
- **Asset Handling**: Static asset serving in development mode
- **Error Handling**: Runtime error overlays for debugging

### Configuration Management
- **Environment Variables**: DATABASE_URL for database connection
- **Path Aliases**: TypeScript path mapping for clean imports
- **Module Resolution**: ESM-first approach with bundler module resolution
- **Asset Management**: Vite handles asset optimization and bundling