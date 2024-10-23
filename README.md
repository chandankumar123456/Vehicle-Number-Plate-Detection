# Vehicle Number Plate Detection

## Description

This project is a Flask web application that performs vehicle number plate detection using YOLO (You Only Look Once) models. The application allows users to upload images or stream live video for real-time number plate detection.

## Features

- Upload images or stream live video for vehicle number plate detection.
- Display detected number plates on the web interface.
- Responsive design with separate CSS files for home and index pages.

## Tech Stack

- **Backend**: Flask
- **Machine Learning**: YOLOv5 or YOLOv7 (choose based on your implementation)
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Render.com

## Requirements

- Python 3.6 or higher
- Flask
- OpenCV
- NumPy
- YOLOv5 or YOLOv7 (and their dependencies)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/vehicle-number-plate-detection.git
   cd vehicle-number-plate-detection
   ```

2. **Set up a virtual environment** (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:

   ```bash
   python app.py
   ```

5. **Access the application**: Open your browser and navigate to `http://127.0.0.1:5000`.

## Usage

- **Home Page**: Upload an image of a vehicle to detect the number plate.
- **Index Page**: Access the application functionalities and view the results.

## Deployment

To deploy this application on Render:

1. Follow the steps in the [Deployment Guide](#step-1-prepare-your-application).
2. Ensure to configure the necessary environment variables and build commands in Render.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- [YOLO](https://pjreddie.com/darknet/yolo/) for object detection.
- Flask for providing a robust web framework.
