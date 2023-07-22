import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './MyNotes.styles.scss';
// import firebase from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';



const MyNotes = () => {
    const user = useContext(AuthContext);


    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        // Fetch PDFs from Firebase Storage
    const fetchPdfs = async () => {
        const storageRef = firebase.storage().ref();
        const pdfsFolderRef = storageRef.child('MyNotes'); // Replace 'MyNotes' with the correct path to your PDFs folder in Firebase Storage
  
        try {
          const pdfFiles = await pdfsFolderRef.listAll();
          const pdfList = await Promise.all(
            pdfFiles.items.map(async (item) => {
              const url = await item.getDownloadURL();
              return { name: item.name, url };
            })
          );
          setPdfs(pdfList);
        } catch (error) {
          console.error('Error fetching PDFs:', error);
        }
      };
  
      fetchPdfs();
    }, []);
  

    const handleDownload = (pdf) => {
        // Create a hidden link and simulate a click to trigger the download.
        const a = document.createElement('a');
        a.href = pdf.url;
        a.download = pdf.name;
        a.click();
    };


    return (<>
        {
            user ?
                <>
                    <div>
                        {pdfs.map((pdf) => (
                            <div key={pdf.name}>
                                <span>{pdf.name}</span>
                                <button onClick={() => handleDownload(pdf)}>Download</button>
                            </div>
                        ))}
                    </div>

                </>

                :

                <>
                    <h1>Please Login To Continue</h1>
                    <button><Link to='/login'>Login</Link></button>
                </>
        }</>);
}

export default MyNotes;