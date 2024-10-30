// components/Loading.js
const Loading = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Loading...</h2>
                <div className="loader"></div>
                <style jsx>{`
                    .loader {
                        border: 8px solid #f3f3f3;
                        border-top: 8px solid #3498db;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1.5s linear infinite;
                        margin: 20px auto; /* Centers the loader */
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    h2 {
                        margin: 0;
                        color: #3498db; /* Change the color to match the loader */
                    }
                `}</style>
            </div>
        </div>
    );
};

// Styles for the overlay and container
const styles = {
    overlay: {
        position: 'fixed', // Fixed positioning to cover the entire screen
        top: 0,
        left: 0,
        width: '100%', // Full width
        height: '100%', // Full height
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // Ensure it stays on top of other elements
    },
    container: {
        backgroundColor: '#fff', // White background for the popup
        borderRadius: '8px', // Rounded corners
        padding: '20px', // Padding around the content
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for the popup
        textAlign: 'center', // Center align text
    },
    heading: {
        marginBottom: '20px', // Space between heading and loader
        fontFamily: 'Arial, sans-serif', // Change font family for heading
        fontSize: '24px', // Increase font size for better visibility
    }
};

export default Loading;
