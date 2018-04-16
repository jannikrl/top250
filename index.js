import { AppRegistry } from 'react-native';
import App from './app/App';

AppRegistry.registerComponent('top250', () => App);

// React Navigation still uses componentWillMount,
// which is deprecated and shows warnings on screen. 
console.disableYellowBox = true;