import { AppRegistry } from 'react-native';
import App from '../App';

// Register the app for web
AppRegistry.registerComponent('DatingApp', () => App);

// Run the app
AppRegistry.runApplication('DatingApp', {
    rootTag: document.getElementById('root'),
});