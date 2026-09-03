import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Home() {
    const { token } = useAuth();
    return(
        <div className="home-container">
            
        
        </div>
        
    );

}