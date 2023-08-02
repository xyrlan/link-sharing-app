"use client"

import "@uploadthing/react/styles.css";

import React from 'react'
import { UploadButton } from '@/utils/uploadthings'

export default function UploadButtonPage() {
    return (
        <UploadButton endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }} />
    )
}
