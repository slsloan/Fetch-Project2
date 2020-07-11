# Secret-Project-2
Take over the world

Team Magma: Calvin Gillam, Sammy Sloan, Will Hitch, and Paul Fidika.


Instructions

First step: do a 'npm install' to install all necessary dependencies.

Second step: create a database named "fetch_db" on your local machine.

Third step: create a '.env' file with all of your database's login info. It should look something like this:

DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=fetch_db
DB_HOST=127.0.0.1

Fourth step: run 'db.sequelize.sync({ force: true })' and this will format the tables in your database. Careful; every time you do this it will drop your previous table and create a new one, erasing all data inside of it.

Fifth step: "seeding"