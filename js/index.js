import BatteryLevelApp from './BatteryLevelApp';

/* global window */
window.addEventListener('load', () => {
    new BatteryLevelApp(window.document, window.navigator);
});
