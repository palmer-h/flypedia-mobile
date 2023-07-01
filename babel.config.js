module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '~': './src',
        },
        extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
      },
    ],
  ],
};
