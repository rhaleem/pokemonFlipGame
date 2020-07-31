const array = [{
        id: 1,
        name: "george"
    },
    {
        id: 2,
        name: "paul"
    },
    {
        id: 3,
        name: "john"
    },
    {
        id: 4,
        name: "ringo"
    }
];

const newArray = [...array];
const tempArray = JSON.parse(JSON.stringify(array));

// console.log(array.length);

// for (let i = 0; i < 2; i++) {
//     // newArray.push(array[i]);
//     for (let j = 0; j < array.length; j++) {
//         newArray.push(array[j]);
//     }

// }

// console.log(newArray);

const supedArray = [].concat(array, tempArray);

console.log(supedArray);

for (const beatle of supedArray) {
    beatle.id = Math.floor((Math.random() * 100));
}

// }
// console.log(newArray);

// let theBeatles = newArray.forEach((beatle) => beatle["id"] = Math.random());
// console.log(theBeatles);



console.log(supedArray);