# rateMyCourse
##########################################################################################################
RUNNING APP FOR THE FIRST TIME:

To Start
    npm start
This will start the server
Requries that there exist a directory ./dist and a databass(data.db) in /dist before starting

Create a test database using 
    npm run makeTestDb
This will create a small database of trucks and default reviews to view.
Make sure there exist a directory /dist within the main directory before running this function



##########################################################################################################
VIEW TRUCK REVIEWS USING CURL

Through the use of the curl command we can get the html page for any stored truck
    curl -H "Content-Type: application/json" -d "{\"truckname\":\"truck_name_here\"}" http://localhost:3000/getTruckPage

##########################################################################################################

To start


    npx tsc

This uses the configuration file we created in the previous step to determine how to compile the code and where to place the result. In our case, the JavaScript is output to the dist directory.

Run the JavaScript output with node:

    node dist/app.js

If it runs successfully, a message will be logged to the terminal:

    Output
    Express is listening at http://localhost:3000

Now, you can visit http://localhost:3000 in your browser and you should see the message:

    Output
    Hello World!

Data base format
{    
SERIAL foodtruckid int,
food truck name CHAR[25],
rating (out of 5) FLOAT,
cuisine type CHAR[25],
reviews: []
    {
    users Name CHAR[25],
    written review CHAR[250]
    }
    ]
}