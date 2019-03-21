import { Dimensions, Platform, NativeModules } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Get statusbar height
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

module.exports = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  StatusBarHeight: STATUSBAR_HEIGHT
};
