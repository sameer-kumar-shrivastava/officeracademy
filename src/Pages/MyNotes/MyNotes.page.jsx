import React,{useContext} from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './MyNotes.styles.scss';

const MyNotes = () => {
    const user = useContext(AuthContext);

    return(<>
    {
        user? 
        
        <h1>Notes lelo guys</h1> 
        
        :
        
        <>
        <h1>Please Login To Continue</h1>
        <button><Link to='/login'>Login</Link></button>        
        </>
    }</>);
}

export default MyNotes;