import csv
import requests
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables from .env file (for API key security)
load_dotenv()
API_KEY = os.getenv("API_KEY", "zlE8lD3Q0phImhlFOPapdHQEcpOVB6VO2z4z10Fu")  # Fallback if not in .env
BASE_URL = "https://midcdmz.nrel.gov/apps/data_api.pl"  # Replace with actual API endpoint


def fetch_data_from_api(start_date, end_date, output_csv):
    """Fetch data from the API and save it to a CSV file."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",  # Use your API key for authorization
        "Content-Type": "application/json"
    }
    params = {
        "site": "UTPASRL",
    "begin": start_date.replace("-", ""),
    "end": end_date.replace("-", ""),
    }

    print(f"Fetching data from {BASE_URL}...")
    response = requests.get(BASE_URL, headers=headers, params=params)

    if response.status_code == 200:
        print("Data fetched successfully!")
        data = response.json()

        # Save API data to CSV
        with open(output_csv, 'w', newline='') as outfile:
            fieldnames = data[0].keys()  # Assuming the API returns a list of dictionaries
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(data)

        print(f"Data saved to {output_csv}")
    else:
        print(f"Failed to fetch data: {response.status_code} - {response.text}")


def clean_csv(input_file, output_file, excluded_dates, excluded_columns):
    """Process CSV data, removing unwanted rows and columns."""
    with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.DictReader(infile)
        # Remove excluded columns
        fieldnames = [col for col in reader.fieldnames if col not in excluded_columns]
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        for row in reader:
            # Convert the date string to a datetime object
            record_date = datetime.strptime(row['DATE (MM/DD/YYYY)'], '%m/%d/%Y')

            # Skip rows within the excluded date range
            if excluded_dates[0] <= record_date <= excluded_dates[1]:
                continue

            # Write only the filtered rows with desired columns
            filtered_row = {key: row[key] for key in fieldnames}
            writer.writerow(filtered_row)

    print(f"Cleaned data saved to {output_file}")


if __name__ == "__main__":
    # Example usage: Fetch and clean data
    raw_file = "raw_data.csv"  # Temporary raw data file from API
    cleaned_file = "cleaned_data.csv"  # Final cleaned data file

    # Date range to fetch data
    start_date = "2023-01-01"
    end_date = "2023-01-31"

    # Dates to exclude in cleaning
    excluded_range = (datetime(2023, 10, 3), datetime(2023, 12, 31))  # Adjust as needed
    excluded_columns = ["Avg Direct (stdev) [W/m^2]", "Avg Net (stdev) [W/m^2]"]  # Adjust based on your schema

    # Fetch data from API
    fetch_data_from_api(start_date, end_date, raw_file)

    # Clean the raw data
    clean_csv(raw_file, cleaned_file, excluded_range, excluded_columns)
