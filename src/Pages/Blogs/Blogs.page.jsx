import React,{useContext} from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './Blogs.styles.scss';

const Blogs = () => {
    const user = useContext(AuthContext);

    return(<>
    {
        user? 
        
        <h1>Blogs dekh lo guyzzzzz</h1> 
        
        :
        
        <>
        <h1>Please Login To Continue</h1>
        <button><Link to='/login'>Login</Link></button>        
        </>
    }</>);
}

export default Blogs;