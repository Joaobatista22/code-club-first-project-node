/*    -QUERY PARAMS => exemplo.site       // filtros
      -ROUTE PARAMS => /users/2          // BUSCAR, DELETAR OU ATUALIZAR ALGO 
      -REQUEST BODY => {"name":"seu nome", "age": 26} // ADICIONAR NO BODY

      -GET       => BUSCAR INFORMAÇÃO NO BACK-END
      -POST      => CRIAR INFORMAÇÃO NO BACK-END
      -PUT/PATCH => ALTERAR/ATUALIZAR INFORMAÇÃO NO BACK-END
      -DELETE    => DELETAR INFORMAÇÃO NO BACK-END
      */




const express = require('express') // puxando bliblioteca expres
const uuid = require('uuid') // criando biblioteca para pegar id
const port = 3000
const app = express() // colocando o express em uma const  chamada app
app.use(express.json())  // comunicar que vai usar o json

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params // PEGANDO ID DO USUARIO
    const index = users.findIndex(user => user.id === id)  // ENCONTRAR POSIÇÃO DO USUARIO
    if (index < 0) {  // SE NAO ENCONTRAR USUARIO
        return response.status(404).json({ message: "User not found" })
    }
    request.userIndex = index
    request.userId = id

    next()

}
app.get('/users', (request, response) => { // (GET) buscando informação de usuaris criados no BACK-END
    return response.json(users)
})

app.post('/users', (request, response) => { // (POST) criando informação no BACK-END
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age } // chamando biblioteca de geração de id unico para cada users
    users.push(user)
    console.log(uuid.v4())

    return response.status(201).json(user)
})
app.put('/users/:id', checkUserId, (request, response) => { // ATUALIZANDO USUARIO
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, name, age }
    users[index] = updatedUser
    return response.json(updatedUser)
})
app.delete('/users/:id', checkUserId, (request, response) => { // DELETE USUARIO POR ID
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()
})










app.listen(port, () => {
    console.log(`Server is running porta ${port}`)// escuta a porta do servidor
}) // usando a porta 3000