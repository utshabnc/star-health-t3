The StaticAndAPIFiles folder contains backups of the scripts to be used with the API and to process the data statically. 

data.json contains a copy of the CSV data pulled from the site and converted into json with an online converter.

The processJSONStaticScript.jsx file converts the data.json file to the format used by the react components. Rename the extension to .jsx and run the script in the command line with the following 
command in order to structure this data. Be sure it is renamed to .jsx and not .tsx. The data will be stored in a file called processedData.json. after this file is created, copy it to the HospitalOwners 
folder. 

processJSONModuleStatic.txt is a copy of the code to present the data stored in process data that json to the react components. To render the components from the 
static files, copy this file to the HospitalOwners folder and rename it processJSON.tsx. 

processJSONModuleAPI.txt is a copy of the code to present the data from the API. To render the components from the API data, copy this file to the HospitalOwners 
folder and rename it processJSON.tsx

Update Static Data:
Complete steps 1 through 5 in the Convert to Static Data Section.

Convert to Static Data:
1: Download the CSV file from the site
2: Use the online converter at https://csv.keyangxiang.com/to convert the CSV to a json format.
3: Rename the json file data.json and place it in the folder /src/components/HospitalOwners/StaticAndAPIFiles/
4: At the command line, run node ./src/components/HospitalOwners/StaticAndAPIFiles/processJSONStatic.jsx to create the file processedData.json.
5: Copy processedData.json to the HospitalOwners folder.
6: Copy the file at StaticAndAPIFiles/processJSONModuleStatic.tsx to the HospitalOwners folder and rename it processJSON.tsx.

Convert to API data:
1: Copy the file at StaticAndAPIFiles/processJSONModuleAPI.txt to the HospitalOwners folder and rename it processJSON.tsx.
2: To finalize, delete the StaticAndAPIFiles folder and processedData.json from the hospital owners folder.


Warnings:
you will get errors if:
1: you forget to rename the backup files to a .txt extension
2: unneeded large files are not erased, eg. the data.json file.
