import cors from 'cors';
import express from 'express';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });


const {
    PORT,
    ICD_DATABASE_URL,
} = process.env;


const IcdDBpoolObj = new Pool({
    connectionString: ICD_DATABASE_URL,
});



export default () => {
    return {
        framework: express,
        port: PORT,
        cors,
        jwt,
        filesDependencies: { fs, path },
        DatabaseConnectionTools: {
            IcdDBpoolObj,
        },
    };
};

