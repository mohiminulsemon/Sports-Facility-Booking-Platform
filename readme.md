# Sports Facility Booking Platform

This is a simple ecommerce site for Sports facility booking platform. Here you can book your desired facilities in a available time slots. 

### live link: https://sports-facility-booking-system.vercel.app/

## Project Setup

### Prerequisites

- Node.js 
- npm 
- MongoDB 

### Installation

1. Clone the repository:

```sh
gh repo clone mohiminulsemon/Sports-Facility-Booking-Platform
```
2. Install the dependencies:
```
npm install
```
3. Create a .env file in the root directory and add your MongoDB connection string:
```
DATABASE_URL=your_mongodb_connection_string
PORT=3000
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=desired_value
```
## Running the Application
1. Build the TypeScript files:
```
npm run build
```
2. Start the application in development mode:
```
npm run start:dev
```
3. The application will be running at http://localhost:3000.


## Testing the Endpoints
You can use tools like Postman or cURL to test the API endpoints.

### Sample Endpoints:
#### User Routes
* User Sign Up: POST /api/auth/signup
* User Login: POST /api/auth/login
#### Facility Routes
* Create a Facility (Admin Only)
Route: POST /api/facility
* Update a Facility (Admin Only)
Route: PUT /api/facility/:id
* Delete a Facility - Soft Delete (Admin Only)
Route: DELETE /api/facility/:id
* Get All Facilities
Route: GET /api/facility


#### Booking Routes
* Check Availability
Check the availability of time slots for booking on a specific date.
Route: GET /api/check-availability
* Create a Booking (User Only)
Route: POST /api/bookings
*  View All Bookings (Admin Only)
Route: GET /api/bookings
* View Bookings by User (User Only)
Route: GET /api/bookings/user
* Cancel a Booking (User Only)
Route: DELETE /api/bookings/:id

## Dependencies
* Express: Web framework for Node.js.
* Mongoose: MongoDB object modeling tool.
* Zod: Schema validation library for JavaScript and TypeScript.

## Development Dependencies
* TypeScript: Typed superset of JavaScript.
* ESLint: JavaScript linter.
* Prettier: Code formatter.