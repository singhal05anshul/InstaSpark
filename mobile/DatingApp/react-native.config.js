module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: {
          xcodeprojPath: 'ios/DatingApp.xcodeproj',
          plistPath: 'ios/DatingApp/Info.plist',
        },
      },
    },
  },
  assets: ['./assets/fonts/'], // Register custom fonts
};