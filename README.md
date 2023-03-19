# Fruit Storage System API | Test Playground

A lightweight app built using Next.js, TypeScript, GraphQL, Nexus, and MongoDB, designed primarily for testing backend API functionality of the Fruit Storage System.

## Overview

This project serves as a simple, user-friendly testing interface for the Fruit Storage System's backend API. It allows users to:

- Test Create, Update, Store, Remove and Delete (CRUD) operations for fruit entries
- Test storing and removing fruits from the inventory
- Verify each fruit's name, description, and storage limit

## Technologies

| Technology | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| Next.js    | Creating the web application with server-rendered components   |
| TypeScript | Static types to improve code quality and maintainability       |
| GraphQL    | Query language used to define the API for the application      |
| Nexus      | Library to create a GraphQL schema using a code-first approach |
| MongoDB    | NoSQL database used for storing data                           |
| Mongoose   | Library to interact with MongoDB and define schemas            |

## Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/fruit-storage-system-ts.git

    cd fruit-storage-system-ts
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

4. Run the test cases in local terminal
    ```sh
    npx jest
    ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000)

6. To access the GraphQL API, visit [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)


## Project Structure

- `pages`: Contains the Next.js pages for the application
- `components`: Contains React components used in the application
- `graphql`: Contains GraphQL schema and resolvers
- `middleware`: Contains middleware used in the application, such as CORS handling
- `models`: Contains Mongoose models for MongoDB
- `utils`: Contains utility functions, such as MongoDB connection handling
- `fruitStorage.domain`: Contains domain-related code, such as entities, value objects, repositories, and services

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

Enjoy testing! 🚀