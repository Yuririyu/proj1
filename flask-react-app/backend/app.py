import csv
import json
import pandas as pd
import sqlite3
from flask import Flask, jsonify, request, Response
from flask_cors import CORS

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
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 50))

    query = "SELECT * FROM WeatherSolarData WHERE date BETWEEN ? AND ? ORDER BY date, hour_cst LIMIT ? OFFSET ?"
    results = query_database(query, [start_date, end_date, limit, (page - 1) * limit])

    formatted_results = [dict(row) for row in results]

    return jsonify({
        "data": formatted_results,
        "page": page,
        "limit": limit
    })

@app.route('/api/download_file', methods=['GET'])
def download_file():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    file_format = request.args.get('format', 'csv')

    query = "SELECT * FROM WeatherSolarData WHERE date BETWEEN ? AND ? ORDER BY date, hour_cst"
    results = query_database(query, [start_date, end_date])

    formatted_data = [dict(row) for row in results]

    # Generate the requested file format
    if file_format == "json":
        return Response(json.dumps(formatted_data, indent=4), mimetype="application/json", headers={"Content-Disposition": "attachment; filename=Dataset.json"})

    elif file_format == "xlsx":
        df = pd.DataFrame(formatted_data)
        excel_file = "Dataset.xlsx"
        df.to_excel(excel_file, index=False)
        with open(excel_file, "rb") as file:
            return Response(file.read(), mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": f"attachment; filename={excel_file}"})

    else:  # Default to CSV
        def generate_csv():
            yield "Date,Hour (CST),Global Horizontal (W/m²),Direct Normal (W/m²),Diffuse Horizontal (W/m²),Downwelling IR (W/m²),Pyrgeometer Net (W/m²),Global Stdev (W/m²),Direct Stdev (W/m²),Diffuse Stdev (W/m²),IR Stdev (W/m²),Net Stdev (W/m²)\n"
            for row in results:
                yield f"{row['date']},{row['hour_cst']},{row['avg_global_horizontal']},{row['avg_direct_normal']},{row['avg_diffuse_horizontal']},{row['avg_downwelling_ir']},{row['avg_pyrgeometer_net']},{row['avg_global_stdev']},{row['avg_direct_stdev']},{row['avg_diffuse_stdev']},{row['avg_ir_stdev']},{row['avg_net_stdev']}\n"

        return Response(generate_csv(), mimetype="text/csv", headers={"Content-Disposition": "attachment; filename=Dataset.csv"})

if __name__ == '__main__':
    app.run(debug=True)
