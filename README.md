# Car Washing Management System Backend

A robust and efficient Car Washing Management System designed for seamless service booking and management. Built with Node.js, Express, and TypeScript, the system features user-friendly operations for both customers and administrators, ensuring a smooth workflow for car washing businesses.

## Key Features

- **User Account Management**: Sign up, log in, and view bookings.
- **Service Booking**: Browse services, check slot availability, and book slots.
- **Admin Tools**: Create, update, and delete services; manage booking slots.
- **Slot Automation**: Automatically generate service slots based on operational hours and service duration.
- **Secure Access**: Role-based authentication and secure route handling.
- **Error Management**: Streamlined error responses and validation.
- **Vehicle Management**: Support for various vehicle types and registration details.
- **Profile Management**: Users can manage their profiles with addresses and contact information.
- **Password Recovery**: Secure password reset functionality via email.
- **Image Upload**: Profile image storage with Cloudinary integration.

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with refresh token mechanism
- **Password Encryption**: Bcrypt
- **Validation**: Zod schema validation
- **File Upload**: Multer for handling multipart/form-data
- **Cloud Storage**: Cloudinary for image storage
- **Email Service**: Nodemailer for sending emails
- **Error Handling**: Custom error handling middleware
- **Code Quality**: ESLint and Prettier for code formatting

## Installation

Follow these steps to set up the Car Washing Management System locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```plaintext
PORT=5000
DATABASE_URL=<your-database-url>
NODE_ENV=development
BCRYPT_SALT_ROUND=<number-of-salt-rounds>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRATION_TIME=1d
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
JWT_REFRESH_EXPIRATION_TIME=365d
EMAIL_SMTP_PASSWORD=<your-email-password>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

### 4. Run the Development Server

Start the server in development mode:

```bash
npm run start:dev
```

### 5. Build for Production

Compile TypeScript:

```bash
npm run build
npm run start:prod
```

### 6. Lint and Format Code

To ensure code quality, use the following commands:

```bash
npm run lint
npm run lint:fix
npm run format
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Login for users and admins
- `POST /api/v1/auth/change-password` - Change user password
- `POST /api/v1/auth/refresh-token` - Get new access token using refresh token
- `POST /api/v1/auth/forget-password` - Request password reset email
- `POST /api/v1/auth/reset-password` - Reset password with token

### User Management

- `POST /api/v1/users/create-app-user` - Register a new user
- `POST /api/v1/users/create-admin` - Create a new admin (admin only)
- `GET /api/v1/app-users` - Get all app users
- `GET /api/v1/app-users/:id` - Get specific user
- `PATCH /api/v1/app-users/:id` - Update user
- `DELETE /api/v1/app-users/:id` - Delete user

### Admin Management

- `GET /api/v1/admin` - Get all admins
- `GET /api/v1/admin/:id` - Get specific admin
- `PATCH /api/v1/admin/:id` - Update admin
- `DELETE /api/v1/admin/:id` - Delete admin

### Services

- `POST /api/v1/services/create-service` - Create a new service (admin only)
- `GET /api/v1/services` - Get all services
- `GET /api/v1/services/:id` - Get specific service
- `PATCH /api/v1/services/:id` - Update service (admin only)
- `DELETE /api/v1/services/:id` - Delete service (admin only)

### Slots

- `POST /api/v1/slots/create-slot` - Create service time slots (admin only)
- `GET /api/v1/slots` - Get all available slots
- `GET /api/v1/slots/:id` - Get specific slot
- `PATCH /api/v1/slots/:id` - Update slot

### Bookings

- `POST /api/v1/bookings/create-booking` - Create a new booking (user only)
- `GET /api/v1/bookings` - Get all bookings (admin only)
- `GET /api/v1/bookings/:id` - Get specific booking (user can view their own)

## Project Structure

```
src/
├── app/
│   ├── builder/           # Query builders for database operations
│   ├── config/            # Configuration settings
│   ├── constant/          # Application constants
│   ├── error/             # Error handling classes
│   ├── interface/         # TypeScript interfaces
│   ├── middleware/        # Express middlewares
│   ├── modules/           # Feature modules
│   │   ├── Admin/         # Admin related functionality
│   │   ├── AppUser/       # App user related functionality
│   │   ├── auth/          # Authentication and authorization
│   │   ├── booking/       # Booking management
│   │   ├── service/       # Service management
│   │   ├── slot/          # Slot management
│   │   └── User/          # User management
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
├── app.ts                 # Express application setup
└── server.ts              # Server initialization
```

## Deployment

The project is configured for deployment on Vercel with the included `vercel.json` file.

---

_Created by Likhon_
