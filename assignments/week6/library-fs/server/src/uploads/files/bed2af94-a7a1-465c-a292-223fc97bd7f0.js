class Car{
   constructor(name){
    this.brand=name;
   }
   getBrand(){
    return `my present car brand is ${this.brand}`;
   }
}
mycar=new Car("BMW")
console.log(mycar.brand)
console.log(mycar.getBrand())

class Car2 extends Car{
    constructor(name,model){
        super(name)
        this.model=model
    }
    getModel(){
        console.log(`my ${this.getBrand()} and model is ${this.model}`)
    }
}
car2=new Car2("swift","nbkngj")
car2.getModel()