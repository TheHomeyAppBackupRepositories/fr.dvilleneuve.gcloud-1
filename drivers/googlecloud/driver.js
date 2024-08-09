"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const uuid_1 = require("uuid");
class GoogleCloudDriver extends homey_1.default.Driver {
    /**
     * onInit is called when the driver is initialized.
     */
    async onInit() {
        this.log('GoogleCloudDriver has been initialized');
        this.homey.flow.getActionCard('gcloud_logs_pushLog').registerRunListener(async (args, state) => {
            const settings = args.device.getSettings();
            this.myApp().gcloud?.logs.pushLog(args.logger || settings.defaultLogger, args.severity, args.text).catch(this.error);
        });
        this.homey.flow.getActionCard('gcloud_storage_uploadImage').registerRunListener(async (args, state) => {
            const settings = args.device.getSettings();
            const imageToken = args.droptoken;
            this.myApp().gcloud?.storage.uploadFile(args.bucketName || settings.defaultBucketName, await imageToken.getStream(), args.destinationPath).catch(this.error);
        });
    }
    /**
     * onPairListDevices is called when a user is adding a device and the 'list_devices' view is called.
     */
    async onPairListDevices() {
        return [
            {
                name: 'GCloud project',
                data: {
                    id: (0, uuid_1.v4)(),
                },
            },
        ];
    }
    myApp() {
        return this.homey.app;
    }
}
module.exports = GoogleCloudDriver;
