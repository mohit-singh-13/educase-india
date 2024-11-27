# School Management API
This project provides an API for managing schools and calculating distances between schools and a user's location. It uses Node.js, Express, Prisma ORM, and MySQL for backend operations. The API allows adding new schools to the database and fetching schools sorted by proximity to the user's location.

## Features
Add a School: Add a school with name, address, latitude, and longitude to the database.\
List Schools: Fetch all schools sorted by their proximity to the user's location (based on latitude and longitude).

## Technologies Used
**Node.js**: JavaScript runtime for the server-side code.\
**Express**: Web framework for building the REST API.\
**Prisma ORM**: ORM for interacting with the MySQL database.\
**MySQL**: Relational database for storing school data.\
**Zod**: A TypeScript-first validation library for request data.

## Installation
1. Clone the Repository\
`git clone https://github.com/yourusername/school-management-api.git`\
`cd school-management-api`

2. Install Dependencies\
`npm install`

3. Configure Prisma\
Update your .env file with the MySQL connection URL and PORT:\
`DATABASE_URL="mysql://user:password@localhost:3306/school_management"`\
`PORT="8080"`

4. Run Prisma Migrations\
To set up the schema in the database, run the following command:\
`npx prisma migrate dev`

5. Start the Server\
`npm start`

## Note on Hosting
This API is hosted on a free instance of Render, which comes with certain limitations. As a result, there may be a delay of 40-50 seconds the first time the data is loaded after 15 minutes of inactivity. This is due to the instance being put to sleep during periods of inactivity, and it needs to be woken up when accessed after this period.

Please bear with us while the instance starts up. Subsequent requests will be faster.