const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      }
      else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      logger.info(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

personsRouter.post('/', async (req, res, next) => {
  const body = req.body

  try {
    const existingPerson = await Person.findOne({ name: { $regex: new RegExp(`^${body.name}$`, 'i') } })
    if (existingPerson) {
      return res.status(400).json({
        error: 'name already exists',
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    const savedPerson = await person.save()
    res.json(savedPerson)
  }
  catch (error) {
    next(error)
  }
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { returnDocument: 'after', runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personsRouter
