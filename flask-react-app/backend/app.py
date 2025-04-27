from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes

DATABASE = 'database/local_data.db'

def query_database(query, args=(), one=False):
    """Helper function to query the database."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    cur = conn.cursor()
    cur.execute(query, args)
    rows = cur.fetchall()
    conn.close()
    return (rows[0] if rows else None) if one else rows

@app.route('/api/data', methods=['GET'])
def get_data():
    """Fetch data with optional filters (date, hour, and irradiance ranges)."""
    date = request.args.get('date')  # Filter by specific date (YYYY-MM-DD)
    hour_cst = request.args.get('hour_cst')  # Filter by specific hour (0-23)
    ghi_min = request.args.get('ghi_min')  # Min Global Horizontal Irradiance
    ghi_max = request.args.get('ghi_max')  # Max Global Horizontal Irradiance

    query = "SELECT * FROM WeatherSolarData"
    filters = []
    args = []

    # Date filter
    if date:
        filters.append("date = ?")
        args.append(date)

    # Hour filter
    if hour_cst:
        filters.append("hour_cst = ?")
        args.append(hour_cst)

    # Global Horizontal Irradiance (GHI) filter
    if ghi_min and ghi_max:
        filters.append("avg_global_horizontal BETWEEN ? AND ?")
        args.extend([ghi_min, ghi_max])
    elif ghi_min:
        filters.append("avg_global_horizontal >= ?")
        args.append(ghi_min)
    elif ghi_max:
        filters.append("avg_global_horizontal <= ?")
        args.append(ghi_max)

    # Combine filters if any
    if filters:
        query += " WHERE " + " AND ".join(filters)


    # Execute query
    try:
        results = query_database(query, args)
        return jsonify([dict(row) for row in results])
    except sqlite3.OperationalError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
