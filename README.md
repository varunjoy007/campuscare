# CampusCare – College Complaint Management System

CampusCare is a full-stack web application designed to help students submit and track college complaints digitally.

The system also uses Machine Learning to automatically predict the complaint category and provide a confidence score.

## 🚀 Features

### 👨‍🎓 Student

- Student registration and login
- Submit complaints
- Select complaint category
- Add complaint description and location
- Set complaint priority
- Upload complaint images
- AI-based complaint category prediction
- AI confidence score
- View submitted complaints
- Track complaint status
- View admin remarks and assigned department

### 👨‍💼 Admin

- Secure admin login
- View all complaints
- View complaint details
- Assign complaints to departments
- Update complaint status
- Add admin remarks
- Monitor complaint information

## 🤖 AI Module

The AI module predicts the category of a complaint using Machine Learning.

### Complaint Categories

- Academic
- Examination
- Library
- Hostel
- Canteen
- Transport
- Infrastructure
- Electrical
- Internet / Wi-Fi
- Cleanliness
- Security

### Machine Learning

- TF-IDF Vectorization
- Logistic Regression
- N-gram range: 1–2
- Scikit-learn
- Joblib

The trained Machine Learning model is exposed through a Flask API.

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

### AI

- Python
- Flask
- Scikit-learn
- Joblib

### Database

- MongoDB Atlas

### Deployment

- Vercel – Frontend
- Render – Backend
- Render – AI API
- MongoDB Atlas – Database

## 📁 Project Structure

```text
complaint-management-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ml/
│   ├── dataset.csv
│   ├── train_model.py
│   ├── test_model.py
│   ├── evaluate_model.py
│   ├── ai_api.py
│   ├── requirements.txt
│   └── complaint_category_model.pkl
│
├── .gitignore
└── README.md

Student
   ↓
Login
   ↓
Submit Complaint
   ↓
AI Category Prediction
   ↓
Complaint Stored in MongoDB
   ↓
Admin Reviews Complaint
   ↓
Department Assignment
   ↓
Status / Remark Update
   ↓
Student Tracks Complaint

Pending
   ↓
Under Review
   ↓
In Progress
   ↓
Resolved
   ↓
Closed

Complaint Title + Description
            ↓
       Flask AI API
            ↓
      TF-IDF Vectorizer
            ↓
   Logistic Regression Model
            ↓
   Predicted Category
            ↓
     Confidence Score