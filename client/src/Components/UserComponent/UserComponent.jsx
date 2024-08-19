import { useEffect, useState } from "react";

export default function UserComponent ({ userId }) {

    const [user, setUser] = useState()

    useEffect(() => {
        fetchUserData();
    }, [userId]);
    
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`);
            
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const userData = await response.json();
            setUser(userData);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div>
            <h2>{user?.name}</h2>
            {user?.image && <img src={`data:image/jpeg;base64,${user?.image}`} alt={user?.name} />}
            <p>Created At: {new Date(user?.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(user?.updated_at).toLocaleString()}</p>
      </div>
    )
}