// import { createServer} from 'node:http'
// const server = createServer((request, response)=>{
//     console.log("ok")
//      response.write("Olá")
//      return response.end()
// })
// server.listen(3333)
import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
const database= new DatabasePostgres();
//import { DatabaseMemory } from './database-memory.js'
const server = fastify()
const port = process.env.PORT || 3333 
console.log(port)
//const database = new DatabaseMemory()
server.post('/videos', async(request, reply) => {
    const {title, description, duration} = request.body
    await database.create({
        title,
        description,
        duration,
    })
    console.log(database.list())
    
    return reply.status(201).send()
})
server.get('/videos', async(request) => {
    const search = request.query.search
    const videos = await database.list(search)
    return videos
})
server.put('/videos/:id', async(request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body
     await database.update(videoId, {
        title,
        description,
        duration

    })
    return reply.status(204).send()


})
server.delete('/videos/:id',  async(request,reply) => {
    const id = request.params.id
    await database.delete(id)
    return reply.status(204).send()

})
server.listen(
    {
        host: '0.0.0.0',
         port: 4000 
        }, () => {
  console.log('Servidor rodando...'+ port);
});