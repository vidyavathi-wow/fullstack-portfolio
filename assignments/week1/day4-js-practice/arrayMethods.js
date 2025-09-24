let users=[
    {id:1,name:"Vidya",marks:95},
    {id:2,name:"navya",marks:89},
    {id:3,name:"savi",marks:38}
];

//map,filter,reduce are array methods and Higher order functions since they accept a cb function as an argument

//map
//map is an array method that transforms every element of an array into new element and returns the newly transformed array

const names=users.map((user)=>user.name);

console.log(names);

//filter

//Filter works similar to that of map  except that the retured array consists of only those elements that satisfies's the secified condition


//reduce

//reduce is also an array method in which the call back function that we passwed accepts two parameters element and accumulator it reduces all elements of an array into asingle value

const passedUsers=users.filter((user)=>user.marks>38);

console.log(passedUsers);


const totalMarks=users.reduce((acc,user)=>acc+user.marks,0);
console.log(totalMarks);