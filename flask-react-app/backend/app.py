from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS
from datetime import datetime

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
    """Fetch data with optional filters (date range, hour, and irradiance ranges)."""
    start_date = request.args.get('start_date')  # Beginning of the week
    end_date = request.args.get('end_date')  # End of the week
    hour_cst = request.args.get('hour_cst')  # Filter by specific hour (0-23)
    ghi_min = request.args.get('ghi_min')  # Min Global Horizontal Irradiance
    ghi_max = request.args.get('ghi_max')  # Max Global Horizontal Irradiance

    # Require at least a start date to prevent returning all data
    if not start_date:
        return jsonify({"error": "Please provide a start date to fetch data."}), 400

    query = """
    SELECT date, hour_cst, avg_global_horizontal, avg_direct_normal,
    avg_diffuse_horizontal, avg_downwelling_ir, avg_pyrgeometer_net,
    avg_global_stdev, avg_direct_stdev, avg_diffuse_stdev,
    avg_ir_stdev, avg_net_stdev
    FROM WeatherSolarData
    """


    filters = []
    args = []

    # Apply date range filter
    if start_date and end_date:
        filters.append("date BETWEEN ? AND ?")
        args.extend([start_date, end_date])
    
    # Apply existing filters
    if hour_cst:
        filters.append("hour_cst = ?")
        args.append(hour_cst)
    if ghi_min and ghi_max:
        filters.append("avg_global_horizontal BETWEEN ? AND ?")
        args.extend([ghi_min, ghi_max])
    elif ghi_min:
        filters.append("avg_global_horizontal >= ?")
        args.append(ghi_min)
    elif ghi_max:
        filters.append("avg_global_horizontal <= ?")
        args.append(ghi_max)

    # Combine filters
    if filters:
        query += " WHERE " + " AND ".join(filters)

    # Execute query
    try:
        results = query_database(query, args)

        # Format date for readability & remove unwanted fields
        formatted_results = [
            {**dict(row), "date": datetime.strptime(row["date"], "%Y-%m-%d").strftime("%B %d, %Y")}
            for row in results
        ]

        return jsonify(formatted_results)
    except sqlite3.OperationalError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
