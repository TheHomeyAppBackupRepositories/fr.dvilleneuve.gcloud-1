"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloud = void 0;
const logs_1 = require("./logs");
const storage_1 = require("./storage");
class GCloud {
    constructor(projectId, serviceAccount) {
        this.logs = new logs_1.GCloudLogs(projectId, serviceAccount);
        this.storage = new storage_1.GCloudStorage(projectId, serviceAccount);
    }
}
exports.GCloud = GCloud;
