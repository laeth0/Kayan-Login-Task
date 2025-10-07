// Main application entry point - Clean Architecture
import projectDependinces from './config/projectDependinces.js';
import buildIcdDatabase from './frameworks/database/icdDatabase.js';
import buildUseCases from './usecase/IcdGroup/addICDGroup.js';
import buildControllers from './controllers/Controllers.js';
import buildRoutes from './frameworks/nodeExpress/icd.js';
import buildExpressServer from './frameworks/nodeExpress/index.js';

// Get project dependencies
const dependencies = projectDependinces();
const { DatabaseConnectionTools, port, jwt } = dependencies;

// Get JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

// Initialize database layer
const database = buildIcdDatabase(DatabaseConnectionTools.IcdDBpoolObj);
console.log('✅ Database layer initialized');

// Initialize use cases (business logic)
const useCases = buildUseCases(database, JWT_SECRET);
console.log('✅ Use cases initialized');

// Initialize controllers
const controllers = buildControllers(useCases);
console.log('✅ Controllers initialized');

// Initialize routes
const routes = buildRoutes(controllers);
console.log('✅ Routes initialized');

// Start Express server
const { app, server } = buildExpressServer(routes, port || 3000);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('✅ HTTP server closed');
        DatabaseConnectionTools.IcdDBpoolObj.end(() => {
            console.log('✅ Database connection closed');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('✅ HTTP server closed');
        DatabaseConnectionTools.IcdDBpoolObj.end(() => {
            console.log('✅ Database connection closed');
            process.exit(0);
        });
    });
});

export default app;