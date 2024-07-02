## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

### setup project in local

1. **Clone the repository**

   ``` 
   git clone https://github.com/NileshDeshmukh09/API-s-.git
   ```

2. **Navigate to the project directory**

    ``` 
    cd API-s-
     ```

3. **Install dependencies**

    ``` 
    npm install 
    ```

4. **Set up environment variables**

    Create a .env file in the root of your project and add the following environment variables:

    ```

    POSTGRES_USER="your_postgres_user"
    POSTGRES_HOST="your_postgres_host"
    POSTGRES_PASSWORD="your_postgres_password"
    POSTGRES_DATABASE="your_postgres_database"
    PORT=8000


    ```

    Replace the values with your actual URLs as needed.

5. **Start the development server**

    ``` 
    npm start
    ```


## Project Structure

├── controllers
│ ├── __tests__ ( written All testcases )
|   ├── productController.test.js
|   ├── roleController.test.js
|   ├── userController.test.js
| ├── products
    ├── product.controller.js
| ├── user
|   ├── role.controller.js
│   ├── user.controller.js
│   └── userActive.controller.js
├── models
│ ├── index.js
| ├── user
|   ├── user.model.js
│   ├── role.model.js
│   └── userActive.model.js
├── routes
│ ├── user.routes.js
│ ├── product.routes.js
│ ├── userActive.routes.js
│ └── role.routes.js
├── .env
├── .gitignore
├── README.md
├── index.js ( main file )
└── package.json

### API Endpoints
    - Users
       - POST /users: Create a new user
       - GET /users: Get all users

    - Roles
       - POST /roles: Create a new role
       - GET /roles: Get all roles

    - userActivity
       - POST /user/active-status: Create a user Axtivity

    - Product
      - POST /products: Create a Products
      - GET /products: get a products

### TESTS 

1. **User Controller Tests**
    - getUsers
        should fetch all users with valid query parameters
        should handle internal server error

2. **Role Controller Tests**
    - createRole
        should create a new role with valid input

    - getRole
        should fetch all roles
        should handle errors when fetching roles

3. **Product Controller Tests**
    - createProduct
        should create a new product with valid input:
        should create a new product with valid input and price above threshold with approval code
        should return error for invalid category
