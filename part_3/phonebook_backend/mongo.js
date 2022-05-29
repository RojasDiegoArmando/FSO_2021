const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://phonebook:${password}@cluster0.8vry4.mongodb.net/phonebookDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', phonebookSchema)

console.log(process.argv.length)
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(result)
        console.log('person saved')
        mongoose.connection.close()
    })
}
