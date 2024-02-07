//Será a regra de negocios ou no caso as nossas horas
class HeroService{
  constructor({heroRepository}){
    this.heroRepository = heroRepository
  }

  async find(itemId){
    return this.heroRepository.find(itemId)
  }

  async create(data){
    return this.heroRepository.create(data)
  }
}

module.exports = HeroService