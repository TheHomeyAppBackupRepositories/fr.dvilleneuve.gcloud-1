"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloudApp = void 0;
const homey_1 = __importDefault(require("homey"));
const gcloud_1 = require("./lib/gcloud/gcloud");
class GCloudApp extends homey_1.default.App {
    /**
     * onInit is called when the app is initialized.
     */
    async onInit() {
        this.log('GCloudApp has been initialized');
    }
    initGCloud(projectId, serviceAccount) {
        this.gcloud = new gcloud_1.GCloud(projectId, serviceAccount);
    }
}
exports.GCloudApp = GCloudApp;
module.exports = GCloudApp;
