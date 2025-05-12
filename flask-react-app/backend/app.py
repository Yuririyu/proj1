import csv
import json
import pandas as pd
import sqlite3
from flask import Flask, jsonify, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = 'database/local_data.db'

# Define dummy data for fallback when queries return no results
DUMMY_DATA = {
    "date": "2025-01-01",
    "hour_cst": "12:00",
    "avg_global_horizontal": 150.0,
    "avg_direct_normal": 200.0,
    "avg_diffuse_horizontal": 50.0,
    "avg_downwelling_ir": 250.0,
    "avg_pyrgeometer_net": 10.0,
    "avg_global_stdev": 5.0,
    "avg_direct_stdev": 4.0,
    "avg_diffuse_stdev": 3.0,
    "avg_ir_stdev": 2.0,
    "avg_net_stdev": 1.0
}

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
    selected_hours = request.args.get('hours', None)
    selected_metric = request.args.get('metric', None)
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 50))

    query = "SELECT date, hour_cst FROM WeatherSolarData WHERE date BETWEEN ? AND ?"
    params = [start_date, end_date]

    if selected_hours:
        hours_list = selected_hours.split(",")
        query += " AND hour_cst IN ({})".format(",".join(["?" for _ in hours_list]))
        params.extend(hours_list)

    # Define metric columns before using them
    metric_columns = [
        "avg_global_horizontal", "avg_direct_normal", "avg_diffuse_horizontal",
        "avg_downwelling_ir", "avg_pyrgeometer_net", "avg_global_stdev",
        "avg_direct_stdev", "avg_diffuse_stdev", "avg_ir_stdev", "avg_net_stdev"
    ]

    if selected_metric and selected_metric in metric_columns:
        query = query.replace("date, hour_cst", f"date, hour_cst, {selected_metric}")
    else:
        query = query.replace("date, hour_cst", f"date, hour_cst, {', '.join(metric_columns)}")

    # Implement pagination
    query += " ORDER BY date, hour_cst LIMIT ? OFFSET ?"
    params.extend([limit, (page - 1) * limit])

    results = query_database(query, params)

    formatted_results = [dict(row) for row in results] if results else [DUMMY_DATA]

    return jsonify({"data": formatted_results})

@app.route('/api/download_file', methods=['GET'])
def download_file():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    file_format = request.args.get('format', 'csv')
    selected_hours = request.args.get('hours', None)
    selected_metric = request.args.get('metric', None)

    # Define metric columns before using them
    metric_columns = [
        "avg_global_horizontal", "avg_direct_normal", "avg_diffuse_horizontal",
        "avg_downwelling_ir", "avg_pyrgeometer_net", "avg_global_stdev",
        "avg_direct_stdev", "avg_diffuse_stdev", "avg_ir_stdev", "avg_net_stdev"
    ]
    
    query = "SELECT date, hour_cst FROM WeatherSolarData WHERE date BETWEEN ? AND ?"
    params = [start_date, end_date]

    if selected_hours:
        hours_list = selected_hours.split(",")
        query += " AND hour_cst IN ({})".format(",".join(["?" for _ in hours_list]))
        params.extend(hours_list)

    if selected_metric and selected_metric in metric_columns:
        query = query.replace("date, hour_cst", f"date, hour_cst, {selected_metric}")
    else:
        query = query.replace("date, hour_cst", f"date, hour_cst, {', '.join(metric_columns)}")

    results = query_database(query, params)

    formatted_data = [dict(row) for row in results] if results else [DUMMY_DATA]

    # File export logic
    if file_format == "json":
        return Response(json.dumps(formatted_data, indent=4), mimetype="application/json",
                        headers={"Content-Disposition": "attachment; filename=Dataset.json"})

    elif file_format == "xlsx":
        df = pd.DataFrame(formatted_data)
        excel_file = "Dataset.xlsx"
        df.to_excel(excel_file, index=False)
        with open(excel_file, "rb") as file:
            return Response(file.read(), mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            headers={"Content-Disposition": f"attachment; filename={excel_file}"})

    else:  # Default to CSV
        def generate_csv():
            headers = list(formatted_data[0].keys()) if formatted_data else ["date", "hour_cst"]
            yield ",".join(headers) + "\n"
            for row in formatted_data:
                yield ",".join([str(row.get(col, "")) for col in headers]) + "\n"

        return Response(generate_csv(), mimetype="text/csv",
                        headers={"Content-Disposition": "attachment; filename=Dataset.csv"})

if __name__ == '__main__':
    app.run(debug=True)
