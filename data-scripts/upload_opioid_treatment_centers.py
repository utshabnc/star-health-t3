import requests
import psycopg2
from psycopg2 import sql
from sqlalchemy import create_engine
import pandas as pd

import requests
import psycopg2
import pandas as pd
import csv
import os

# Replace these values with your PostgreSQL database credentials

# Connect to PostgreSQL database
connection_string = CONNECTION_STRING
# engine = create_engine(connection_string)
conn = psycopg2.connect(connection_string)
conn.autocommit = True
cursor = conn.cursor()

# Define the CREATE TABLE SQL statement
create_table_sql = '''
CREATE TABLE IF NOT EXISTS "OpioidTreatment" (
    ID uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    NPI TEXT,
    PROVIDER_NAME TEXT,
    ADDRESS_LINE_1 TEXT,
    ADDRESS_LINE_2 TEXT,
    CITY TEXT,
    STATE TEXT,
    ZIP TEXT,
    MEDICARE_ID_EFFECTIVE_DATE DATE,
    PHONE TEXT
);
'''

# Execute the CREATE TABLE statement
cursor.execute(create_table_sql)

# Get all data by paginating the API
url_template = "https://data.cms.gov/data-api/v1/dataset/24c8699f-a804-47b7-95fe-8fcb99acb918/data?offset={offset}&size={size}"
page_size = 100
offset = 0
has_data = True
all_data = []

while has_data:
    # Fetch data from API
    url = url_template.format(offset=offset, size=page_size)
    print(url)
    response = requests.get(url)
    data = response.json()
    print(len(data))

    if data:
        all_data.extend(data)
        print(len(all_data))
        offset += page_size
        print(page_size)
        print(offset)
    else:
        has_data = False

# # Save data to a CSV file
csv_filename = "OpioidTreatment1.csv"

with open(csv_filename, "w") as csv_file:
    fieldnames = all_data[0].keys()
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()

    for item in all_data:
        item["MEDICARE_ID_EFFECTIVE_DATE"] = pd.to_datetime(item["MEDICARE ID EFFECTIVE DATE"], format="%m/%d/%Y").date()
        csv_writer.writerow(item)

# Use the COPY command to import data from CSV
with open(csv_filename, "r") as csv_file:
    next(csv_file)  # Skip header
    cursor.copy_expert('COPY "OpioidTreatment"(npi, provider_name,address_line_1,address_line_2,city,state,zip,medicare_id_effective_date,phone) FROM STDIN WITH CSV', csv_file)

# Cleanup
cursor.close()
conn.close()
os.remove(csv_filename)

print("Data has been bulk imported into the PostgreSQL table 'OpioidTreatment'.")