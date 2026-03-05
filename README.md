# My-Projects

Welcome to My Projects, a collection of personal web development projects showcasing my skills in building full-stack applications and modern user interfaces.

## Table of Contents

- [Projects](#projects)
- [Getting Started](#getting-started)

## Projects

### 1. Swop Market (C2C E-Commerce Platform)

- **Description**:
  Swop Market is a fully functional consumer-to-consumer (C2C) e-commerce marketplace. It allows users to browse, buy, and sell products seamlessly. The platform features robust product filtering, cart management, and a dedicated seller dashboard to manage listings.
- **Features**:
  - Product catalog with enhanced filtering and search
  - User authentication and profile management
  - Shopping cart and secure checkout flow
  - Seller capabilities (uploading product details, images, and pricing)
- **Technologies**:
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS & shadcn/ui
  - Prisma ORM & Database Integration

### 2. Chordify (Music Dashboard)

- **Description**:
  Chordify is a modern web application that integrates with the Spotify API to provide a rich music browsing experience. Users can log in with their Spotify accounts to view their playlists, liked songs, recent activity, and discover new artists and albums.
- **Features**:
  - Spotify API integration and authentication
  - Browse and search for songs, albums, and artists
  - Playlist and library management
  - Responsive, clean UI with modern design principles
- **Technologies**:
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS & shadcn/ui
  - Spotify Web API

### 3. ASP.NET Core API

- **Description**:
  This is a backend API built using ASP.NET Core, serving as the backend for the Spotify API Website. It provides RESTful endpoints for interacting with the Spotify API and acts as the middleware to manage API calls and handle authentication.
- **Features**:
  - Provides data endpoints for the Spotify API Website
  - Implements SOLID principles
- **Technologies**:
  - ASP.NET Core (C#)
  - SQL Server

## Getting Started

To run these projects locally, follow these steps:

### Swop Market

```bash
# Clone the repository
git clone https://github.com/QuintonCodes/my-projects.git
cd my-projects/swop-market

# Install dependencies
npm install

# Set up the database (requires a .env file with your database URL)
npx prisma generate
npx prisma db push

# Start the development server
npm run dev

# Open your browser and navigate to http://localhost:3000
```

### Chordify

```bash
# Clone the repository
# Clone the repository (if not already cloned)
git clone https://github.com/QuintonCodes/my-projects.git
cd my-projects/chordify

# Install dependencies
npm install

# Start the development server (requires a .env.local file with Spotify API credentials)
npm run dev

# Open your browser and navigate to http://localhost:3000
```

## Contribution

Feel free to contribute to this repository by submitting issues or pull requests!
