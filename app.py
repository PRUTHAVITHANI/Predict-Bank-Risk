from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
from flask_pymongo import PyMongo
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/germandata"
try:
    mongo = PyMongo(app)
    db = mongo.db
    logging.info("MongoDB connection established successfully.")
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {e}")
    db = None

try:
    model = joblib.load('model.pkl')
    scaler = joblib.load('scaler.pkl')
    logging.info("Model and scaler loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model or scaler: {e}")
    model, scaler = None, None

@app.route('/')
def home():
     return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Model or scaler not loaded properly'}), 500
    if db is None:
        return jsonify({'error': 'Database connection not established'}), 500

    try:
        # Extract form data
        form_data = request.form.to_dict()
        logging.info(f"Form data received: {form_data}")

        # Convert form data to a list of values and then to a numpy array
        features = [int(value) for value in form_data.values()]
        features_array = np.array(features).reshape(1, -1)
        logging.info(f"Features array: {features_array}")

        # Scale the features
        features_scaled = scaler.transform(features_array)
        logging.info(f"Scaled features: {features_scaled}")

        # Make prediction
        prediction = model.predict(features_scaled)
        credit_risk = 'Good' if prediction[0] == 1 else 'Bad'
        logging.info(f"Prediction result: {credit_risk}")

        # Insert user input and prediction into MongoDB
        db.credit.insert_one({
            'input': form_data,
            'prediction': credit_risk
        })
        logging.info("Prediction result inserted into MongoDB successfully.")

        return jsonify({'prediction': credit_risk})
    except Exception as e:
        logging.error(f"Error during prediction or database insertion: {e}")
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True)
