# Car Washing Management System

A robust and efficient Car Washing Management System designed for seamless service booking and management. Built with Node.js, Express, and TypeScript, the system features user-friendly operations for both customers and administrators, ensuring a smooth workflow for car washing businesses.

## Key Features

- **User Account Management**: Sign up, log in, and view bookings.
- **Service Booking**: Browse services, check slot availability, and book slots.
- **Admin Tools**: Create, update, and delete services; manage booking slots.
- **Slot Automation**: Automatically generate service slots based on operational hours and service duration.
- **Secure Access**: Role-based authentication and secure route handling.
- **Error Management**: Streamlined error responses and validation.

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

```

### 6. Lint and Format Code

To ensure code quality, use the following commands:

```bash
npm run lint
npm run lint:fix
npm run format
```

---

_Created by Likhon_
