// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// Wrap the entire contents of script.js inside of an IIFE
(function () {
  // Create the map's callback function
  function attachGreeting(name) {
    var firstLetter = name.charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }
  // Create the reducer's callback function
  function groupStatements(accumulator, name) {
    var firstLetter = name.charAt(0).toLowerCase();
    
    if (firstLetter === 'j') {
      accumulator.hello.push(helloSpeaker.speakSimple(name));
    } else {
      accumulator.bye.push(byeSpeaker.speakSimple(name));
    }
    return accumulator;
  }

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  var map = names.map(attachGreeting);

  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using the 'speak' method or either helloSpeaker's or byeSpeaker's
  // 'speak' method.
  for (var i = 0; i < names.length; i++) {
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = names[i].charAt(0).toLowerCase();

    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // Print the contents of the map array
  for (var index in map) {
    console.log(map[index]);
  }

  // Create the initalValue for the reduce function
  var initialValue = {
    hello: [],
    bye: []
  };

  // Reduce the array into two separate arrays
  var groupedStatements = names.reduce(groupStatements, initialValue);
  // Print the contents of the two arrays
  for (var index in groupedStatements.hello){
    console.log(groupedStatements.hello[index]);
  }
  for (var index in groupedStatements.bye){
    console.log(groupedStatements.bye[index]);
  }

})();
