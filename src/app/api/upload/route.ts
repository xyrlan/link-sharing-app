
import ReactS3Client from 'react-aws-s3-typescript'
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';



const s3Client = new ReactS3Client({
    bucketName: 'devlinks-images',
    dirName: '',
    region: 'sa-east-1',
    accessKeyId: '7a8b74bc8b5deca1d3594b5e876054fd6a2933a42477cf6ff377095f1f8b1d1a',
    secretAccessKey: 'I4t2xzi2GhASx4pDXvEbNhyMsTfjtA119K0/uYcJ',
    s3Url: '',
});

export async function POST(request: any) {
    const body = await request.json();
    const file  = body.data;
    console.log(file)
        try {

            if (!file) {
                return new NextResponse("No file provided", { status: 400 });
            }

            // Generate a unique filename for the uploaded image
            const fileName = `${uuidv4()}_${file.name}`;

            // const { url, fields } = await createPresignedPost(s3Client, {
            //     Bucket: AWS_BUCKET_NAME,
            //     Key: fileName,
            //     ContentType: file.type,
            //     Expires: 60, // URL expiration time in seconds
            // });

            const res = await s3Client.uploadFile(file, fileName);

            // Upload the file to S3 using presigned post
            // await fetch(url, {
            //     method: 'POST',
            //     body: file.buffer,
            //     headers: {
            //         'Content-Type': file.type,
            //     },
            // });

            // Return the file key for future reference (e.g., storing in the database)
            return new NextResponse(JSON.stringify({ fileKey: fileName }), { status: 200 });
        } catch (error) {
            console.error('Error uploading image:', error);
            return new NextResponse("Error uploading image", { status: 500 });
        }

    }

   