# THD

**Developer Name :** Vipin Koshy Thomas

**Team :** Alone

**Project URL:** https://github.com/Vipinkthomas/THD-Angular-Web-App

# Prerequisites:

 1. Clone the project https://github.com/Vipinkthomas/THD-Angular-Web-App
 2. Install **[MongoDB](https://docs.mongodb.com/manual/administration/install-community)** and **[Node.js](https://nodejs.org/en/)** version 

    Node: v14.15.4

 3. Restore the MongoDB backup included in the project using `mongorestore --db THD THD\MongoDB\THD` ( not mandatory, but recommended. Otherwise create the DB). 
 4. Install Angular CLI: `npm install -g @angular/cli` 

    Angular CLI: v11.1.1

 5. Navigate to `/THD/THD` Run `npm install` to install the dependencies
 6. Navigate to `/THD/server` Run `npm install` to install the dependencies(dependencies are already present, but would recommend to do a `npm install`)


# To Run Application:

1. Navigate to `/THD/THD` and Run `ng build` to build the Angular app 
2. Run `ng serve` to start the application
3. Execute `mongod` to start the MongoDB daemon
4. Navigate to `/THD/server` and Run `node server` in the another console.
5. Follow the link `http://127.0.0.1:4200/`
6. Sample Login details: (If you are using restored MongoDB database THD, mentioned above)

    Username : c@a.com

    Password : abcdefgh

## Find Further Information here

[**Project Wiki**](https://mygit.th-deg.de/vt16684/THD/-/wikis/home)

[**Link to original project repo:**](https://mygit.th-deg.de/vt16684/THD)
 
