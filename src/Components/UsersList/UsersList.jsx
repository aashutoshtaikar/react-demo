import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./UsersList.scss";

export default function UsersList () {

    const [users, setUsers] = useState()
    
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const userData = await response.json();
            setUsers(userData);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <>
            <div className="users">
            {
                users?.map((user)=>(
                    <UserCard user={user} />
                ))
            }
            </div>
        </>

    )
}