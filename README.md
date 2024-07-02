## Getting Started

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
    PORT=3000


    ```

    Replace the values with your actual URLs as needed.

5. **Start the development server**
      
    ``` 
    npm start
    ```
   server will run on  ` http://localhost:3000/ `
   


## Swagger Documentation
- Swagger is set up to document the API endpoints. You can access the Swagger UI at:
    ```
    http://localhost:3000/api-docs

    ```

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
        should create a new product with valid input
        should create a new product with valid input and price above threshold with approval code
        should return error for invalid category

