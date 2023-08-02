




export const s3Config = {
    bucketName: `${process.env.S3_BUCKET_NAME}`,
    // dirName: 'directory-name',      /* Optional */
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    s3Url: `https://${process.env.BUCKET_NAME}/` /* Optional */
}
