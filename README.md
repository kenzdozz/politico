# Politico

[![Build Status](https://travis-ci.org/kenzdozz/politico.svg?branch=develop)](https://travis-ci.org/kenzdozz/politico)
[![Coverage Status](https://coveralls.io/repos/github/kenzdozz/politico/badge.svg)](https://coveralls.io/github/kenzdozz/politico)
[![Maintainability](https://api.codeclimate.com/v1/badges/58c047a8fb7d4959ddfa/maintainability)](https://codeclimate.com/github/kenzdozz/politico/maintainability)

Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

What things you need to install the software and how to install them
To get the project up and running, you need to have postgresql, nodejs and npm installed on your local machine.
- [Download and install Nodejs here](https://nodejs.org/en/download/)
- [Download and install Postgresql](https://www.postgresql.org/download/)

Run the following commands to confirm installations.
```
node -v
```
 - should display Node version
```
npm -v
```
 - should display npm version
```
psql --version
```
 - should display postgresql version


### Installing

 - Clone the repository `git clone https://github.com/kenzdozz/politico.git`
 - Navigate to the location of the folder
 - Run `npm install` to install dependencies
 - Run `npm start` to get the app started on your local machine

### Setting up Database
  - After installing [Postgresql](https://www.postgresql.org/download/)
  - To create database with USER `postgres`
  - Run `psql -c 'create database politico_test;' -U postgres` to create test database
  - Run `psql -c 'create database politico;' -U postgres` to create main database
  - Update Database names in .env if different from above
  - Run `npm run migrate:up` to create all tables
  - Running `npm run migrate:down` will drop all tables

### Set Environment Variables
Rename `.env.example` to `.env` and update the variables accordingly


## Running the tests

To run the tests, run the command
```
npm run test
```
The tests, test the api endpoints to ensure that it works and returns the required data.


## Built With

 ### The UI
* HTML - Hypertext Markup Language is the standard markup language for creating web pages and web applications
* CSS - Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language like HTML
* JAVASCRIPT - a high-level, interpreted programming language that conforms to the ECMAScript specification

 ### The API
* [Nodejs](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Postgresql](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
* [JWT](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token for aunthentication

## Authors

* **Onah Kenneth** - *Initial work* - [Politico](https://github.com/kenzdozz/politico)

See also the list of [contributors](https://github.com/kenzdozz/politico/contributors) who participated in this project.

## License

This project is licensed under the MIT License

## Acknowledgments

* Andela Bootcamp
