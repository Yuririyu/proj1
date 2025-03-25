from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

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
    """Fetch data with optional filters (year, day)."""
    year = request.args.get('year')
    doy = request.args.get('day')

    # Base query
    query = "SELECT * FROM WeatherSolarData"
    filters = []
    args = []

    # Add filters if provided
    if year:
        filters.append("year = ?")
        args.append(year)
    if doy:
        filters.append("day = ?")
        args.append(doy)

    if filters:
        query += " WHERE " + " AND ".join(filters)

    # Execute query
    results = query_database(query, args)
    return jsonify([dict(row) for row in results])

if __name__ == '__main__':
    app.run(debug=True)
