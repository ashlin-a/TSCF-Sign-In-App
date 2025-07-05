# TSCF Sign-In App

A modern web application built for The Second Chance Foundation (TSCF) to digitize their manual forms and logbooks, replacing paper-based processes with an efficient digital solution for their Hub Centre.

## 🌟 About

The Second Chance Foundation is a non-profit women's organization serving the Greater Toronto Area (GTA) and operates as a women's networking group in Toronto. This application digitizes their traditional paper-based forms and logbooks, allowing clients to complete registration forms electronically while providing administrators with powerful tools to manage data and generate reports.

**Visit TSCF:** [https://thesecondchancefoundation.ca/](https://thesecondchancefoundation.ca/)

## ✨ Features

### For Clients
- **Digital Forms**: Convert paper forms to digital format for easier completion
- **Service Registration**: Complete registration forms for various TSCF services
- **User-Friendly Interface**: Intuitive design replacing manual logbooks
- **Multi-Step Forms**: Guided form completion process
- **Real-time Validation**: Instant feedback on form inputs
- **OTP Verification**: Secure email-based verification using Gmail
- **Mobile-First**: Fully responsive design that works on all devices

### For Administrators
- **Dashboard Overview**: Comprehensive view of all form submissions and registrations
- **Data Management**: View, edit, and manage client information digitally
- **Excel Export**: Generate and download Excel reports replacing manual logbooks
- **User Management**: Admin account creation and management
- **Analytics**: Track service usage and form completion patterns
- **Network Deployment**: Designed for internal network hosting

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1**: Modern UI library
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Headless UI**: Accessible UI components
- **Heroicons & React Icons**: Icon libraries
- **Axios**: HTTP client for API requests
- **Date-fns**: Date utility library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **Zod**: Schema validation
- **ExcelJS**: Excel file generation
- **Nodemailer**: Email functionality for OTP delivery via Gmail
- **OTP Generator**: One-time password generation for secure verification

## 📋 Prerequisites

Before running this application, ensure you have the following:

### For Traditional Setup
- **Node.js** (version 16 or higher)
- **npm** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Gmail Account** with App Password enabled for OTP functionality

### For Docker Setup
- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Gmail Account** with App Password enabled for OTP functionality

**Note:** This application is designed for internal network deployment and is not intended for public hosting.

## Installation & Setup

### Option 1: Traditional Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/ashlin-a/TSCF-Sign-In-App.git
cd TSCF-Sign-In-App
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configurations
# Required variables:
# - DB_URL (MongoDB connection string)
# - JWT_SECRET & JWT_ADMIN_SECRET
# - DEFAULT_ADMIN_USERNAME & DEFAULT_ADMIN_PASSWORD
# - GMAIL_ADDRESS & GMAIL_APP_PASSWORD

# Start the backend server
npm start
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Option 2: Docker Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/ashlin-a/TSCF-Sign-In-App.git
cd TSCF-Sign-In-App
```

#### 2. Environment Configuration
Create a `.env` file in the **root directory** (where `docker-compose.yml` resides) with the following variables:

```env
# For JSON Web Token
JWT_SECRET=<A strong password>
JWT_ADMIN_SECRET=<A strong password>

# Database Connection URL (use MongoDB Atlas or the service name 'mongo' for local Docker MongoDB)
DB_URL=mongodb://mongo:27017/tscf-sign-in

# Default admin account for initial login
DEFAULT_ADMIN_USERNAME=<email address>
DEFAULT_ADMIN_PASSWORD=<A strong password>

# For sending OTP
GMAIL_ADDRESS=<A valid gmail address>
GMAIL_APP_PASSWORD=<App password of the above email address>
```

**Gmail Setup Instructions:**
1. Enable 2-Factor Authentication on your Gmail account.
2. Generate an App Password for the application.
3. Use the App Password (not your regular Gmail password) in the `GMAIL_APP_PASSWORD` field.

#### 3. Run with Docker Compose
Ensure you are in the root directory of the project (where `docker-compose.yml` is located).

```bash
# Build and start the containers
docker-compose up --build
```

This command will:
- Build the frontend image using the `frontend/Dockerfile` (Node.js 20, exposes port 5173, runs `npm run dev -- --host`).
- Build the backend image using the `backend/Dockerfile` (Node.js 20, exposes port 3000, runs `npm start`).
- Start the MongoDB service using the `mongo:6` image, persisting data in the `mongo-data` volume.
- Map ports: `5173` (frontend), `3000` (backend), and `27017` (MongoDB).
- Mount volumes to enable live code updates during development (excluding `node_modules`).

To run in detached mode (in the background):
```bash
docker-compose up --build -d
```

To stop the containers:
```bash
docker-compose down
```

To stop and remove volumes (e.g., to clear MongoDB data):
```bash
docker-compose down -v
```

#### 4. Accessing the Application
- **Frontend**: Open `http://localhost:5173` in your browser.
- **Backend API**: Available at `http://localhost:3000` (for API requests).
- **MongoDB**: Accessible at `mongo:27017` within the Docker network (or `localhost:27017` if connecting locally).

**Note:** If using MongoDB Atlas instead of the local MongoDB service, update the `DB_URL` in the `.env` file to your Atlas connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/tscf-sign-in`).

#### 5. Development with Docker
- The `docker-compose.yml` mounts the `frontend` and `backend` directories as volumes, allowing live code updates without rebuilding images.
- If you modify `package.json` or install new dependencies, rebuild the images with `docker-compose up --build`.
- Ensure the `VITE_BACKEND_URL` in the `.env` file matches the backend service's address (`http://localhost:3000` for local access Snowden: System: access, or `http://backend:3000` within the Docker network).

## Usage

### For Clients
1. Navigate to `http://localhost:5173` (or the internal network URL).
2. Complete the digital forms, replacing traditional paper forms.
3. Receive OTP verification via Gmail for secure submission.
4. Submit forms electronically instead of manual logbook entries.

### For Administrators
1. Access the admin portal using the default credentials configured in `.env`.
2. View the dashboard for an overview of form submissions.
3. Manage client data digitally instead of paper records.
4. Export data to Excel for reporting and record-keeping.
5. Create and manage additional admin accounts.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Second Chance Foundation for their trust in this project
- Niagara College Toronto for supporting the development
