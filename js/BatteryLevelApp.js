import moment from '../node_modules/moment/src/moment';

function formatTime(hours, minutes) {
    return `${hours}:${minutes}`;
}

class BatteryLevelApp {
    constructor(document, navigator) {
        this.navigator = navigator;

        navigator.getBattery().then((battery) => {
            this.percentElement = document.querySelector('#percent');
            this.timeElement = document.querySelector('#remainingTime');
            this.containerElement = document.querySelector('#container');
            this.indicatorElement = document.querySelector('#indicator');

            this.calculate(battery);
            this.addEventListener(battery);
        });
    }

    addEventListener(battery) {
        battery.addEventListener('levelchange', this.calculate(battery));
        battery.addEventListener('chargingchange', this.calculate(battery));
    }

    calculate(battery) {
        const remainingPercent = `${battery.level * 100}%`;
        const charging = battery.charging;

        let remainingTime = null;
        let remainingChargingTime = null;

        if (parseInt(battery.dischargingTime, 10) > 0) {
            const duration = moment.duration(battery.dischargingTime * 1000);
            remainingTime = formatTime(duration.hours(), duration.minutes());
        }

        if (parseInt(battery.chargingTime, 10) > 0) {
            const duration = moment.duration(battery.chargingTime * 1000);
            remainingChargingTime = formatTime(duration.hours(), duration.minutes());
        }

        this.updateDom(remainingPercent, remainingTime, charging, remainingChargingTime);
    }

    updateDom(remainingPercent, remainingTime, isCharging, remainingChargingTime) {
        this.percentElement.textContent = `${remainingPercent} charged`;
        if (remainingTime) {
            this.timeElement.textContent = `${remainingTime} remaining`;
        } else if (isCharging && remainingChargingTime) {
            this.timeElement.textContent = `Currently charging. ${remainingChargingTime} remaining`;
        } else if (isCharging && !remainingChargingTime) {
            this.timeElement.textContent = 'Plugged in.';
        }

        this.indicatorElement.style = `background-position: ${remainingPercent}; width: ${remainingPercent};`;
        this.containerElement.style = `background-position: ${remainingPercent};`;
    }
}

export default BatteryLevelApp;
