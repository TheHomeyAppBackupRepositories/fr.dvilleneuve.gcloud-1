"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
class GoogleCloudDevice extends homey_1.default.Device {
    /**
     * onInit is called when the device is initialized.
     */
    async onInit() {
        this.log('GoogleCloudDevice has been initialized');
        this.setUnavailable('GCloud connection not configured yet').catch(this.error);
        this.initGCloud();
    }
    /**
     * onSettings is called when the user updates the device's settings.
     * @param {object} event the onSettings event data
     * @param {object} event.oldSettings The old settings object
     * @param {object} event.newSettings The new settings object
     * @param {string[]} event.changedKeys An array of keys changed since the previous version
     * @returns {Promise<string|void>} return a custom message that will be displayed
     */
    async onSettings({ oldSettings, newSettings, changedKeys, }) {
        this.log("GoogleCloudDevice settings where changed");
        this.initGCloud();
    }
    initGCloud() {
        this.log('Setting up GCloud');
        try {
            const settings = this.getSettings();
            const serviceAccount = JSON.parse(settings.serviceAccount);
            this.myApp().initGCloud(settings.projectId, serviceAccount);
            this.setAvailable().catch(this.error);
        }
        catch (e) {
            this.setUnavailable('Invalid connection information').catch(this.error);
        }
    }
    myApp() {
        return this.homey.app;
    }
}
module.exports = GoogleCloudDevice;
