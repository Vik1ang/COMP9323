# COMP9323 Term 2 Project

------

The goal of our project is to create a Q&A community of remote working tools that users can share their experience and tutorial videos. Our Innovation is that user could pay for experts to solve their technical difficulties during using other remote working software which is other community doesn’t have.

**This document describes the following points.**

```sh
> * System Articture
> * Front-End deopy on local server
> * Back-End deopy on local server
> * Notice
```
### [System Articture](https://www.zybuluo.com/cmd/)

> Frontend  ------  React
> Backend   ------  Flask
> Database  ------  MySQL
> Server    ------  Nginx
```sh
|---Project File (Root Path)

 |---backend	(Backend file path)
  |---controller
  |---middleware
  |---models
  |---service
  |---sql
  |---test
  |---utils
  |---__init_.py
  |---config.py
  |---requirements.txt
  |---run.py 
 
 |---frontend (Frontend file path)
  |---.vscode 
  |---build
  |---public 
  |---src 
  |---test 
  |---package-locl.json 
  |---package.json 
  |---yarn.lock
  |---ReadME.md 
  
 |---mysql.sql.gz
 |---ReadMe.md
```



### [Front-end](https://www.zybuluo.com/cmd/)

IDE: Visual Studio Code

1) Install yarn on your computer through npm package manager.
Download the installer from this link:
https://classic.yarnpkg.com/en/docs/install/#windows-stable
choose the operating system and version.
2) Install all mudules.
Go to the downloaded frontend folder and run the command below on the command line to install all modules needed to run the app:

```sh
$ yarn install
```
3) Start the app.
After installation of the modules, run the command below to start the app:
```sh
$ yarn start
```

### [Back-end](https://www.zybuluo.com/cmd/)

IDE: Pycharm

1) Imort project as Pycharm Falsk Project
The frontend folder
2) Install all Install dependencies libraries
```sh
$ pip install -r backend/requirements.txt
```
3) Start the Flask APP.
Run the command below to start the app:
```sh
$ python run.py
```
4) The server shoud be able to run on local server




### [Notice](https://www.zybuluo.com/cmd/)
This project's database is a online data base, you don't need implement database on localhost for testing.

If you do want to have a local database please read our Project Artifacts Depoyment Instructions.pdf

