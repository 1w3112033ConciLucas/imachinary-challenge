
//Obtener una MOVIE con la siguiente estructura
// {
//     id: 1,
//     title: "Movie",
//     year: 2020,
//     casting: [Actores],
//     directors: [Directores],
//     producers: [Producers]
// }


const { Movie, Person, Rol, Intermedia } = require("../database");

exports.getMovie = async (req, res, next) => {

    const { id }= req.params;

    try{

        const movie = await Movie.findAll({
            where: { id: id }
        })

        const actorsMovie = await Person.findAll({
            include: {
                required: true,
                model: Intermedia,
                include: [{
                    model: Rol,
                    where: { id: 1 } 
                }, {
                    model: Movie,
                    where: { id : id }
                },]        
            }
        });

        const directorsMovie = await Person.findAll({
            include: {
                required: true,
                model: Intermedia,
                include: [{
                    model: Rol,
                    where: { id: 2 } 
                }, {
                    model: Movie,
                    where: { id : id}
                }]
            },        
        });

        const producersMovie = await Person.findAll({
            include: {
                required: true,
                model: Intermedia,
                include: [{
                    model: Rol,
                    where: { id: 3 } 
                }, {
                    model: Movie,
                    where: { id : id}
                }]
            },        
        });

        const result = {
            id: movie[0].dataValues.id,
            title: movie[0].dataValues.title,
            year: movie[0].dataValues.year,
            casting: actorsMovie.map(m => {
                    return {
                        id: m.dataValues.id,
                        name: m.dataValues.name,
                        lastName: m.dataValues.lastName,
                        age: m.dataValues.age
                    }
                }),
            directors: directorsMovie.map(m => {
                    return {
                        id: m.dataValues.id,
                        name: m.dataValues.name,
                        lastName: m.dataValues.lastName,
                        age: m.dataValues.age
                    }
                }),
            producers: producersMovie.map(m => {
                return {
                    id: m.dataValues.id,
                    name: m.dataValues.name,
                    lastName: m.dataValues.lastName,
                    age: m.dataValues.age
                }
            }),         
        }
        
        return res.json(result);

    } catch{
        return res.status(400).send("La Pelicula que buscas no existe!");
    }

}



