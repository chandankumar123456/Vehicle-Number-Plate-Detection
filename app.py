from flask import Flask, request, jsonify, render_template, send_file
import torch
import cv2
import numpy as np
from PIL import Image
import io
import base64

import os
from dotenv import load_dotenv

load_dotenv()
# Initialize Flask app
app = Flask(__name__)

# Loading YOLOv7 model
model_path = os.getenv('MODEL_PATH', './yolov7/best.pt')
model = torch.hub.load('./yolov7', 'custom', model_path, force_reload=True, trust_repo=True, source='local')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict')
def predict_page():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'frame' not in request.files:
        return jsonify({'error': 'No frame uploaded'}), 400

    file = request.files['frame']
    image = Image.open(file.stream)

    # Predictions
    results = model(image)
    predictions = results.pandas().xyxy[0]

    # Drawing bounding boxes 
    img = np.array(image)
    extracted_text = []
    for _, row in predictions.iterrows():
        x1, y1, x2, y2 = int(row['xmin']), int(row['ymin']), int(row['xmax']), int(row['ymax'])
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

    img_with_boxes = Image.fromarray(img)

    # Save to a BytesIO object
    img_io = io.BytesIO()
    img_with_boxes.save(img_io, 'JPEG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/jpeg')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) 
    app.run(host='0.0.0.0', port=port, debug=True)
