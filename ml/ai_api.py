from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib


# ==========================================
# 1. CREATE FLASK APP
# ==========================================

app = Flask(__name__)
CORS(app)


# ==========================================
# 2. LOAD TRAINED ML MODEL
# ==========================================

import os

model_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "complaint_category_model.pkl"
)

print("Loading model from:", model_path)

model = joblib.load(model_path)

print("AI model loaded successfully! ✅")

print("AI model loaded successfully! ✅")


# ==========================================
# 3. HOME ROUTE
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "CampusCare AI API is running! 🤖"
    })


# ==========================================
# 4. PREDICTION ROUTE
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        complaint_text = data.get("text", "").strip()

        if not complaint_text:
            return jsonify({
                "message": "Complaint text is required"
            }), 400


        # ==========================================
        # PREDICT CATEGORY
        # ==========================================

        prediction = model.predict(
            [complaint_text]
        )[0]


        # ==========================================
        # CALCULATE CONFIDENCE
        # ==========================================

        probabilities = model.predict_proba(
            [complaint_text]
        )[0]

        confidence = max(probabilities) * 100


        # ==========================================
        # RETURN RESULT
        # ==========================================

        return jsonify({
            "complaint": complaint_text,
            "predictedCategory": prediction,
            "confidence": round(confidence, 2)
        })


    except Exception as error:

        return jsonify({
            "message": "Prediction failed",
            "error": str(error)
        }), 500


# ==========================================
# 5. START SERVER
# ==========================================

if __name__ == "__main__":
    print("Starting CampusCare AI API...")
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)