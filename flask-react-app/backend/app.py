from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATABASE = 'database/local_data.db'

def query_database(query, args=(), one=False):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(query, args)
    rows = cur.fetchall()
    conn.close()
    return (rows[0] if rows else None) if one else rows

@app.route('/api/data', methods=['GET'])
def get_data():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    hours = request.args.get('hours')
    selected_metric = request.args.get('metric')
    page = int(request.args.get('page', 1))  # Default to page 1
    limit = int(request.args.get('limit', 50))  # Default to 50 results per page

    print(f"Received: start_date={start_date}, end_date={end_date}, hours={hours}, metric={selected_metric}, page={page}, limit={limit}")

    if not start_date:
        return jsonify({"error": "Missing start date parameter."}), 400

    metric_columns = [
        "avg_global_horizontal", "avg_direct_normal", "avg_diffuse_horizontal",
        "avg_downwelling_ir", "avg_pyrgeometer_net", "avg_global_stdev",
        "avg_direct_stdev", "avg_diffuse_stdev", "avg_ir_stdev", "avg_net_stdev"
    ]
    selected_columns = metric_columns if not selected_metric else [selected_metric]

    query = f"SELECT date, hour_cst, {', '.join(selected_columns)} FROM WeatherSolarData"
    filters = []
    args = []

    if start_date and end_date:
        filters.append("date BETWEEN ? AND ?")
        args.extend([start_date, end_date])

    if hours:
        try:
            hour_list = [int(h) for h in hours.split(",") if h.strip()]
            if hour_list:
                filters.append(f"hour_cst IN ({','.join(['?' for _ in hour_list])})")
                args.extend(hour_list)
        except ValueError:
            return jsonify({"error": "Invalid hour format."}), 400

    if filters:
        query += " WHERE " + " AND ".join(filters)

    query += " ORDER BY date, hour_cst LIMIT ? OFFSET ?"
    args.extend([limit, (page - 1) * limit])

    print(f"Final Query: {query}, Arguments: {args}")

    try:
        results = query_database(query, args)
        
        # Format date to "Apr-08-25" style
        formatted_results = [
            {**dict(row), "date": datetime.strptime(row["date"], "%Y-%m-%d").strftime("%b-%d-%y")}
            for row in results
        ]

        return jsonify({
            "data": formatted_results,
            "page": page,
            "limit": limit
        })

    except sqlite3.OperationalError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
