import React,{useContext} from "react";
import { AuthContext } from "../../AuthContext";
import './Home.styles.scss';

const Home = () => {
    const user = useContext(AuthContext);
    // const authContext = useContext(AuthContext);

        return (
        <>
           {user? <h1> Heyyy {user.displayName}</h1> : <h1>Heyyyyyy Helllo</h1>} 
            
    
        </>
    );
}

export default Home;