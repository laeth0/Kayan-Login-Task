# Clean Architecture API - Company & Employee Management System

A REST API built with **Clean Architecture** principles using Node.js, Express, TypeScript, and PostgreSQL.

## 🏗️ Architecture Layers

```
src/
├── app.ts                          # Main entry point
├── config/
│   └── projectDependinces.ts      # Dependency injection
├── frameworks/
│   ├── database/
│   │   ├── icdDatabase.ts         # Database layer (Data Access)
│   │   ├── models/
│   │   │   └── icd_grouping.sql   # Database schema
│   │   └── scripts/
│   │       └── icd_db_build.ts    # Database setup script
│   └── nodeExpress/
│       ├── index.ts               # Express server configuration
│       └── icd.ts                 # API routes
├── usecase/
│   └── IcdGroup/
│       └── addICDGroup.ts         # Business logic layer
└── controllers/
    └── Controllers.ts              # Request/Response handlers
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "c:\Users\Bisan\Desktop\clean architecture code"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit `config.env`:
   ```env
   PORT=3000
   ICD_DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your-super-secret-key-here
   ```

4. **Setup the database**
   ```bash
   npm run db:build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john.doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "employee": {
    "id": 1,
    "name": "John Doe",
    "username": "john.doe",
    "companyId": 1,
    "active": true
  },
  "message": "Login successful"
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "companyId": 1,
  "username": "jane.smith",
  "password": "securePassword123",
  "active": true
}
```

### Company Endpoints

#### Get All Companies
```http
GET /api/companies
```

#### Get Company by ID
```http
GET /api/companies/:id
```

#### Create Company
```http
POST /api/companies
Content-Type: application/json

{
  "name": "Tech Innovations Inc",
  "country": "USA",
  "city": "San Francisco",
  "active": true
}
```

#### Update Company
```http
PUT /api/companies/:id
Content-Type: application/json

{
  "name": "Updated Company Name",
  "active": false
}
```

#### Delete Company
```http
DELETE /api/companies/:id
```

### Employee Endpoints

#### Get All Employees
```http
GET /api/employees
```

#### Get Employee by ID
```http
GET /api/employees/:id
```

#### Get Employees by Company
```http
GET /api/employees/company/:companyId
```

#### Update Employee
```http
PUT /api/employees/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "active": false
}
```

#### Delete Employee
```http
DELETE /api/employees/:id
```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt (salt rounds: 10)
- **JWT Authentication**: Token-based authentication with 24-hour expiration
- **SQL Injection Prevention**: Parameterized queries throughout
- **CORS Enabled**: Cross-Origin Resource Sharing configured
- **Input Validation**: Request body validation on all endpoints

## 🧪 Testing the API

### Using the Seed Data

The database comes with sample data:

**Default Login Credentials:**
- Username: `john.doe`
- Password: `password123`

**Sample Companies:**
- Tech Solutions Inc (ID: 1)
- And more...

### Example Test Flow

1. **Test Health Check**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "john.doe", "password": "password123"}'
   ```

3. **Get All Companies**
   ```bash
   curl http://localhost:3000/api/companies
   ```

4. **Create a New Company**
   ```bash
   curl -X POST http://localhost:3000/api/companies \
     -H "Content-Type: application/json" \
     -d '{"name": "New Tech Co", "country": "Canada", "city": "Toronto", "active": true}'
   ```

## 📊 Database Schema

### Company Table
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)
- country: VARCHAR(100)
- city: VARCHAR(100)
- active: BOOLEAN
- createdAt: TIMESTAMP
- endedAt: TIMESTAMP
```

### Employee Table
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)
- companyId: INT (Foreign Key)
- username: VARCHAR(255) UNIQUE
- password: TEXT (bcrypt hashed)
- active: BOOLEAN
- createdAt: TIMESTAMP
```

## 🛠️ Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Build and setup database
npm run db:build
```

## 🔧 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Development**: nodemon, ts-node

## 📝 Clean Architecture Benefits

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Testability**: Easy to test individual layers
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features
5. **Independence**: Business logic is independent of frameworks

## 🔄 Request Flow

```
HTTP Request → Routes → Controllers → Use Cases → Database → Response
```

1. **Routes**: Define API endpoints
2. **Controllers**: Handle HTTP requests/responses
3. **Use Cases**: Contain business logic
4. **Database**: Data access layer
5. **Response**: Return formatted JSON

## 🐛 Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check `config.env` connection string
- Ensure database exists

### Port Already in Use
- Change PORT in `config.env`
- Kill process using the port: `npx kill-port 3000`

### TypeScript Errors
- Run: `npm install`
- Ensure all `@types` packages are installed

## 📄 License

ISC

## 👨‍💻 Author

Built with Clean Architecture principles

---

**Happy Coding! 🚀**
