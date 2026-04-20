# StudySprint - Smart Study Behavior Tracker

## 1. Problem Statement

College students often study hard but not strategically. They usually do not know:

- Which subject is consuming too much time
- Whether focus quality is improving or dropping
- How mood and distractions affect productivity

StudySprint solves this by combining planning + tracking + behavioral insights in one simple interface.

### Target users

- College students preparing for internal exams, semester exams, and competitive tests

### Why this matters

- Better decisions with data instead of guesswork
- Better time allocation across difficult subjects
- Improved consistency and focus through feedback loops

## 2. Core Features

- Cloud authentication with Firebase (Signup/Login)
- Protected routes for authenticated users only
- Subject Planner with full CRUD (synced to Firestore)
- Session Tracker with full CRUD (synced to Firestore)
- Insights Dashboard with focus, mood, and distraction analytics
- Persistent cloud storage with user data isolation

## 3. React Requirements Coverage

### Core Concepts

- Functional Components
- Props and component composition
- useState for local UI/form state
- useEffect for side effects and synchronization
- Conditional Rendering
- Lists and Keys

### Intermediate Concepts

- Lifting state up (editing mode managed in pages and passed to forms/lists)
- Controlled Components (all forms)
- Routing with React Router
- Context API for auth and global study state

### Advanced Concepts

- useMemo for derived stats, filtered lists, and insights
- useCallback for stable handlers
- useRef for focus management and persistence support
- Lazy loading with React.lazy and Suspense
- Performance optimization using memoized components

## 4. Folder Structure

src/

- components/
- pages/
- hooks/
- context/
- services/
- utils/

## 5. Tech Stack

- React 18 (Vite)
- React Router DOM
- Tailwind CSS
- Firebase Authentication (email/password)
- Firestore Database (cloud-based NoSQL)
- Context API for state management

## 6. Run Locally

1. Install dependencies:
   npm install

2. **Firebase Setup** (Important):
   - See `FIREBASE_SETUP.md` for detailed Firestore rules and configuration
   - Firebase config is already in `src/services/firebase.js`
   - You need to set up Firestore security rules in the Firebase Console

3. Start development server:
   npm run dev

4. Build production bundle:
   npm run build

## 7. Suggested Viva Explanation

- This is not a generic tracker. It focuses on behavioral improvement in studying.
- It combines planning, execution tracking, and recommendation signals.
- It demonstrates complete React fundamentals and intermediate/advanced hooks in a clean architecture.
