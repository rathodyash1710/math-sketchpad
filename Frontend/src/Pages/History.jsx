
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Historypage = () => {
  const [savedImages, setSavedImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    try {
      const response = await api.get('get-saved-images/');
      const imagesURL = response.data.map((element) => element.image);
      setSavedImages(imagesURL);
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleEditClick = () => {
    if (selectedImage) {
      navigate('/canvas', { state: { image: selectedImage } });
    }
  };
  const handleDeleteClick = () => {

  };

  return (
    <div style={styles.historyPage}>
      <div style={styles.imageGrid}>
        {savedImages ? (
          savedImages.map((image, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_API_URL}${image}`}
              alt={`Saved ${index}`}
              style={{ ...styles.image, border: selectedImage === image ? '4px solid blue' : 'none' }}
              onClick={() => handleImageClick(image)}
            />
          ))
        ) : (
          <h1 style={{ outline: 'auto' }}>No Saved Images</h1>
        )}
      </div>

      <div style={styles.selectedImageContainer}>
        {selectedImage ? (
          <>
            <img
              src={`${import.meta.env.VITE_API_URL}${selectedImage}`}
              alt="Selected"
              style={styles.selectedImage}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={styles.editButton} onClick={handleEditClick}>
                Edit
              </button>
              <button style={styles.editButton} onClick={handleDeleteClick}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <h2>Select an image to edit</h2>
        )}
      </div>
    </div>
  );
};

const styles = {
  historyPage: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 'auto',
    padding: '20px',
  },
  imageGrid: {
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    gap: '20px',
    width: '30%',
  },
  image: {
    height: '150px',
    width: '70%',
    cursor: 'pointer',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  selectedImageContainer: {
    padding: '10px',
    borderLeft: '1.5px solid black',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  selectedImage: {
    height: '300px',
    width: '60%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Historypage;
