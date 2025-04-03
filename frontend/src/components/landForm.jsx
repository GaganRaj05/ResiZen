import { useState } from "react";
import "../assets/styles/LandForm.css"; 
import { uploadLand } from "../services/admin";
function LandForm() {
    const [formData, setFormData] = useState({
        price: "",
        description: "",
        address: "",
        propertyType: "",
        district: "",
        state: "",
        images: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length < 6 ) {
            setError("You must upload at least 6 images.");
            return;
        }
        if (files.length > 6 ) {
            setError("You must upload  6 images.");
            return;
        }

        
        
        setError("");
        setFormData({ ...formData, images: files });
        setPreviewImages(files.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        if (formData.images.length !== 6) {
            setError("Please upload exactly 6 images before submitting.");
            setIsSubmitting(false);
            return;
        }
    
        const data = new FormData();
        data.append("address", formData.address);
        data.append("offering_price", formData.price);
        data.append("description", formData.description);
        data.append("district", formData.district);
        data.append("state", formData.state);
    
        formData.images.forEach((image) => {
            data.append("image", image); 
        });
    
        try {
            const response = await uploadLand(data);
            setIsSubmitting(false);
    
            if (response.error) {
                setError(response.error === "Failed to fetch" ? "Some error occurred. Please try again later." : response.error);
                return;
            }
    
            alert("Land uploaded successfully!");
    
            setFormData({
                price: "",
                description: "",
                address: "",
                propertyType: "",
                district: "",
                state: "",
                images: []
            });
            setPreviewImages([]);
            setError("");
    
        } catch (error) {
            setError("An error occurred. Please try again later.");
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="land-form-container">
            <h2>Add Land Form</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />

                <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
                {error && <p className="error-message">{error}</p>}

                <div className="preview-container">
                    {previewImages.map((image, index) => (
                        <img key={index} src={image} alt={`Preview ${index}`} />
                    ))}
                </div>

                <button disabled={isSubmitting} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LandForm;
