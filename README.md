# Clean Architecture API - Company & Employee Management System

A REST API built with **Clean Architecture** principles using Node.js, Express, TypeScript, and PostgreSQL.

## 🏗️ Architecture Layers

```
├── 📁 src/
│   ├── 📁 config/
│   │   └── 📄 projectDependinces.ts
│   ├── 📁 controllers/
│   │   ├── 📄 AuthController.ts
│   │   ├── 📄 CompanyController.ts
│   │   └── 📄 EmployeeController.ts
│   ├── 📁 frameworks/
│   │   ├── 📁 database/
│   │   │   ├── 📁 models/
│   │   │   │   ├── 🗄️ icd_grouping.sql
│   │   │   │   └── 📄 icd_models.ts
│   │   │   ├── 📁 scripts/
│   │   │   │   └── 📄 icd_db_build.ts
│   │   │   ├── 📄 authDatabase.ts
│   │   │   ├── 📄 companyDatabase.ts
│   │   │   └── 📄 employeeDatabase.ts
│   │   └── 📁 nodeExpress/
│   │       ├── 📄 authRouter.ts
│   │       ├── 📄 companyRouter.ts
│   │       ├── 📄 employeeRouter.ts
│   │       └── 📄 index.ts
│   ├── 📁 usecase/
│   │   ├── 📄 AuthUseCase.ts
│   │   ├── 📄 CompanyUseCase.ts
│   │   └── 📄 EmployeeUseCase.ts
│   ├── 📄 app.ts
│   └── 📄 interfaces.ts
├── 🚫 .gitignore
├── 📖 README.md
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   

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

## 🔄 Request Flow

```
HTTP Request → Routes → Controllers → Use Cases → Database → Response
```

1. **Routes**: Define API endpoints
2. **Controllers**: Handle HTTP requests/responses
3. **Use Cases**: Contain business logic
4. **Database**: Data access layer
5. **Response**: Return formatted JSON


