from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to talk to backend

@app.route('/api/weather', methods=['GET'])
def get_weather():
    return jsonify({"message": "Weather data will go here!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)