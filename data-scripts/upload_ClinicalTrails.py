import requests
import psycopg2
from psycopg2 import sql
from sqlalchemy import create_engine
import pandas as pd
import re
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
CREATE TABLE IF NOT EXISTS "ClinicalTrials" (
    ID uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    BRIEF_TITLE TEXT,
    CENTRAL_CONTACTNAME TEXT,
    COMPLETION_DATE TEXT,
    GENDER TEXT,
    HEALTHY_VOLUNTEERS TEXT,
    OFFICIAL_TITLE TEXT,
    ORG_FULL_NAME TEXT,
    OVERALL_OFFICIAL_NAME TEXT,
    MAXIMUM_AGE TEXT,
    MINIMUM_AGE TEXT,
    NCTID TEXT,
    OVERALL_STATUS TEXT,
    START_DATE TEXT
);
'''

# Get all data by paginating the API

cursor.execute(create_table_sql)
clinicalTrialsQueryURL = "https://clinicaltrials.gov/api/query";
fields = "BriefTitle,CentralContactName,CompletionDate,Gender,HealthyVolunteers,OfficialTitle,OrgFullName,OverallOfficialName,MaximumAge,MinimumAge,NCTId,OverallStatus,StartDate"
url= clinicalTrialsQueryURL+'/study_fields?min_rnk=1&max_rnk=100&fmt=json&fields='+fields

response = requests.get(url)
data = response.json()
print(data['StudyFieldsResponse']['StudyFields'][0])

csv_filename = "ClinicalTrials.csv"
all_data= data['StudyFieldsResponse']['StudyFields']
with open(csv_filename, "w", newline='' , encoding='utf-8') as csv_file:
    fieldnames =  list(all_data[0].keys())[1:]  
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()

    for item in all_data:
        # item["updated_dt"] = re.sub(',',' ',item["updated_dt"] )
        for i in item:
          print(item)
          if isinstance(item[i],list):
            if len(item[i])>0:
              item[i]=item[i][0]
              item[i]= re.sub(',',' ',item[i])
            else:
              item[i]=''
        print(item)
        csv_writer.writerow({key: item[key] for key in fieldnames})
# Use the COPY command to import data from CSV
with open(csv_filename, "r") as csv_file:
    next(csv_file)  # Skip header
    cursor.copy_expert('COPY "ClinicalTrials" (brief_title ,central_contactname ,completion_date ,gender ,healthy_volunteers ,official_title ,org_full_name ,overall_official_name ,maximum_age ,minimum_age ,nctid ,overall_status ,start_date ) FROM STDIN WITH CSV', csv_file)
# Cleanup
cursor.close()
conn.close()
os.remove(csv_filename)

print("Data has been bulk imported into the PostgreSQL table 'ClinicalTrials'.")
# Execute the CREATE TABLE statement
print(all_data[0])


