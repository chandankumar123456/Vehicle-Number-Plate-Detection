const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        // Access the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                startPredicting(); // Start predicting when the video starts
            })
            .catch((error) => {
                console.error("Error accessing the camera: ", error);
            });

        function startPredicting() {
            setInterval(captureFrame, 2000); // Capture frame every 2 seconds
        }

        async function captureFrame() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        
            context.drawImage(video, 0, 0);
        
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('frame', blob, 'frame.jpg');
        
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    body: formData
                });
        
                if (response.ok) {
                    const imageBlob = await response.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
        
                    const resultImage = document.createElement('img');
                    resultImage.src = imageUrl;
                    resultImage.width = 640; // Set the desired width
                    resultImage.height = 480; // Set the desired height
        
                    document.getElementById('result').innerHTML = ''; // Clear previous results
                    document.getElementById('result').appendChild(resultImage); // Show the predicted image
        
                    console.log('Prediction image displayed'); // Log when image is displayed
                } else {
                    const error = await response.json();
                    document.getElementById('result').textContent = JSON.stringify(error, null, 2);
                    console.error('Error response:', error); // Log the error response
                }
            }, 'image/jpeg');
        }
        