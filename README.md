# Developer README - SYNC App

This document provides essential information for developers working on the SYNC mobile application. It focuses on the internal architecture, data flow, and conventions to aid in development and debugging.

## Directory Structure

The project follows a standard React Native (Expo) structure with some key directories:

-   **/api/**: Contains API interaction logic.
    -   `api.js`: Actual API calls to the backend using Axios. Handles token management.
    -   `mockApi.js`: Mock implementations of API calls for offline development.
    -   `storage.ts`: Abstraction for secure local storage (using MMKV) for tokens.
-   **/app/**: Contains all screen components, organized by route. This is the primary working directory for UI development, using Expo Router's file-based routing.
    -   `_layout.tsx`: Defines the main stack navigator and global providers like ThemeProvider.
    -   `index.tsx`: The initial landing screen of the app.
    -   Other `.tsx` files represent individual screens (e.g., `login.tsx`, `dashboard.tsx`, `profile.tsx`).
-   **/assets/**: Static assets like fonts, icons, and images.
-   **/components/**: Reusable UI components used across multiple screens (e.g., custom buttons, input fields, list items).
-   **/constants/**: Global constants.
    -   `Colors.ts`: Defines a color palette. (Note: `theme.js` at the root is also used for theming with styled-components, which might be a point of consolidation).
-   **/hooks/**: Custom React hooks (e.g., `useThemeColor.ts`).
-   **/theme.js**: Defines the theme (colors, fonts, font sizes) used by `styled-components`.
-   **/types.ts**: Contains TypeScript type definitions used throughout the application.
-   **/questions.js**: Contains questions for the personality test.

## Route Hierarchy

Routing is managed by `expo-router`. The main navigation is defined in `app/_layout.tsx` as a stack navigator. Key routes include:

-   `/` (app/index.tsx): Initial screen with Login/Register options.
-   `/login` (app/login.tsx): User login screen.
-   `/register` (app/register.tsx): User registration screen.
-   Profile Creation Flow:
    -   `/personalData` (app/personalData.tsx)
    -   `/aboutYou` (app/aboutYou.tsx)
    -   `/yourProfile` (app/yourProfile.tsx)
-   Main App Screens (post-login):
    -   `/dashboard` (app/dashboard.tsx): Central hub displaying matches, dates, profile summary.
    -   `/profile` (app/profile.tsx): User's own profile view/edit screen.
    -   `/matchDetails` (app/matchDetails.tsx): Screen to view details of a potential match.
    -   `/availabilitySelection` (app/availabilitySelection.tsx): Screen for user to input their availability for a date.
    -   `/dateDetails` (app/dateDetails.tsx): Screen to view details of a scheduled date.
-   Profile Enrichment Screens (linked from Dashboard or Profile):
    -   `/interests` (app/interests.tsx)
    -   `/astrologicalProfile` (app/astrologicalProfile.tsx)
    -   `/personalityTest` (app/personalityTest.tsx)

Navigation between screens is typically handled using `useRouter()` from `expo-router`.

## Data Flow

1.  **API Interaction**:
    *   All backend API calls are defined in `api/api.js` (or mocked in `api/mockApi.js`).
    *   Uses `axios` for requests.
    *   Authentication tokens (JWT) are managed by helper functions in `api/api.js` and stored securely using `expo-secure-store` via `api/storage.ts`.
2.  **State Management**:
    *   No global state management library (like Redux or Zustand) is currently in use.
    *   Screen-level state is managed using React's `useState` hook.
    *   Data is passed between screens in a sequence (e.g., during profile creation) via navigation parameters.
    *   Fetched data from APIs is typically stored in local component state.
3.  **Data Persistence**:
    *   User authentication tokens are persisted in secure storage.
    *   Other application data is fetched from the backend as needed and not explicitly persisted client-side beyond component state, unless part of a form flow.

## Context/State Logic

-   **ThemeProvider**: `styled-components`' `ThemeProvider` is used at the root in `app/_layout.tsx`, providing the theme defined in `theme.js` to all styled components.
-   **Local State**: Most components and screens manage their own state internally. There's no overarching custom context for global application state observed.

## External Integrations & Dependencies

-   **Backend API**: The app communicates with a custom backend (assumed to be at `http://10.0.2.2:3000/api` as per `api/api.js`).
-   **`axios`**: For making HTTP requests to the backend.
-   **`expo-secure-store` (via `react-native-mmkv` in `api/storage.ts`)**: For securely storing authentication tokens.
-   **`expo-router`**: For file-system based routing and navigation.
-   **`styled-components`**: For styling UI components.
-   **`react-native-image-picker`**: For selecting images from the device gallery (used in profile picture upload).
-   **`react-native-date-picker` / `@react-native-community/datetimepicker` / `react-native-modal-datetime-picker`**: Various libraries for date and time selection.
-   **`@react-native-picker/picker`**: For dropdown selection.
-   **`react-native-google-places-autocomplete`**: Listed in dependencies, likely for address input, but its specific usage context needs to be located during detailed component review.

This README should serve as a starting point for developers to navigate the codebase.
