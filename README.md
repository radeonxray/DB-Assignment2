# DB-Assignment2
The Twitter assignment for the Database Course

Slides for the Day: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/lecture_notes/02-Intro_to_MongoDB.ipynb


# Assignment 

Your task is to implement a small database application, which imports a dataset of Twitter tweets from the CSV file into database.

Your application has to be able to answer queries corresponding to the following questions:
- How many Twitter users are in the database?
- Which Twitter users link the most to other Twitter users? (Provide the top ten.)
- Who is are the most mentioned Twitter users? (Provide the top five.)
- Who are the most active Twitter users (top ten)?
- Who are the five most grumpy (most negative tweets) and the most happy (most positive tweets)? (Provide five users for each group)

Your application can be written in the language of your choice. It must have a form of UI but it is not important if it is an API, a CLI UI, a GUI, or a Web-based UI.

You present your system's answers to the questions above in a Markdown file on your Github account. That is, you hand in this assignment via Github, with one hand-in per group. 

Push your solution, source, code, and presentation of the results to a Github repository per group and push a link to your solution in the hand-in area.

# Hand-in Procedure

- Provide all code and documentation for this assignment in a repository on Github.
- Create a Markdown (.md) file called README.md in the root of your project.
- That README.md describes what this project does and how to make it work. That is, you reviewer has to be able to clone your project, build it -you have to define steps for how to do that and what dependencies are required-, and use it.
- A presentation of your system's reply to the five queries above.
- Hand-in a link to your repository on www.peergrade.io.
- Hand-in at latest on 10. Feb. 16:00.

# Setup

## Introduction
This project uses various tools, such as Docker, ReactJS and NodeJS.

Because a "free" mlab account only supports up to 500mb-files, the project has to be run locally, rather than fethcing the MongoDB from the internet. This requires that the user setups a VM, Vagrant and Docker.

The setup guide is divided up into different parts, so feel free to skip parts if you've already installed the mentioned enviroments and programs.

### 1: Virtual Machine, Vagrant and Docker 

If you need to setup Docker, please look here on how to first setup the Virtual Machine and Vagrant:
Note: Please note the IP address you've selected for your Vagrant-setup, because you will need this later! Default its `192.168.33.10`
https://datsoftlyngby.github.io/soft2019spring/introday/introday_workshop.html

Following that, please see here how to install Docker on the VM and Vagrant:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04

### 2: The Docker Container and MongoDB setup
After Docker is up and running, see the "Hint" section of the assignemnt to see how to setup the Container, that will contain the mongoDB. Please note the port you are using for the container, following the guide will use `port:27017` by default.

Run the following command to import the `training.1600000.processed.noemoticon.csv` into a mongoDB in the docker container

`mongoimport -d TwitterDB --type CSV --file training.1600000.processed.noemoticon.csv --headerline`

To check that the MongoDB is up and running, I would recommend using the "MongoDB Compass"-program, which is a GUI to visualize your mongoDB. Download here: https://www.mongodb.com/products/compass

Open the Compass program and in the "New Connection" tab, enter your Vagrant IP address (that was mentioned earlier, if you didn't change the default IP from the setup file, it will most likely be `192.168.33.10`) in the "HostName Field". 
In the "Port" enter you docker container port, which by default in guide is set to `27017`.

That's it! You don't need to enter username or password, and if you've setup everything correctly, you should be connected to the mongoDB running in your container, when you hit the "Connect"-button in the Compass-program.


### 3: Express, NodeJS and NPM
In order to run the project, which has been build using NodeJS and Express, you will need to install NodeJS, which will allow you to use the NPM command.
I would suggest selecting and installing the LTS-version
https://nodejs.org/en/


### 4: Running the Express-Project
Development has been conducted using the Visual Studio Code-IDE, but the project can also be launched through the Terminal/Bash.

#### 4.1: Launch through Terminal/Bash

- Locate and open the `twitterdb-folder` in the Terminal/Bash. 
- Stay in the root of the folder
- Run the following command in the root of the folder, to install missing modules and dependencies in the twitterdb-project `npm install`
- Run the following command in the root of the folder, to launch the twitterdb-project `npm start`
- Please note:
  - The Project is set to be hosted on `http://127.0.0.1:3001` or `http://localhost:3001/`, this can be manually adjusted if needed in the `server.js-file`
 

#### 4.2: Launch through Visual Studio Code

- Locate and open the `twitterdb-folder` in Visual Studio Code (or another compatible IDE). 
- Run the following command in the terminal of the IDE to install missing modules and dependencies in the twitterdb-project `npm install`
- Run the following command in the terminal of the IDE to launch the twitterdb-project `npm start`
- Please note:
  - The Project is set to be hosted on `http://127.0.0.1:3001` or `http://localhost:3001/`, this can be manually adjusted if needed in the `server.js-file`
  - Has been set to be hosted on `http://127.0.0.1:3001` or `http://localhost:3001/`
  - The project has been set to communicate with the MongoDB hosted by the Docker Container at `192.168.33.10:27017`, change the IP and port in the project's `server.js`-file, if you've changed the default values from the setup.


# Development Notes

Ceo Docker Mongo: `192.168.33.10:27017`

MongoDB Compass: No need for other 

When creating the docker container:
`$ docker run --rm -v $(pwd)/data:/data/db --publish=27017:27017 --name dbms -d mongo
88385afac5fe88a5ba47cd60c084bc1855cae6089a7e7d95ba24f0ba6fea1404`

Please notice the --name [dbms] and use that to login/connect to the container, since the container id will be based on the long `88385afac5fe88a5ba47cd60c084bc1855cae6089a7e7d95ba24f0ba6fea1404`

In the following command:
`docker exec -it 88385afa bash`

Do this instead:
`docker exec -it dbms bash`
Which uses the container name instead of id.

If you want to connect to the container using the container id, use `docker container ls` to show all the containers.
Look for the "Container id"-field and use that instead.
`docker exec -it f239a91890dc bash`


