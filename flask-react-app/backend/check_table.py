import sqlite3

DATABASE = 'C:\Senior_Proj\flask-react-app\backend\database\local_data.db'

def check_data():
    """Check if data exists in the WeatherSolarData table."""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Query the table
        cursor.execute("SELECT * FROM WeatherSolarData LIMIT 10")
        rows = cursor.fetchall()

        if rows:
            print("Data exists in the WeatherSolarData table:")
            for row in rows:
                print(row)
        else:
            print("No data found in the WeatherSolarData table.")

        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    check_data()