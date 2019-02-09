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
  - From http://help.sentiment140.com/for-students/: "the polarity of the tweet (0 = negative, 2 = neutral, 4 = positive)"

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
![WizardSetup](./pictures/wizard.jpg)
## Introduction
This project uses various tools, such as Docker, Express and NodeJS.

Because a "free" mlab account only supports up to 500mb-files, the project has to be run locally, rather than fetching the MongoDB from the internet. This requires that the user setups a VM, Vagrant and Docker.

The setup guide is divided up into different parts, so feel free to skip parts if you've already installed the mentioned enviroments and programs.

**Please Note**: The Project has been build using the default values provided by the various guides, so if you have changed any values from the guide, like the `<IP>` to make your host machine connect and communicate with Docker, the `Port` number for Docker Container etc., please be sure to change the project files accordingly, so you can run the project without any errors.

### 1: Virtual Machine, Vagrant and Docker 

If you need to setup a Virtual Machine and Vagrant, please look here on [how to first setup the Virtual Machine and Vagrant](https://datsoftlyngby.github.io/soft2019spring/introday/introday_workshop.html)

**Note**: Please note the `IP` address you've selected for your Vagrant-setup, because you will need this later! Default its `192.168.33.10`


Following that, please see here [how to install Docker on the VM and Vagrant](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)


### 2: The Docker Container and MongoDB setup
After Docker is up and running, see the "Hint" section of the [assignemnt](https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/lecture_notes/02-Intro_to_MongoDB.ipynb) to see how to setup the Container, that will contain the mongoDB. Please note the port you are using for the container, following the guide will use `port:27017` by default.

**Warning**: Before importing the unzipped-db into Mongo, remember to have run the following command on the DB-file, so that our Express-server can read our DB correctly:

**Important command**: `sed -i '1s;^;polarity,id,date,query,user,text\n;' training.1600000.processed.noemoticon.csv`

Afer having run the above command to prepare teh db-file, run the following command to import the `training.1600000.processed.noemoticon.csv` into a mongoDB in the docker container.

**Import DB to MongoDB-command:** `mongoimport -d TwitterDB --type CSV --file training.1600000.processed.noemoticon.csv --headerline`

**Check if DB was correct**: To check if the "correct and edited"  db got imported, if the bash/terminal states that `imported 1600000 documents` after having run the import-command, then you'll know that its ok. 

If it however states `imported 1599999 documents`, the `sed -i '1s;^;polarity,id,date,query,user,text\n;' training.1600000.processed.noemoticon.csv` has not been applied correctly!

This can also later be checked by using tools such as  [MongoDB Compass](https://www.mongodb.com/products/compass), that can tell and show you how many documents a collection contains.


To check that the MongoDB is up and running, I would recommend using the [MongoDB Compass](https://www.mongodb.com/products/compass)-program, which is a GUI to visualize your mongoDB.

Open the Compass program and in the "New Connection" tab, enter your Vagrant IP address (that was mentioned earlier, if you didn't change the default IP from the setup file, it will most likely be `192.168.33.10`) in the "HostName Field". 
In the "Port" enter you docker container port, which by default in guide is set to `27017`.

That's it! You don't need to enter username or password, and if you've setup everything correctly, you should be connected to the mongoDB running in your container, when you hit the "Connect"-button in the Compass-program.


### 3: Express, NodeJS and NPM
In order to run the project, which has been build using NodeJS and Express, you will need to install [NodeJS](https://nodejs.org/en/), which will allow you to use the NPM command.
I would suggest selecting and installing the LTS-version
https://nodejs.org/en/


### 4: Running the Express-Project
Development has been conducted using the Visual Studio Code-IDE, but the project can also be launched through the Terminal/Bash.

#### 4.1: Launch through Terminal/Bash

- Locate and open the `DB-Assignment2-folder` in the Terminal/Bash. 
- Stay in the root of the folder
- Run the following command in the root of the folder, to install missing modules and dependencies in the DB-Assignment2-project `npm install`
- Run the following command in the root of the folder, to launch the DB-Assignment2-project `npm start`
- Please note:
  - The Project is set to be hosted on `http://127.0.0.1:3001` or `http://localhost:3001/`, this can be manually adjusted if needed in the `server.js-file`
 

#### 4.2: Launch through Visual Studio Code

- Locate and open the `DB-Assignment2-folder` in Visual Studio Code (or another compatible IDE). 
- Run the following command in the terminal of the IDE to install missing modules and dependencies in the DB-Assignment2-project `npm install`
- Run the following command in the terminal of the IDE to launch the DB-Assignment2-project `npm start`
- Please note:
  - The Project is set to be hosted on `http://127.0.0.1:3001` or `http://localhost:3001/`, this can be manually adjusted if needed in the `server.js-file`
  - Has been set to be hosted on `http://127.0.0.1:3001` or `http://localhost:3001/`
  - The project has been set to communicate with the MongoDB hosted by the Docker Container at `192.168.33.10:27017`, change the IP and port in the project's `server.js`-file, if you've changed the default values from the setup.

### 5: Results

With the `DB-Assignment2`-project running, you can see the results by using a browser (*Chrome, Firefox, Internet Explore etc.*) or tools such as [*Postman*](https://www.getpostman.com).

The answers to the questions posed in the assignment can be found using the given api-path

**[Please note that the given Paths are given using the default values for the IP, PORT, Database and Collections]**.

- How many Twitter users are in the database?
  - Path: http://localhost:3001/usercount
  - Result: 659774 (out of 1600000 documents)
- Which Twitter users link the most to other Twitter users? (Provide the top ten.)
  - Path: http://localhost:3001/mostmentioned
  - Results:
    - lost_dog 
      - Mentions : 549
    - tweetpet
      - Mentions : 310
    - VioletsCRUK
      - Mentions : 251
    - what_bugs_u
      - Mentions : 246
    - tsarnick
      - Mentions : 245
    - SallytheShizzle
      - Mentions : 229
    - mcraddictal
      - Mentions : 217
    - Karen230683
      - Mentions : 216
    - keza34
      - Mentions : 211
    - TraceyHewins
      - Mentions : 202
  
- Who is are the most mentioned Twitter users? (Provide the top five.)
  - Path:
- Who are the most active Twitter users (top ten)?
  - Path: http://localhost:3001/mostactive
  - Results: 
    - lost_dog 
      - Count : 549
    - weboke
      - Count : 345
    - tweetpet
      - Count : 310
    - SallytheShizzle
      - Count : 281
    - VioletsCRUK
      - Count : 279
    - mcraddictal
      - Count : 276
    - tsarnick
      - Count : 248
    - what_bugs_u
      - Count : 246
    - Karen230683
      - Count : 238
    - DarkPiano
      - Count : 236
- Who are the five most grumpy (most negative tweets) and the most happy (most positive tweets)? (Provide five users for each group)
  - Path:


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


