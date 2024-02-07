// Modulo para chamar os verbos
const http = require('http')
const port = 3000
const DEFAULT_HEADER = {'Content-Type': 'application/json'}

const HeroFactory = require('./src/factories/heroFactory')
const heroService = HeroFactory.generateInstance()
const Hero = require('./src/entities/hero')

const routes = {
  '/heroes:get': async (req, res) => {
    const {id} = req.queryString
    const heroes = await heroService.find(id)
    res.write(JSON.stringify({results: heroes}))
    return res.end()
  },
  '/heroes:post': async(req, res) => {
    // async iterator = for await itera sobre funções asincronas
    for await (const data of req){
      const item = JSON.parse(data)
      const hero = new Hero(item)
      const {error, valid} = hero.isValid()
      if(!valid){
        res.writeHead(400, DEFAULT_HEADER)
        res.write(JSON.stringify({error: error.join(',')}))
        return res.end()
      }

      const id = await heroService.create(hero)
      res.writeHead(201, DEFAULT_HEADER)
      res.write(JSON.stringify({success: 'Hero created with success!', id}))

      // só jogamos o return pois sabemos que somente vai um obj por req
      // caso fosse um arquivo sob demanda
      // ele poderia entrar mais vezes em um evento e seria necessário remover o return
      return res.end()
    }
  },

  default: (req, res) => {
    res.write('Hello!')
    res.end()
  }
}
// Função que tratará as requisições ao server
const handler = (req, res) => {
  const {url, method} = req
  const [first, route, id] = url.split('/')
  req.queryString = {id: isNaN(id)? id : Number(id)}
  
  const key = `/${route}:${method.toLowerCase()}`

  res.writeHead(200, DEFAULT_HEADER)
  
  const chosen = routes[key] || routes.default
  return chosen(req, res)
}

// Criando servidor
http.createServer(handler)
    .listen(port, () => {
      console.log('server running at', port)
    })
