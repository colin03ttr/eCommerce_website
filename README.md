# Node & React Development Project

This project is part of the "Node & React Development" course and involves creating an e-commerce website. The project combines frontend and backend development using Node.js, Angular, TypeScript, Express, and other technologies.

## Project Structure

- **Frontend**: Developed using Angular.
- **Backend**: Developed using Node.js, Express, and TypeScript.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Angular CLI

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/colin03ttr/eCommerce_website/
    ```
2. Navigate to the project directory:
    ```sh
    cd eCommerce_website/
    ```
3. Install dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    ```
    ```sh
    cd backend
    npm install
    ```

## Postgres Database
To use PostgreSQL with this project, you must create your own database in PostgreSQL.

After creating the database, change the database in the 'sequelize.ts' file (especially name, user and password) :
```ts
const sequelize = new Sequelize('your_database_name', 'your_database_owner', 'owner_password', {
  host: 'localhost',
  dialect: 'postgres', // Utilisation de PostgreSQL
  port: 5432, // Port PostgreSQL par défaut
  logging: false, // Désactivez pour éviter trop de logs
});
```
compile the TypeScript files using:
```sh
npx tsc
```
Additionally, a `seed.ts` file is provided in the backend to fill the database with initial data. Execute this file by running:
```sh
node ./dist/seed.js
```

## Useful Commands

### TypeScript Compilation

To compile TypeScript files, run:
```sh
npx tsc
```

### Start Backend Server

To start the backend server, run:
```sh
node ./dist/app.js
```

### Start Frontend Server

To start the frontend server, run:
```sh
ng serve
```

