# Matchmaker Mobile App

A modern dating and social connection app built with React Native

![App Preview](screenshots/app-preview.png)

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

Your Name - [@your_twitter](https://twitter.com/your_handle) - your.email@example.com
