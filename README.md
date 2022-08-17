# minder_fullstack_project
Music tinder, where you can swipe music tracks left or right. Not a dating music app. But the idea is inspired from Tinder. Furthermore users will be able to match each other based on common liked music tracks when swiping. The app is for practice purpose.

## How to run the project
Prerequisities and installations:
- Node JS
- .NET 6
- Angular 12
- Visual Studio
- Visual Studio Code (optional, but recommended)

1. To run the angular front end project go to minder_fullstack_project/MinderUi/Minder
and run the command `ng serve --open`

2. To setup a local database go to MinderApi/db/chinook_abridged.sql and execute the
SQL script in a local MySQL database. In order to connect, specify the query string
in appsettings.json with the following JSON-object:

  "ConnectionStrings": 
  {
    "Credentials": "server={servername};user={username};database=chinook_abridged;port={port number};password={password}"
  } 


3. To run the .NET backend application go to the folder MinderApi and 
open the MinderApi.sln file in Visual Studio and then run the project.
