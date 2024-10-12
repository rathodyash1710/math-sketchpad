import React from 'react';

const HelpPage = () => {
  const steps = [
    {
      id: 1,
      title: 'Step 1:',
      description: '',
      image: '/images/register-login.png'
    },
    {
      id: 2,
      title: 'Step 2:',
      description: '',
      image: '/images/browse-products.png'
    },
    {
      id: 3,
      title: 'Step 3: ',
      description: '',
      image: '/images/place-bid.png'
    },
    {
      id: 4,
      title: 'Step 4: ',
      description: '',
      image: '/images/manage-bids.png'
    },
    {
      id: 5,
      title: 'Step 5:',
      description: '',
      image: '/images/review-history.png'
    }
  ];

  const styles = {
    helpPage: {
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
    },
    stepsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    },
    step: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid black',
      padding: '20px'
    },
    descriptionContainer: {
      flex: 1,
      paddingRight: '20px',
    },
    stepImage: {
      width: '300px',
      height: 'auto',
      borderRadius: '8px',
    },
    stepTitle: {
      fontSize: '1.5rem',
      color: '#333',
    },
    stepDescription: {
      fontSize: '1rem',
      color: '#555',
    },
    title: {
      textAlign: 'center',
      marginBottom: '40px',
    }
  };

  return (
    <div style={styles.helpPage}>
      <h1 style={styles.title}>How to Use the Website</h1>
      <div style={styles.stepsContainer}>
        {steps.map(step => (
          <div key={step.id} style={styles.step}>
            <div style={styles.descriptionContainer}>
              <h2 style={styles.stepTitle}>{step.title}</h2>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
            <img src={step.image} alt={step.title} style={styles.stepImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
