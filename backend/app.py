from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import os

app = Flask(__name__)
# Enable CORS for frontend interactions
CORS(app)

# Initialize model and encoder
model = RandomForestClassifier(n_estimators=100, random_state=42)
label_encoder = LabelEncoder()

features = [
    'Math_Score', 'Programming_Skill', 'Communication_Skill', 
    'Creativity', 'Logical_Thinking', 'Interest_Tech', 
    'Interest_Design', 'Interest_Business'
]

def train_model():
    """Load dataset and train the Random Forest model on startup."""
    if not os.path.exists('dataset.csv'):
        print("Dataset not found!")
        return False
        
    try:
        df = pd.read_csv('dataset.csv')
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return False
        
    X = df[features]
    y = df['Career']
    
    y_encoded = label_encoder.fit_transform(y)
    model.fit(X, y_encoded)
    print("Model trained successfully with classes:", list(label_encoder.classes_))
    return True

# Train the model when the application starts
train_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received prediction request:", data)
        
        # Extract features from request, default to 50 if missing
        input_features = [
            int(data.get('Math_Score', 50)),
            int(data.get('Programming_Skill', 50)),
            int(data.get('Communication_Skill', 50)),
            int(data.get('Creativity', 50)),
            int(data.get('Logical_Thinking', 50)),
            int(data.get('Interest_Tech', 50)),
            int(data.get('Interest_Design', 50)),
            int(data.get('Interest_Business', 50))
        ]
        
        # Make prediction
        pred_encoded = model.predict([input_features])[0]
        prediction = label_encoder.inverse_transform([pred_encoded])[0]
        
        # Get probabilities
        proba = model.predict_proba([input_features])[0]
        classes = label_encoder.classes_
        
        probabilities = []
        for i, cls in enumerate(classes):
            probabilities.append({
                'career': str(cls),
                'probability': round(float(proba[i]) * 100, 2)
            })
            
        # Sort probabilities descending for the frontend
        probabilities = sorted(probabilities, key=lambda x: x['probability'], reverse=True)
        
        return jsonify({
            'success': True,
            'prediction': str(prediction),
            'probabilities': probabilities
        })
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
        
@app.route('/dataset_info', methods=['GET'])
def dataset_info():
    """Return some basic dataset text/summary for the frontend."""
    if not os.path.exists('dataset.csv'):
         return jsonify({"success": False, "error": "Dataset not found"})
         
    df = pd.read_csv('dataset.csv')
    # Return first 10 rows and length
    records = df.head(10).to_dict(orient='records')
    return jsonify({
        "success": True,
        "total_rows": len(df),
        "features": features,
        "sample": records
    })

if __name__ == '__main__':
    # Do not use debug=True if it causes double-loading when model trains
    app.run(port=5000)
