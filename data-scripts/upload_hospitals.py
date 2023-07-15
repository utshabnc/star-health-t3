import requests
import psycopg2
from psycopg2 import sql
from sqlalchemy import create_engine
import pandas as pd
import re

import requests
import psycopg2
import pandas as pd
import csv
import os


# Connect to PostgreSQL database
connection_string = 'postgresql://postgres3:1549@@21@34.68.1.34:5432/trpcdb'
conn = {
    'dbname': 'trpcdb',
    'user': 'postgres3',
    'password':'1549@@21',
    'port': 5432,
    'host': '34.68.1.34'

}
# engine = create_engine(connection_string)
conn = psycopg2.connect(**conn)
conn.autocommit = True
cursor = conn.cursor()

# Define the CREATE TABLE SQL statement
create_table_sql = '''
CREATE TABLE IF NOT EXISTS "Hospital" (
    ID uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    HOSPITAL_ID TEXT,
    HOSPITAL_ORG_ID TEXT,
    EIN TEXT,
    NAME TEXT,
    NAME_CR TEXT,
    STREET_ADDRESS TEXT,
    CITY TEXT,
    STATE TEXT,
    ZIP TEXT,
    FIPS_STATE_AND_COUNTY_CODE TEXT,
    HOSPITAL_BED_COUNT TEXT,
    CHRCH_AFFL_F TEXT,
    URBAN_LOCATION_F TEXT,
    CHILDREN_HOSPITAL_F TEXT,
    MEMB_COUNC_TEACH_HOSPS_F TEXT,
    MEDICARE_PROVIDER_NUMBER TEXT,
    COUNTY TEXT,
    HOSPITAL_BED_SIZE TEXT,
    UPDATED_DT DATE
);
'''
hospitalsUrl = "https://communitybenefitinsight.org/api/get_hospitals.php";
# Get all data by paginating the API

cursor.execute(create_table_sql)

url_template = "https://data.cms.gov/data-api/v1/dataset/24c8699f-a804-47b7-95fe-8fcb99acb918/data?offset={offset}&size={size}"
page_size = 100
offset = 0
has_data = True
all_data = []

    # Fetch data from API
url = hospitalsUrl.format(offset=offset, size=page_size)
print(url)
response = requests.get(url)
data = response.json()
print(len(data))

if data:
    all_data.extend(data)
    print(len(all_data))
else:
    has_data = False
print(all_data[0])
csv_filename = "Hospitals.csv"

with open(csv_filename, "w", newline='') as csv_file:
    fieldnames = all_data[0].keys()
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()

    for item in all_data:
        item["updated_dt"] = re.sub(',',' ',item["updated_dt"] )

        csv_writer.writerow(item)

print(all_data[0])

# Use the COPY command to import data from CSV
with open(csv_filename, "r") as csv_file:
    next(csv_file)  # Skip header
    cursor.copy_expert('COPY "Hospital" (hospital_id,hospital_org_id,ein,name,name_cr,street_address,city,state,zip,fips_state_and_county_code,hospital_bed_count,chrch_affl_f,urban_location_f,children_hospital_f,memb_counc_teach_hosps_f,medicare_provider_number,county,hospital_bed_size,updated_dt) FROM STDIN WITH CSV', csv_file)
# Cleanup
cursor.close()
conn.close()
os.remove(csv_filename)

print("Data has been bulk imported into the PostgreSQL table 'Hospital'.")
# Execute the CREATE TABLE statement
# cursor.execute(create_table_sql)

