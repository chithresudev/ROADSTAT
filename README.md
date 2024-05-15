# Capstone Project

install software's:

* visual studio code (https://code.visualstudio.com/download)
* node and npm (https://nodejs.org/en/download)
* mongodb (https://www.mongodb.com/try/download/community)


repo clone steps:

-> create an empty folder

-> in command line, initialize an empty git repository (follow below commands)

- use cd command and change to created project directory/folder loc.
- git init
- git clone https://github.com/Gokaddal/ROADSTAT.git


additional steps :-

-> create api tokens/keys for google maps and open weather

-> create .env file and place below contents

=====

VITE_MONGO_URL = [mongoDB connection URL]

VITE_API_URL = http://localhost:3000/api

VITE_GOOGLE_MAP_API=[api key]

VITE_OPEN_WEATHER_API=[api key]

=====

application exec:

- npm install (will install all dependencies - node modules)
- npm run dev (will start the webapp)


-- connectivity

server.js (database connection and api routes)

vite.config.js (backend server connection - runs on specified port)
