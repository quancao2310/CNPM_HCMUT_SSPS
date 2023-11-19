# CNPM_HCMUT_SSPS
Welcome to our HCMUT_SSPS.
<!-- Insert intro pic here -->

## Overview
HCMUT_SSPS is a smart printing service for HCMUT students to use the printing facilities in HCMUT more efficiently. The students can use this system to pre-order their printing needs without having to wait in a line in traditional method. The system also provides a feature of storing your printing information, such as the metadata of the document, amount, date, time, location... of each of your order. Students can then view all the details of their system usage in the history.

The system is managed by the Student Printing Service Officer (SPSO). They are responsible for configuring the system, managing the printers and viewing the statistics and performance of the HCMUT_SSPS. SPSO can also view users' printing history.

## Technology Stack
- Front-end: ReactJS, Bootstrap, and other additional libraries provided by npm.
- Back-end: NodeJS (v20), ExpressJS.
- Database: MySQL.

## Installation
To use the application, you can follow the following steps:

### Clone the repository
Open a terminal at a directory of your choice and enter these commands:
```
  git clone https://github.com/quancao2310/CNPM_HCMUT_SSPS.git
  cd CNPM_HCMUT_SSPS
```
You will see a folder called "CNPM_HCMUT_SSPS", with several subfolders: "client" and "server".

### Install dependencies
First, if you haven't installed [NodeJS](https://nodejs.org/), visit https://nodejs.org/ and download it.

Next, you will have to install all the dependencies of our project. Let's go to the "server" directory first and enter these commands:
```
  cd server
  npm install
```

Then, go to the "client" directory and do the same thing by entering these commands:
```
  cd client
  npm install
```
You have installed all the dependencies.

### Set up a database server
The application will also need a MySQL server for the backend to connect to the database. If your machine does not have any MySQL server, install one of your preference ([MySQL official website](https://www.mysql.com/) or [XAMPP](https://www.apachefriends.org/download.html)). Start the server at port 3306 (this port is mostly chosen by default). Import the file "hcmut_ssps.sql" to initialize the database.
<!-- Create a database called "hcmut_ssps" and add some data to it. -->

You are ready now. Let's start the application.

### Run the application
Start two terminal instances in the "CNPM_HCMUT_SSPS" directory. For the first instance, run these commands:
```
  cd server
  npm start
```

For the second one, run these commands:
```
  cd client
  npm start
```

Now the application should be starting. The ReactJS application will run on http://localhost:3000 and the Express application will run on http://localhost:8080. Good luck and have fun!

## Contributor
This project is developed by a group of Computer Science students from Ho Chi Minh University of Technology (HCMUT). Our members of the team:
- Cao Minh Quân - 2112109
- Huỳnh Nguyên Phúc - 2110451
- Dương Phúc Thắng - 2112327
- Nguyễn Quốc Thắng - 2114837
- Trần Bảo Phúc - 2114452
- Nguyễn Tiến Phát - 2114381

## Developer Notes
The above approach for starting the application is complete and correct, but it is not a very good way to start developing your application. There are two issues for this approach:
1. When running the command `npm start` in the server directory, it actually runs the command `node server.js`. This will run the file "server.js" in the Node environment and start the web server. The drawback is that **every time** you add or fix some code and then save it, the server will not restart. You will have to **manually** stop the server (by pressing `Ctrl + C` or killing the process...) and then restart it. This is not really a graceful way to shut down the server smoothly.

2. You will have to start the server and client process separately to develop your full-stack application. Again, you will have to do this **every time** and at a point of time you will feel frustrated.

If only there were a way that could solve both of these issues with just one single command...

Fortunately, there IS a way. And here is how. Start a terminal in the "CNPM_HCMUT_SSPS" directory and run the command:
```
  npm install
```
This will install the [concurrently](https://www.npmjs.com/package/concurrently) package which is used to solve the second problem. Inside the **package.json** file in the main folder, there are several running scripts for the npm. One of which is a script of ```dev```, using the concurrently module just installed.

This script also uses another package called [nodemon](https://www.npmjs.com/package/nodemon) which is used to solve the first problem. Basically, the package will automatically restart your server application whenever you save a JS file (and any other file if it is configured).

So, every time you start developing the project, just run this in the "CNPM_HCMUT_SSPS" directory:
```
  npm run dev
```
And voilà, everything is ready to go. Happy coding!!