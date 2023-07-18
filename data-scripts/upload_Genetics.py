import requests
import psycopg2
from psycopg2 import sql
from sqlalchemy import create_engine
import pandas as pd
import re
import xml.etree.ElementTree as ET
import json
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
CREATE TABLE IF NOT EXISTS "Genetics" (
    ID uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    NAME TEXT,
    URL TEXT
);
'''
cursor.execute(create_table_sql)

geneticsURL = 'https://medlineplus.gov/download/TopicIndex.xml';
response = requests.get(geneticsURL)
xml_data = response.content
tree = ET.ElementTree(ET.fromstring(xml_data))
root = tree.getroot()

conditions_topic = root.find('.//topic[@id="Genes"]')
topic_entries = conditions_topic.findall('.//topic')
all_data= []

for topic in topic_entries:
    title = topic.find('title').text
    url = topic.find('url').text
    js= {
        "title":title,
        "url":url
    }
    all_data.append(js)

conditions_topic = root.find('.//topic[@id="Chromosomes"]')
topic_entries = conditions_topic.findall('.//topic')

for topic in topic_entries:
    title = topic.find('title').text
    if len(title)<13:
        title=title.replace("Chromosome ","Chromosome 0")
    url = topic.find('url').text
    js= {
        "title":title,
        "url":url
    }
    all_data.append(js)
print(all_data)
csv_filename = "Genetics.csv"

with open(csv_filename, "w", newline='') as csv_file:
    fieldnames = all_data[0].keys()
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()

    for item in all_data:
        csv_writer.writerow(item)

# Use the COPY command to import data from CSV
with open(csv_filename, "r") as csv_file:
    next(csv_file)  # Skip header
    cursor.copy_expert('COPY "Genetics" (NAME,url) FROM STDIN WITH CSV', csv_file)
# Cleanup
cursor.close()
conn.close()
os.remove(csv_filename)

print("Data has been bulk imported into the PostgreSQL table 'Genetics'.")
# Print the JSON data
# if data:
#     all_data.extend(data)
#     print(len(all_data))
# else:
#     has_data = False
# print(all_data[0])
# csv_filename = "Diseases.csv"