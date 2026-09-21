import joblib


# ==========================================
# 1. LOAD TRAINED MODEL
# ==========================================

model = joblib.load("complaint_category_model.pkl")

print("AI Complaint Category Predictor")
print("--------------------------------")
print("Model loaded successfully! ✅")


# ==========================================
# 2. TAKE COMPLAINT FROM USER
# ==========================================

while True:

    complaint = input(
        "\nEnter your complaint (or type 'exit' to stop): "
    )

    if complaint.lower() == "exit":
        print("\nProgram stopped.")
        break

    if not complaint.strip():
        print("Please enter a complaint.")
        continue


    # ==========================================
    # 3. PREDICT CATEGORY
    # ==========================================

    prediction = model.predict([complaint])[0]


    # ==========================================
    # 4. DISPLAY RESULT
    # ==========================================

    print("\nAI Prediction:")
    print("Category:", prediction)