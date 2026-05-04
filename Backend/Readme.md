### `registerUser`

**Description**:  
Handles user registration by validating the request, hashing the password, creating a new user, and returning an authentication token.

**Method**:  
`POST`

**Request Body**:  
The request body should contain the following fields:
- `fullName` (object):
  - `firstName` (string): The first name of the user.
  - `lastName` (string): The last name of the user.
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.

**Response**:  
- **Success (201)**: Returns a JSON object containing:
  - `token` (string): The authentication token for the user.
  - `user` (object): The created user object.
- **Error (400)**: Returns a JSON object containing:
  - `errors` (array): An array of validation errors.

**Example Request**:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}

Example Success Response:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "12345",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}

Example Error Response:
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
**Request Validation**
The following validation rules are applied in user.routes.js:

email: Must be a valid email address.
fullName.firstName: Must have at least 2 characters.
password: Must have at least 6 characters.
Validation errors are returned with a 400 Bad Request status.

How It Works
Route Definition:
The /register endpoint is defined in user.routes.js with validation rules using express-validator.

Controller Logic:
The registerUser function in user.controller.js:

Validates the request using express-validator.
Hashes the password using bcrypt.
Calls the createUser function in user.service.js to save the user in the database.
Generates a JWT using the generateAuthToken method in user.model.js.
Returns the token and user details in the response.

Service Layer:
The createUser function in user.service.js:

Validates required fields.
Creates a new user using the userModel.
Model:
The user.model.js file defines the User schema and includes methods for:

Hashing passwords (hashPassword).
Comparing passwords (comparePassword).
Generating JWTs (generateAuthToken).

Dependencies:

express-validator: Used to validate the request body.
userModel: Provides methods for hashing passwords.
userService: Handles user creation logic.
Notes:

Ensure that express-validator middleware is used to validate the request before calling this function.
The userModel.hashPassword method is used to securely hash the user's password.
The user.generateAuthToken method is assumed to generate a JWT for authentication.
