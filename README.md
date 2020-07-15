![](https://i.imgur.com/8kjMqDp.png)

![](https://github.com/Xtremilicious/flowie/workflows/CI/badge.svg)

The ultimate progress tracker for MLH Fellows. Designed for mentors to gain better insights to their fellows contributions, as well as for the fellows to showcase their progress as an alternative to the daily standup notes, Flowie provides the project management tools that makes it easy to track daily progress.

## Motivation
MLH Fellowship has been a great experience under the guidance of the mentors and the maintainers. Working in a pod of 9-11 people, the fellows contribute to open source. However, with so many fellows contributing to a plethora of repositories across the open source space, it becomes hard for mentors and sometimes, even the fellows themselves to track their progress. Currently, Github can be used to view a user's contributions in every repository using the user's profile or all the contributions to a repository using the repository link but it does not provide any view **to track how much a particular user has contributed to a single or multiple repositories**.

That is why in daily standup notes, it is hard for the mentor to keep up with the progress of fellows to advise them better, particularly, if a fellow is lagging behind and is hesitant to ask for help, the mentor can notice it immediately and provide their support to help the fellow successfully contribute.

## Features
A list of documented use cases be found [here](https://github.com/Xtremilicious/flowie/issues/2). A quick overview can be found below:
- Creating daily visual reports for the tracked repos of the user.
- Allow user to add notes to daily reports.
- Group multiple users in a pod and show a combined daily visual reports/stand up notes for it.

## Getting started
### Django

#### Run django tests
- Make sure that docker is installed and running. Refer to the official [documentation](https://docs.docker.com/docker-for-windows/install/) to setup docker for your operating system.
- Run the command below to execute the test suite:
```
docker-compose -f docker-compose.test.yml up --exit-code-from app
```


#### Run django server
- Make sure the appropriate environment variables are setup:
  - DB_NAME *(Postgres database name)*
  - DB_HOST *(Postgres database host)*
  - DB_PASSWORD *(Postgres database password)*
  - DB_PORT *(Postgres database port, default 5432)*
  - GITHUB_API_KEY *(To increase the number of requests available per hour)*
- Make sure Python 3.6+ is installed. Refer to the official [documentation](https://wiki.python.org/moin/BeginnersGuide) to setup Python on your operating system.
  - Install dependencies using pip:
  ```
  pip install -r backend/requirements.txt
  ```
  - Run server
  ```
  python backend/manage.py runserver
  ```
  
 ## Technology Stack
 **Django**: The web framework for perfectionists with deadlines.
 
 **Django Rest Framework**: Web APIs for Django.
 
 **React**: A declarative, efficient, and flexible JavaScript library for building user interfaces.

 **Docker**: Docker provides a simple and powerful developer experience, workflows and collaboration for creating applications.

## Practices
**Test Driven Development** and **Github Actions** were utilized to write the backend for this application.

**Github best practices** were followed to collabrate between team mates.
