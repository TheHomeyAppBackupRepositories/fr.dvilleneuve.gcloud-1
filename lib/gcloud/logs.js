"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloudLogs = void 0;
const logging_1 = require("@google-cloud/logging");
class GCloudLogs {
    constructor(projectId, serviceAccount) {
        this.logging = new logging_1.Logging({
            projectId: projectId,
            credentials: serviceAccount
        });
    }
    async pushLog(logger, severity, text) {
        const log = this.logging.log(logger);
        await log.write(log.entry({
            severity: severity,
        }, text));
    }
}
exports.GCloudLogs = GCloudLogs;
