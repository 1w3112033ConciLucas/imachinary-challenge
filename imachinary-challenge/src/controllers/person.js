
//Obtener una PERSON con la siguiente estructura
// {
//     id: 1,
//     name: Person,
//     lastname: Person,
//     age: 23,
//     moviesActor: [Movies],
//     moviesDirector: [Movies],
//     moviesProducer: [Movies]
// }

const { Movie, Person, Rol, Intermedia } = require("../database");

exports.getPerson = async (req, res, next) => {
    const {id} = req.params;

    try{

        const person = await Person.findAll({where: {id:id}})

        const moviesActor = await Movie.findAll({
            include: {
                required: true,
                model: Intermedia,
                include: [{
                    model: Rol,
                    where: { id: 1 } 
                }, {
                    model: Person,
                    where: { id : id}
                }]
            },        
        });

        const moviesDirector = await Movie.findAll({
            include: {
                required: true,
                model: Intermedia,
                include: [{
                    model: Rol,
                    where: { id: 2 } 
                }, {
                    model: Person,
                    where: { id : id}
                }]
            },        
        });

        const moviesProducer = await Movie.findAll({
            include: {
                required: true,
                model: Intermedia,
                include: [{
                    model: Rol,
                    where: { id: 3 } 
                }, {
                    model: Person,
                    where: { id : id}
                }]
            },        
        });

        const result = {
            id: person[0].dataValues.id,
            name: person[0].dataValues.name,
            lastName: person[0].dataValues.lastName,
            age: person[0].dataValues.age,
            moviesActor: moviesActor.map(m => {
                return {
                    id: m.dataValues.id,
                    title: m.dataValues.title,
                    year: m.dataValues.year
                }
            }),
            moviesDirector: moviesDirector.map(m => {
                return {
                    id: m.dataValues.id,
                    title: m.dataValues.title,
                    year: m.dataValues.year
                }
            }),
            moviesProducer: moviesProducer.map(m => {
                return {
                    id: m.dataValues.id,
                    title: m.dataValues.title,
                    year: m.dataValues.year
                }
            }),
        }

        return res.json(result)

    } catch {
        return res.status(400).send("La persona que buscas no existe!");
    }
    
}