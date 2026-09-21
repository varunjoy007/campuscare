import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

import joblib


# ==========================================
# 1. LOAD DATASET
# ==========================================

data = pd.read_csv("dataset.csv")

print("Dataset loaded successfully!")
print("Total complaints:", len(data))


# ==========================================
# 2. DISPLAY CATEGORIES
# ==========================================

print("\nCategories:")
print(data["category"].value_counts())


# ==========================================
# 3. SPLIT DATA
# ==========================================

X = data["text"]
y = data["category"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
    stratify=y
)


# ==========================================
# 4. CREATE ML PIPELINE
# ==========================================

model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            ngram_range=(1, 2)
        )
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000
        )
    )
])


# ==========================================
# 5. TRAIN MODEL
# ==========================================

print("\nTraining model...")

model.fit(X_train, y_train)

print("Model training completed!")


# ==========================================
# 6. TEST MODEL
# ==========================================

y_pred = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nModel Accuracy:")
print(f"{accuracy * 100:.2f}%")


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# ==========================================
# 7. SAVE MODEL
# ==========================================

joblib.dump(
    model,
    "complaint_category_model.pkl"
)

print(
    "\nModel saved as: complaint_category_model.pkl"
)


# ==========================================
# 8. TEST SAMPLE COMPLAINTS
# ==========================================

sample_complaints = [
    "The Wi-Fi is not working in my classroom",
    "My exam hall ticket is not available",
    "The hostel bathroom needs repair",
    "The classroom fan is not working",
    "The library computer is not working"
]

print("\nSample Predictions:")

for complaint in sample_complaints:

    prediction = model.predict(
        [complaint]
    )[0]

    print(f"\nComplaint: {complaint}")
    print(f"Predicted Category: {prediction}")