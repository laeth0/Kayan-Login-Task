import projectDependinces from './config/projectDependinces.js';
import apiRouter from './frameworks/nodeExpress/index.js';


const dependencies = projectDependinces();

const { port } = dependencies;

const app = dependencies.framework();

app.use(dependencies.cors());
app.use(dependencies.framework.json());
app.use(dependencies.framework.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// API routes
app.use('/api', apiRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});



app.listen(port, () => {
    console.log('\n========================================');
    console.log('🚀 Server is running!');
    console.log(`📡 Port: ${port}`);
    console.log(`🌍 URL: http://localhost:${port}`);
    console.log(`📚 API Docs: http://localhost:${port}/api/health`);
    console.log('========================================\n');
});



export default app;