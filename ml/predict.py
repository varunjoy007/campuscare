import joblib
import sys


# ==========================================
# LOAD TRAINED MODEL
# ==========================================

import os

model_path = os.path.join(
    os.path.dirname(__file__),
    "complaint_category_model.pkl"
)

model = joblib.load(model_path)


# ==========================================
# GET COMPLAINT TEXT
# ==========================================

complaint = " ".join(sys.argv[1:])


# ==========================================
# PREDICT CATEGORY
# ==========================================

prediction = model.predict([complaint])[0]


# ==========================================
# PREDICT CONFIDENCE
# ==========================================

probabilities = model.predict_proba([complaint])[0]

confidence = max(probabilities) * 100


# ==========================================
# DISPLAY RESULT
# ==========================================

print("Predicted Category:", prediction)
print(f"Confidence: {confidence:.2f}%")