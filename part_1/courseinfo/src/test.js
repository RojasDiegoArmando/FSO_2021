class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet() {
        console.log('Hello, my name is ' + this.name)
    }
}

const adam = new Person('Adam Obama', 35)
adam.greet()

const diego = new Person('Diego Rojas', 21)
diego.greet()