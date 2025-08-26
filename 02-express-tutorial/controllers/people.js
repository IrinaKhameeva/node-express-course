let{people} = require('../data');

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people});
}

const createPerson = (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res
        .status(400)
        .json({success: false, msg: 'Please provide name value'});
    }   
    res.status(201).send({success: true, person: name});    
}

const updatePerson = (req, res) => {
    const {id} = req.params;   
    const {name} = req.body;

    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res
        .status(404)
        .json({success: false, msg: `No person with id ${id}`});
    }   

    person.name = name;
    res.status(200).json({success: true, data: people}); 
    
} 

const deletePerson = (req, res) => {
    const {id} = req.params;
    const person = people.find((person) => person.id === Number(req.params.id));
    if (!person) {
        return res
        .status(404)
        .json({success: false, msg: `No person with id ${id}`});
    }   
    people.slice(person,1);
    return res.status(200).json({success: true, data: people});  
}

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
}

