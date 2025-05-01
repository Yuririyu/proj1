import csv
import sqlite3
import os
from datetime import datetime

DATABASE = 'C:\Senior_Proj\flask-react-app\backend\database\local_data.db'
CSV_FILE = '20240125.csv'  # Your CSV filename here

def import_csv_to_db():
    """Reads a CSV file and inserts data into the updated WeatherSolarData table."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    with open(CSV_FILE, newline='') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            # Format the date properly (from MM/DD/YYYY → YYYY-MM-DD)
            date_obj = datetime.strptime(row['DATE (MM/DD/YYYY)'], '%m/%d/%Y')
            formatted_date = date_obj.strftime('%Y-%m-%d')

            cursor.execute('''
                INSERT INTO WeatherSolarData (
                    date, hour_cst, avg_global_horizontal, avg_direct_normal,
                    avg_diffuse_horizontal, avg_downwelling_ir, avg_pyrgeometer_net,
                    avg_global_stdev, avg_direct_stdev, avg_diffuse_stdev,
                    avg_ir_stdev, avg_net_stdev, avg_air_temperature,
                    avg_relative_humidity, avg_pressure_mbar
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                formatted_date,
                int(row['HOUR-CST']),
                float(row['Avg Global Horizontal [W/m^2]']),
                float(row['Avg Direct Normal [W/m^2]']),
                float(row['Avg Diffuse Horizontal [W/m^2]']),
                float(row['Avg Downwelling IR [W/m^2]']),
                float(row['Avg Pyrgeometer Net [W/m^2]']),
                float(row['Avg Global (stdev) [W/m^2]']),
                float(row['Avg Direct (stdev) [W/m^2]']),
                float(row['Avg Diffuse (stdev) [W/m^2]']),
                float(row['Avg IR (stdev) [W/m^2]']),
                float(row['Avg Net (stdev) [W/m^2]']),
                float(row['Avg Air Temperature [deg C]']),
                float(row['Avg Relative Humidity [%]']),
                float(row['Avg Pressure [mBar]'])
            ))

    conn.commit()
    conn.close()
    print("Data import complete!")

if __name__ == "__main__":
    import_csv_to_db()