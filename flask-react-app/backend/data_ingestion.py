import sqlite3
import csv

def ingest_data(csv_file, db_path):
    """Insert cleaned data into the WeatherSolarData table."""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            cursor.execute('''
                INSERT INTO WeatherSolarData (
                    year, day, cst, cr1000_battery_vdc, direct_normal_wm2, direct_stdev_wm2,
                    chp1_temp_c, chp1_temp_stdev_c, global_horizontal_wm2, global_stdev_wm2,
                    diffuse_horizontal_wm2, diffuse_stdev_wm2, cr1000_temp_c, downwelling_ir_wm2,
                    ir_stdev_wm2, pyrgeometer_net_wm2, net_stdev_wm2, cgr3_temp_c, cgr3_temp_stdev_c,
                    air_temperature_c, relative_humidity_percent, pressure_mbar,
                    avg_wind_speed_m_s, avg_wind_direction_deg, peak_wind_speed_m_s
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                int(row['year']), int(row['doy']), int(row['cst']),
                float(row['cr1000_battery_vdc']), float(row['direct_normal_wm2']),
                float(row['direct_stdev_wm2']), float(row['chp1_temp_c']),
                float(row['chp1_temp_stdev_c']), float(row['global_horizontal_wm2']),
                float(row['global_stdev_wm2']), float(row['diffuse_horizontal_wm2']),
                float(row['diffuse_stdev_wm2']), float(row['cr1000_temp_c']),
                float(row['downwelling_ir_wm2']), float(row['ir_stdev_wm2']),
                float(row['pyrgeometer_net_wm2']), float(row['net_stdev_wm2']),
                float(row['cgr3_temp_c']), float(row['cgr3_temp_stdev_c']),
                float(row['air_temperature_c']), float(row['relative_humidity_percent']),
                float(row['pressure_mbar']), float(row['avg_wind_speed_m_s']),
                float(row['avg_wind_direction_deg']), float(row['peak_wind_speed_m_s'])
            ))

    conn.commit()
    conn.close()
    print("Data ingested into WeatherSolarData table.")

if __name__ == "__main__":
    ingest_data("cleaned_data.csv", "database/local_data.db")
