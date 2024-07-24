from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="<password>"
        database="testcases"
    )
    return conn


@app.route('/', methods=['GET'])
def hello():
    return jsonify('Hii, API is working fine')

# Get all test cases
@app.route('/testcases', methods=['GET'])
def get_testcases():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM testcases')
    testcases = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(testcases)

# Update a test case
@app.route('/testcases/<int:id>', methods=['PUT'])
def update_testcase(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    data = request.get_json()
    
    # Assuming the data contains a key 'status' with the new status value
    new_status = data['status']
    
    cursor.execute(
        'UPDATE testcases SET status = %s WHERE id = %s',
        (new_status, id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(debug=True)
