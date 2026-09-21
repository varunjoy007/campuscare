import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    precision_score,
    recall_score,
    f1_score
)

import joblib
import matplotlib.pyplot as plt


# ==========================================
# 1. LOAD DATASET
# ==========================================

data = pd.read_csv("dataset.csv")

print("Dataset loaded successfully! ✅")
print("Total complaints:", len(data))


# ==========================================
# 2. LOAD TRAINED MODEL
# ==========================================

model = joblib.load("complaint_category_model.pkl")

print("Model loaded successfully! ✅")


# ==========================================
# 3. PREPARE DATA
# ==========================================

X = data["text"]
y = data["category"]


# ==========================================
# 4. SAME TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
    stratify=y
)


# ==========================================
# 5. PREDICT TEST DATA
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# 6. ACCURACY
# ==========================================

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\n==========================================")
print("MODEL EVALUATION")
print("==========================================")

print(f"\nAccuracy: {accuracy * 100:.2f}%")


# ==========================================
# 7. PRECISION
# ==========================================

precision = precision_score(
    y_test,
    y_pred,
    average="weighted",
    zero_division=0
)

print(f"Precision: {precision * 100:.2f}%")


# ==========================================
# 8. RECALL
# ==========================================

recall = recall_score(
    y_test,
    y_pred,
    average="weighted",
    zero_division=0
)

print(f"Recall: {recall * 100:.2f}%")


# ==========================================
# 9. F1 SCORE
# ==========================================

f1 = f1_score(
    y_test,
    y_pred,
    average="weighted",
    zero_division=0
)

print(f"F1-Score: {f1 * 100:.2f}%")


# ==========================================
# 10. CLASSIFICATION REPORT
# ==========================================

print("\n==========================================")
print("CLASSIFICATION REPORT")
print("==========================================")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# ==========================================
# 11. CONFUSION MATRIX
# ==========================================

cm = confusion_matrix(
    y_test,
    y_pred,
    labels=model.classes_
)


print("\n==========================================")
print("CONFUSION MATRIX")
print("==========================================")

print(cm)


# ==========================================
# 12. DISPLAY CONFUSION MATRIX
# ==========================================

plt.figure(figsize=(12, 8))

plt.imshow(cm)

plt.title("CampusCare AI - Confusion Matrix")

plt.xlabel("Predicted Category")

plt.ylabel("Actual Category")

plt.xticks(
    range(len(model.classes_)),
    model.classes_,
    rotation=45,
    ha="right"
)

plt.yticks(
    range(len(model.classes_)),
    model.classes_
)

plt.colorbar()

plt.tight_layout()

plt.savefig(
    "confusion_matrix.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()


# ==========================================
# 13. FINAL SUMMARY
# ==========================================

print("\n==========================================")
print("FINAL MODEL PERFORMANCE")
print("==========================================")

print(f"Accuracy  : {accuracy * 100:.2f}%")
print(f"Precision : {precision * 100:.2f}%")
print(f"Recall    : {recall * 100:.2f}%")
print(f"F1-Score  : {f1 * 100:.2f}%")

print("\nEvaluation completed successfully! 🤖✅")