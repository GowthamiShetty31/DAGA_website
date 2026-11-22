
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error, IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app)


# ==========================================
# MYSQL DATABASE CONNECTION
# ==========================================

def get_db_connection():
    try:
        db_password = os.environ.get("DB_PASSWORD")

        if db_password is None:
            print("DB_PASSWORD environment variable is missing.")
            return None

        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password=db_password,
            database="daga_db"
        )

        return connection

    except Error as e:
        print("Database connection error:", e)
        return None


# ==========================================
# HOME API
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "DAGA Backend is running!",
        "status": "success"
    })


# ==========================================
# DATABASE CONNECTION TEST
# ==========================================

@app.route("/api/test-db", methods=["GET"])
def test_db():

    connection = get_db_connection()

    if connection is None:
        return jsonify({
            "message": "Database connection failed"
        }), 500

    connection.close()

    return jsonify({
        "message": "MySQL connected successfully!",
        "database": "daga_db"
    }), 200


# ==========================================
# TOURIST REGISTRATION
# ==========================================

@app.route("/api/tourist/register", methods=["POST"])
def register_tourist():

    data = request.get_json(silent=True) or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")

    if not all([name, email, password]):
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    name = str(name).strip()
    email = str(email).strip().lower()

    if not name or not email or not isinstance(password, str):
        return jsonify({
            "message": "Invalid registration details"
        }), 400

    if len(password) < 8:
        return jsonify({
            "message": "Password must contain at least 8 characters"
        }), 400

    connection = get_db_connection()

    if connection is None:
        return jsonify({
            "message": "Database connection failed"
        }), 500

    cursor = None

    try:
        cursor = connection.cursor()

        hashed_password = generate_password_hash(password)

        cursor.execute(
            """
            INSERT INTO tourists
            (name, email, password, phone)
            VALUES (%s, %s, %s, %s)
            """,
            (name, email, hashed_password, phone)
        )

        connection.commit()

        return jsonify({
            "message": "Tourist registered successfully!"
        }), 201

    except IntegrityError:
        connection.rollback()

        return jsonify({
            "message": "This email is already registered"
        }), 409

    except Error as e:
        connection.rollback()
        print("Tourist registration error:", e)

        return jsonify({
            "message": "Tourist registration failed"
        }), 500

    finally:
        if cursor:
            cursor.close()

        connection.close()


# ==========================================
# TOURIST LOGIN
# ==========================================

@app.route("/api/tourist/login", methods=["POST"])
def login_tourist():

    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    email = str(email).strip().lower()

    connection = get_db_connection()

    if connection is None:
        return jsonify({
            "message": "Database connection failed"
        }), 500

    cursor = None

    try:
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT id, name, email, password
            FROM tourists
            WHERE email = %s
            """,
            (email,)
        )

        tourist = cursor.fetchone()

        if tourist and check_password_hash(
            tourist["password"], password
        ):

            return jsonify({
                "message": "Login successful!",
                "user_type": "tourist",
                "id": tourist["id"],
                "name": tourist["name"],
                "email": tourist["email"]
            }), 200

        return jsonify({
            "message": "Invalid email or password"
        }), 401

    except Error as e:
        print("Tourist login error:", e)

        return jsonify({
            "message": "Login failed"
        }), 500

    finally:
        if cursor:
            cursor.close()

        connection.close()


# ==========================================
# BUSINESS OWNER REGISTRATION
# ==========================================

@app.route("/api/business/register", methods=["POST"])
def register_business():

    data = request.get_json(silent=True) or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    business_name = data.get("business_name")

    if not all([name, email, password]):
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    name = str(name).strip()
    email = str(email).strip().lower()

    if not name or not email or not isinstance(password, str):
        return jsonify({
            "message": "Invalid registration details"
        }), 400

    if len(password) < 8:
        return jsonify({
            "message": "Password must contain at least 8 characters"
        }), 400

    connection = get_db_connection()

    if connection is None:
        return jsonify({
            "message": "Database connection failed"
        }), 500

    cursor = None

    try:
        cursor = connection.cursor()

        hashed_password = generate_password_hash(password)

        cursor.execute(
            """
            INSERT INTO business_owners
            (name, email, password, phone, business_name)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                name,
                email,
                hashed_password,
                phone,
                business_name
            )
        )

        connection.commit()

        return jsonify({
            "message": "Business owner registered successfully!"
        }), 201

    except IntegrityError:
        connection.rollback()

        return jsonify({
            "message": "This email is already registered"
        }), 409

    except Error as e:
        connection.rollback()
        print("Business registration error:", e)

        return jsonify({
            "message": "Business registration failed"
        }), 500

    finally:
        if cursor:
            cursor.close()

        connection.close()


# ==========================================
# BUSINESS OWNER LOGIN
# ==========================================

@app.route("/api/business/login", methods=["POST"])
def login_business():

    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    email = str(email).strip().lower()

    connection = get_db_connection()

    if connection is None:
        return jsonify({
            "message": "Database connection failed"
        }), 500

    cursor = None

    try:
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT id, name, email, password, business_name
            FROM business_owners
            WHERE email = %s
            """,
            (email,)
        )

        business = cursor.fetchone()

        if business and check_password_hash(
            business["password"], password
        ):

            return jsonify({
                "message": "Login successful!",
                "user_type": "business_owner",
                "id": business["id"],
                "name": business["name"],
                "email": business["email"],
                "business_name": business["business_name"]
            }), 200

        return jsonify({
            "message": "Invalid email or password"
        }), 401

    except Error as e:
        print("Business login error:", e)

        return jsonify({
            "message": "Login failed"
        }), 500

    finally:
        if cursor:
            cursor.close()

        connection.close()


# ==========================================
# RUN FLASK SERVER
# ==========================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
