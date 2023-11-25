# Getting Started with Create React App

This project depands on the following project : 
1. Java_soap_api : 
    ---------------------------------
    This project is used to get the data from the database and return it as a wsdl file.
    ---------------------------------
    ### How to run the project (Java_soap_api)  
    1. Clone the project
    2. Open the project in your IDE
    3. Create a database in your mysql server with the name "scolarite" and table "etudiants"
    4. Run the project from ServerWS.java
    5. Open the url http://127.0.0.1:8080/scolarite in your browser to see the wsdl file
    6. Now you can test the project in Postman
    ### How to test the project (Java_soap_api) in Chrome
    1. Open the Chrome file location in your computer
    2. Open the file location of the chrome.exe
    3. Open the cmd in this location
    4. Run the command: " chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security 
    5. Or you can run : " chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials"
    6. Note: Dont Browse the internet with this chrome instance because it is not secure
    7. Now you can test the project in Postman
    # How to test the project in Postman
    1. Open the Postman
    2. Import the wsdl file in the postman by adding the url: http://localhost:8080/ws/students.wsdl
    3. You will see the SOAP api in the postman
    4. Now you can test the project



## How to Start the application
1. Run the following command to install all the dependencies
### `npm install`
2. Run the following command to start the application
### `npm start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### IMPORTANT :
### How to test the project in Chrome : - Disable CORS ! -
1. Open the Chrome file location in your computer
2. Open the file location of the chrome.exe
3. Open the cmd in this location
4. Run the command: " chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security 
5. Or you can run : " chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials"
6. Note: Dont Browse the internet with this chrome instance because it is not secure
