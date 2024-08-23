import { useState } from "react";
import "./UserCard.scss";
import axios from "axios";

const UserCard  = ({user}) => {

    const [userImage, setUserImage] = useState();

    const loadUserImage = async()=>{
        const response = await axios.get(`http://localhost:8080/api/users/images/${user.id}`);
        const imageData = response.data;
        let image = "/src/assets/react.svg";

        if (response.data) {
            image = `data:image/${imageData.image_type};base64,${imageData.image}`;
        }
        setUserImage(image);
    }

    const handleUploadImage = ()=>{

    }
    
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]);
    }

    useState(()=>{
        loadUserImage();
    }, [user])

    return (
        <div className="userCard">
            <h2>{user?.name}</h2>
            <div className="userCard__imgBox">
                <img className="userCard__img" src={userImage} alt={user?.name} />
                <input type="file" onChange={handleFileChange}  />
            </div>

            <button onClick={handleUploadImage}>Upload</button>
        </div>
    )
}

export default UserCard;

