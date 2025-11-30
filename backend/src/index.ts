import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import app from './app.js';

dotenv.config({ path: './config.env' });

const urlDatabaseTemplate: string | undefined = process.env.DATABASE_URL;
const dbPassword: string | undefined = process.env.DATABASE_PASSWORD;
if (!urlDatabaseTemplate || !dbPassword) {
    throw new Error('Missing database URL template or db password');
}

const databaseUrl: string = urlDatabaseTemplate.replace(
    '<db_password>',
    dbPassword,
);
mongoose.connect(databaseUrl).then(() => console.log('MongoDB Connected!'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
}).on('error', (error) => {
    throw new Error(error.message);
});
