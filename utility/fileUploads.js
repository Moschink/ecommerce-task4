const {readFile} = require("node:fs/promises");
require("dotenv").config();
const{v4} = require("uuid");
const {
    S3Client,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

// const {readFile} = require("node:fs/promises");

const S3 = new S3Client({
    region: "auto",
    endpoint: "https://t3.storage.dev",
    // s3ForcePathStyle: false,
    // credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // },
    // forcePathStyle: false,
});

const uploadFile = async (file) => {
    try {
    const fileName = v4() + "." + file.mimetype.split("/")[1];

    const command = new PutObjectCommand({
        Bucket: "new-product",
        Key: fileName,
        Body: await readFile(file.path)

    });
    const response = await S3.send(command);
    if(response.$metadata.httpStatusCode === 200){
    const fileUploaded = `https://new-product.t3.storage.dev${fileName}`
    return {error: null, fileUploaded};
    } else {
        return error;
    } 
} catch (error) {
    return {
        error,
        fileUploaded: null
    }
}
};
module.exports = uploadFile