# Matchmaker Mobile App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![React Native](https://img.shields.io/badge/Built%20with-React%20Native-61dafb?logo=react&logoColor=white&style=flat-square)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x+-3178c6?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Android](https://img.shields.io/badge/Android-Supported-3ddc84?logo=android&style=flat-square)](https://developer.android.com/)
[![iOS](https://img.shields.io/badge/iOS-Supported-000?logo=apple&style=flat-square)](https://developer.apple.com/)
[![Expo Ready](https://img.shields.io/badge/Expo-Ready-000020?logo=expo&style=flat-square)](https://expo.dev/)
[![Dark/Light Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-informational?style=flat-square)](#)
[![Astrological Matchmaking](https://img.shields.io/badge/Features-Astrological%20Matchmaking-purple?style=flat-square)](#)

A modern dating and social connection app built with React Native

## Features

- 👤 User profile management with astrological compatibility
- 💌 Real-time matchmaking algorithm
- 📅 Interactive date scheduling with status tracking
- 📊 Compatibility metrics and visualization
- 🎨 Customizable UI component library
- 🌙 Dark/Light mode support

## Key Components

```plaintext
components/
├── AstrologicalItem.tsx    - Displays zodiac compatibility info
├── DatesSection.tsx        - Manages date appointments and status
├── CompletenessBar.tsx     - Shows profile completion progress
├── InterestList.tsx        - Displays user interest categories
├── ProfileImage.tsx        - Circular user profile photo
├── QuestionContainer.tsx   - Interactive compatibility questions
└── ...20+ specialized components
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm/yarn
- React Native CLI
- Android Studio/Xcode (for simulators)

### Installation

```bash
git clone https://github.com/your-username/matchmaker-app.git
cd matchmaker-app
yarn install
```

### Running the App

```bash
# Start Metro bundler
yarn start

# Android
yarn android

# iOS
yarn ios
```

## Configuration

1. Copy `.env.example` to `.env`
2. Add your API endpoints and configuration:
```env
API_BASE_URL=your_api_url_here
WEBSOCKET_URL=your_ws_url_here
GOOGLE_MAPS_API_KEY=your_key_here
```

## Technology Stack

- React Native 0.72+
- TypeScript
- React Navigation 6.x
- Styled Components
- React Hook Form
- Axios for API calls
- react-native-dotenv for environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Nacho - [@nachomartinezl](https://twitter.com/your_handle) - ignaciomartinezlombardero@gmail.com
