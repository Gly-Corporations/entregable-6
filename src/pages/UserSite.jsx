import axios from "axios";
import { useState } from "react";
import FormData from "form-data";

const UserSite = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    };



    const sendProduct = (image) => {
        const data = new FormData();
        data.append("image", image);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        // Envía la petición HTTP
        axios.post("https://api-ecommerce-production-ca22.up.railway.app/api/v1/product", data, config);
    };


    /* const sendProduct = () => {
        const product = {
            name: "test",
            price: 100,
            description: "test",
            image: file,
        };

        axios.post("https://api-ecommerce-production-ca22.up.railway.app/api/v1/product", product)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    } */

    return (
        <div>
            <input type="file" onChange={e => handleFileChange(e)} />
            <button onClick={() => sendProduct()}>Send</button>
        </div>
    );
}

export default UserSite;