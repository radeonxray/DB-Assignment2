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
You present your system's answers to the questions above in a Markdown file on your Github account. That is, you hand in this assignment via Github, with one hand-in per group. Push your solution, source, code, and presentation of the results to a Github repository per group and push a link to your solution in the hand-in area.

# Hand-in Procedure

- Provide all code and documentation for this assignment in a repository on Github.
- Create a Markdown (.md) file called README.md in the root of your project.
- That README.md describes what this project does and how to make it work. That is, you reviewer has to be able to clone your project, build it -you have to define steps for how to do that and what dependencies are required-, and use it.
- A presentation of your system's reply to the five queries above.
- Hand-in a link to your repository on www.peergrade.io.
- Hand-in at latest on 10. Feb. 16:00.

# Setup

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


