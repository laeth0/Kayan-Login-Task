import projectDependinces from '../../../config/projectDependinces.js';

const { DatabaseConnectionTools, filesDependencies } = projectDependinces();
const dbPath = filesDependencies.fs.readFileSync(
    filesDependencies.path.resolve(process.cwd(), 'src/frameworks/database/models/icd_grouping.sql'),
    'utf8'
);

console.log('Starting database setup...');
console.log(`Reading SQL file from: ${dbPath}`);

DatabaseConnectionTools.IcdDBpoolObj.query(dbPath, (error: any) => {
    if (error) {
        console.error('❌ Error executing database query: ', error);
        console.log('Please check the query and database connection.');
    } else {
        console.log('✅ Database tables created successfully!');
    }
});