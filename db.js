import postgres from "postgres";
import 'dotenv/config'
const {PGHOST, PGDATABASE,PGUSER,PGPASSWORD,ENDPOINT_ID} = process.env
const url = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`
export const sql = postgres(url, {ssl:'require'})