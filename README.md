# Project Documentation

## Overview

This project is a web application that dynamically manages test cases using a React frontend and a Flask backend. The application connects to a MySQL database to retrieve and update test case data in real-time.

## Features

- Display test case data in a tabular format.
- Allow users to update the status and priority of test cases.
- Real-time synchronization with the MySQL database.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Database**: MySQL

## Packages Used

### React.js

- `axios`: Promise-based HTTP client for making API requests.
- `react-icons`: Collection of popular icons as React components.

### Flask

- `Flask`: Lightweight Python web framework.
- `Flask-Cors`: CORS (Cross-Origin Resource Sharing) support for Flask.
- `mysql-connector-python`: MySQL database connector for Python.

## Setup Instructions

### 1. Clone the Repository

```
git clone <repository-url>
cd <repository-folder>

```


2. Setup the MySQL Database
Create the Database:

```
CREATE DATABASE testcases_db;
Create the Table:
```

USE testcases_db;

CREATE TABLE testcases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    testcase_name VARCHAR(255) NOT NULL,
    estimate_time FLOAT NOT NULL,
    module VARCHAR(255) NOT NULL,
    priority ENUM('Low', 'Mid', 'High') NOT NULL,
    status ENUM('PASS', 'FAIL') NOT NULL
);

3. Setting Up the Backend (Flask)
Create a Virtual Environment:
```
python -m venv venv
Activate the Virtual Environment:
```
On Windows:
```
venv\Scripts\activate
```
On macOS/Linux:
```
source venv/bin/activate
```
Install Dependencies:
```
pip install Flask Flask-Cors mysql-connector-python
```
Create app.py File:

Run the Flask Server:
```
python app.py
```

4. Setting Up the Frontend (React)
Navigate to the Frontend Directory:

cd frontend
Install Dependencies:

```
npm install
```
Start the React Development Server:

npm start
5. Accessing the Application
Frontend: Open your browser and navigate to http://localhost:3000 to access the React application.
Backend: The Flask server runs on http://localhost:5000 and handles API requests from the React frontend.

#Conclusion
This project provides a comprehensive example of integrating a React frontend with a Flask backend and a MySQL database. It includes functionality for displaying and updating test case data in real-time. Follow the setup instructions to run the project locally and explore its features.