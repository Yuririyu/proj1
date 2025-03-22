import sqlite3
import os

def setup_database():
    # Define the path for the SQLite database
    db_path = os.path.join(os.path.dirname(__file__), "local_data.db")

    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create the main WeatherSolarData table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS WeatherSolarData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year SMALLINT NOT NULL,
            day SMALLINT NOT NULL,  -- Day of the year
            cst SMALLINT NOT NULL,  -- Central Standard Time (Hour of the day)
            cr1000_battery_vdc DECIMAL(5, 2),  -- CR1000 Battery Voltage
            direct_normal_wm2 DECIMAL(6, 2),  -- Direct Normal Irradiance
            direct_stdev_wm2 DECIMAL(6, 2),  -- Standard deviation of Direct Normal Irradiance
            chp1_temp_c DECIMAL(5, 2),  -- CHP1 Temperature in Celsius
            chp1_temp_stdev_c DECIMAL(5, 2),  -- Standard deviation of CHP1 Temperature
            global_horizontal_wm2 DECIMAL(6, 2),  -- Global Horizontal Irradiance
            global_stdev_wm2 DECIMAL(6, 2),  -- Standard deviation of Global Horizontal Irradiance
            diffuse_horizontal_wm2 DECIMAL(6, 2),  -- Diffuse Horizontal Irradiance
            diffuse_stdev_wm2 DECIMAL(6, 2),  -- Standard deviation of Diffuse Horizontal Irradiance
            cr1000_temp_c DECIMAL(5, 2),  -- CR1000 Temperature in Celsius
            downwelling_ir_wm2 DECIMAL(6, 2),  -- Downwelling Infrared Radiation
            ir_stdev_wm2 DECIMAL(6, 2),  -- Standard deviation of Infrared Radiation
            pyrgeometer_net_wm2 DECIMAL(6, 2),  -- Pyrgeometer Net Irradiance
            net_stdev_wm2 DECIMAL(6, 2),  -- Standard deviation of Net Irradiance
            cgr3_temp_c DECIMAL(5, 2),  -- CGR3 Temperature in Celsius
            cgr3_temp_stdev_c DECIMAL(5, 2),  -- Standard deviation of CGR3 Temperature
            air_temperature_c DECIMAL(5, 2),  -- Air Temperature in Celsius
            relative_humidity_percent DECIMAL(5, 2),  -- Relative Humidity (Percentage)
            pressure_mbar DECIMAL(7, 2),  -- Atmospheric Pressure in millibars
            avg_wind_speed_m_s DECIMAL(6, 2),  -- Average Wind Speed (m/s)
            avg_wind_direction_deg DECIMAL(6, 2),  -- Average Wind Direction (degrees)
            peak_wind_speed_m_s DECIMAL(6, 2)  -- Peak Wind Speed (m/s)
        )
    ''')

    # Create composite index for faster queries by year and day
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_year_day
        ON WeatherSolarData (year, day)
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    print("Database setup complete!")

if __name__ == "__main__":
    # Run the setup function to create the database and table
    setup_database()
