import { randomUUID } from "node:crypto"
import { sql } from "./db.js"
export class DatabasePostgres {
    #videos = new Map()

    async create(video) {
        const videoID = randomUUID()
        const {duration,title, description} = video
        await sql` INSERT INTO videos (id, title, description, duration) values (${videoID},${title},${description},${duration})`
    }
    async update(id, video) {
        const {title,description,duration} = video
        await sql `update videos set title =${title}, description = ${description}, duration = ${duration} where id= ${id}`


    }
    async delete(id) {
        await sql`delete from videos where id=${id}`
    }
    async list(search = '') {
        let videos
        if (search) {
            videos = await sql`SELECT * FROM videos where title ilike ${'%'+search+'%'}`
        } else {

            videos = await sql`SELECT * FROM videos `
        }
        return videos

    }
}