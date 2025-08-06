# 🎮 PixelBox

**LetterBox for Gamers** - Rate, review, and share your gaming experiences with the community.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.x-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 Overview

PixelBox is a modern web application that brings the beloved Letterboxd experience to the gaming world. Discover new games, track what you've played, rate your experiences, and share your thoughts with a community of fellow gamers.

### ✨ Key Features

- **Game Discovery**: Browse and search through an extensive database of games
- **Personal Gaming Journal**: Track games you've played, want to play, and are currently playing
- **Rating & Reviews**: Rate games on a 5-star scale and write detailed reviews
- **Social Features**: Follow other gamers, see their activity, and discover games through friends
- **Lists & Collections**: Create custom lists like "Best RPGs of 2024" or "Hidden Gems"
- **Gaming Statistics**: Visualize your gaming habits with detailed analytics
- **Real-time Updates**: Live notifications and activity feeds powered by Firebase
- **Responsive Design**: Seamless experience across desktop and mobile devices

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 with modern hooks and functional components
- **Build Tool**: Vite for lightning-fast development and optimized builds
- **Backend**: Firebase ecosystem for serverless architecture
- **Database**: Firestore for real-time, scalable NoSQL data storage
- **Authentication**: Firebase Auth with multiple providers (Google, GitHub, Email)
- **Hosting**: Firebase Hosting for global CDN and SSL
- **Storage**: Firebase Storage for user avatars and game images
- **Game Data**: Integration with gaming APIs (IGDB, Steam, etc.)

### System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │    │   Firebase       │    │   External APIs │
│                 │    │                  │    │                 │
│ ├─ Components   │◄──►│ ├─ Firestore     │    │ ├─ IGDB API     │
│ ├─ Hooks        │    │ ├─ Auth          │◄──►│ ├─ Steam API    │
│ ├─ Context      │    │ ├─ Storage       │    │ ├─ PlayStation  │
│ ├─ Services     │    │ ├─ Functions     │    │ └─ Xbox API     │
│ └─ Utils        │    │ └─ Hosting       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Database Schema

```
users/
├─ {userId}/
   ├─ profile: { username, email, bio, avatar }
   ├─ stats: { totalGames, avgRating, hoursPlayed }
   └─ privacy: { publicProfile, showActivity }

games/
├─ {gameId}/
   ├─ info: { title, developer, releaseDate, platforms }
   ├─ metadata: { genre, tags, description }
   └─ aggregated: { avgRating, totalReviews, popularity }

reviews/
├─ {reviewId}/
   ├─ userId: string
   ├─ gameId: string
   ├─ rating: number (1-5)
   ├─ content: string
   ├─ timestamp: timestamp
   └─ likes: number

lists/
├─ {listId}/
   ├─ userId: string
   ├─ title: string
   ├─ description: string
   ├─ games: array of gameIds
   ├─ isPublic: boolean
   └─ createdAt: timestamp

userGames/
├─ {userId_gameId}/
   ├─ status: 'played' | 'playing' | 'want-to-play'
   ├─ rating: number (optional)
   ├─ hoursPlayed: number
   ├─ completedAt: timestamp
   └─ platforms: array
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aluxey/PixelBox.git
   cd PixelBox
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_IGDB_API_KEY=your_igdb_api_key
   VITE_STEAM_API_KEY=your_steam_api_key
   ```

4. **Firebase Setup**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase in your project
   firebase init
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Modal, etc.)
│   ├── game/            # Game-specific components
│   ├── user/            # User-related components
│   └── layout/          # Layout components (Header, Sidebar)
├── pages/               # Page components and routing
│   ├── Home/
│   ├── Game/
│   ├── Profile/
│   └── Search/
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   ├── useFirestore.js
│   └── useGameApi.js
├── services/            # External service integrations
│   ├── firebase.js
│   ├── gameApi.js
│   └── storage.js
├── context/             # React context providers
│   ├── AuthContext.js
│   └── ThemeContext.js
├── utils/               # Utility functions
│   ├── helpers.js
│   ├── constants.js
│   └── validators.js
├── styles/              # Global styles and theme
└── assets/              # Static assets
```

## 🔧 Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build locally

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
npm run coverage        # Generate test coverage report

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
npm run format          # Format code with Prettier

# Firebase
npm run deploy          # Deploy to Firebase
npm run deploy:hosting  # Deploy only hosting
npm run deploy:functions # Deploy only functions
```

## 🔒 Security & Privacy

- **Authentication**: Secure user authentication via Firebase Auth
- **Data Validation**: Client and server-side validation for all inputs
- **Privacy Controls**: Users can control visibility of their profiles and activity
- **Rate Limiting**: API rate limiting to prevent abuse
- **Content Moderation**: Community reporting and automated content filtering

## 📊 Performance

### Optimization Strategies

- **Code Splitting**: Lazy loading of routes and components
- **Image Optimization**: WebP format with fallbacks, lazy loading
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Aggressive caching of game data and user content
- **PWA Features**: Service worker for offline functionality

### Monitoring

- Firebase Analytics for user behavior insights
- Performance monitoring with Firebase Performance
- Error tracking and logging
- Real-time database performance metrics

## 🤝 Contributing

### Ways to Contribute

- 🐛 Report bugs via GitHub Issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- 🎨 Contribute to UI/UX design

## 🚀 Deployment

### Production Deployment

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
```

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Letterboxd](https://letterboxd.com/) for the inspiration

---

**Built with ❤️ for the gaming community**
