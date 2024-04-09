// project.js - purpose and description here
// Author: Alan Lu
// Date: 4/7/2023

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    temp: ["Hot", "Cold", "Luke-warm", "Freezing-cold", "Boiling-hot"],
    drink: ["drink", "beverage", "liquid", "stuff"],
    name: ["Steve", "Max", "Ari", "William", "Vex", "Grace", "Megan", "Jasmine", "Queenie"],
    type: ["Milk tea", "Coffee", "Thai Tea", "Apple Juice", "Orange Juice", "Blood Cocktail"],
    item1: ["boba", "lychee jelly", "apple chunks", "orange peels", "eyeballs", "egg pudding"],
    num: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Infinite", "Too many"],
    item2: ["extra sugar", "sea salt", "cream", "coagulated blood", "no sugar", "half and half"],
    move: ["walk", "step", "crawl", "roll", "hop", "dance"],
    food: ["chips", "cookies", "fruits", "chunks of various organs", "crackers", "fried chicken", "tater tots"],
    num1: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    currency: ["dollars", "yen", "gold coins", "yuan", "rupees", "human skulls"],
    
  };
  
  const template = ` \nSnack Made! \n\n $temp $drink for $name! \n $num $type with $item1 and $item2. \n 
  Please $move your way up to the counter and grab your $drink. \n Would you like anything with that? \n We have a deal on $food today. 
  \n That will be the low low price of $num1$num1 $currency! \n Thank You!
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    box.innerText = story;
  }
  
  /* global clicker */
  clicker.onclick = generate;
  
  generate();
  
}

main();
