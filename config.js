import process from 'node:process';
import * as dotenv from 'dotenv'

dotenv.config({path: `.env.${process.env.NODE_ENV}` });

export const PORT = process.env.APP_PORT;
export const sqlIp = process.env.SQL_SERVER_IP;
export const sqlPort = process.env.SQL_SERVER_PORT;
export const sqlUser = process.env.SQL_USER;
export const sqlDb = process.env.SQL_DB;
export const sqlPass = process.env.SQL_PASS;