# soccer-stats

This is a college project from 2021.

## Technogies Used
- Typescript
- HTML
- CSS
- Angular
- Express (REST API)
- MySQL (Server + Worbench)

## Starter instructions for booting this up again a year later

## Angular App
https://angular.io/guide/setup-local#prerequisites

- Install Node.js from here -> https://nodejs.org/en/download/
Angular requires a relatively up-to-date LTS version of node. 

- Install Node Package Manager (npm), this is already installed when Node.js is installed.

- Install Angular with this command -> `npm install -g @angular/cli`

- Create Angular app -> `ng new <app-name>` (Not needed as this is an existing project)

- Write code for app (This was handled during my college module)

- Run Angular app -> Navigate to directory in cmd (Angular calls this a Workspace, this is wherever you ran the inital `ng new <app-name>` command) and run -> `ng serve --open`

## REST API

- Install MySQL from here -> https://dev.mysql.com/downloads/windows/installer/8.0.html
    - I installed Server and Workbench
    - Server
        - Configure this with legacy security (password = `root`)
        - When installation and configuration is complete the server should automatically be running on the port you chose (I chose 3306, this is the default)
    - Workbench
        - Will automatically detect the above server. 
        - Click into this and run your sql script (soccer-stats\restapi\model\epl20201.sql) to create all SQL resources.

- Install Express: npm install express

- Write index.js and other resources to use this restapi (Already written in project)

- Navigate to restapi directory in cmd and run -> `node index.js` or preferably `nodemon index.js`

## Old README.md - auto-generated
------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
