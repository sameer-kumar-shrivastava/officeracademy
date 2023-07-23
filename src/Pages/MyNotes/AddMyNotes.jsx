import React, { useState } from 'react';
import firebase from '../../firebase';
import './AddMyNotes.styles.scss';

const PdfUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`MyNotes/${selectedFile.name}`);
        const uploadTask = fileRef.put(selectedFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get upload progress (percentage)
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Error uploading PDF:', error);
            },
            () => {
                // Upload completed
                setUploadProgress(100);
                setSelectedFile(null);
            }
        );
    };

    return (
        <div className="pdf-upload-container">
            <h2 className="pdf-upload-heading">Upload PDF</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="pdf-upload-input"
            />
            <button onClick={handleUpload} className="pdf-upload-button">
                Upload
            </button>
            {uploadProgress > 0 && uploadProgress < 100 && (
                <p className="pdf-upload-progress">Uploading: {uploadProgress}%</p>
            )}
            {uploadProgress === 100 && (
                <p className="pdf-upload-completed">Upload completed!</p>
            )}
        </div>
    );
};

export default PdfUpload;
