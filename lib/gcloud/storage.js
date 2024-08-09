"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloudStorage = void 0;
const storage_1 = require("@google-cloud/storage");
const stream_1 = require("stream");
class GCloudStorage {
    constructor(projectId, serviceAccount) {
        this.storage = new storage_1.Storage({
            projectId: projectId,
            credentials: serviceAccount
        });
    }
    async uploadFile(bucketName, source, destination) {
        const bucket = this.storage.bucket(bucketName);
        console.log(`Uploading file to ${bucketName}/${destination}`);
        if (source instanceof stream_1.PassThrough) {
            return new Promise((resolve, reject) => {
                const file = bucket.file(destination);
                source.pipe(file.createWriteStream())
                    .on('finish', () => {
                    console.log("Finished uploading");
                    resolve(file);
                })
                    .on('error', (err) => {
                    reject(err);
                });
            });
        }
        else {
            const [file, _] = await bucket.upload(source, {
                destination: destination
            });
            return file;
        }
    }
}
exports.GCloudStorage = GCloudStorage;
