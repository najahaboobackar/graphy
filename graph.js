const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Graph {
  constructor() {
    this.nodes = new Map();
    this.adjacencyList = new Map();
  }

  registerPerson(firstName, lastName, age) {
    this.nodes.set(firstName, {
      lastName,
      age,
      contacts: [],
      shipments: [],
    });

    this.adjacencyList.set(firstName, []);
    console.log("Person registered.");
  }

  contactUs() {
    console.log("For further details, contact najahaboobcker@gmail.com");
  }

  addShipment(firstName, shipmentId) {
    if (this.nodes.has(firstName)) {
      this.nodes.get(firstName).shipments.push(shipmentId);
      console.log("Your product is out for delivery.");
    } else {
      console.log(`Person with first name ${firstName} not found.`);
    }
  }

  dfs(startPerson) {
    const visited = new Set();
    const stack = [startPerson];

    while (stack.length > 0) {
      const node = stack.pop();
      if (!visited.has(node)) {
        visited.add(node);
        this.showPersonInfo(node);
        const neighbors = this.adjacencyList.get(node);

        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
      }
    }
  }

  showPersonInfo(firstName) {
    if (this.nodes.has(firstName)) {
      const person = this.nodes.get(firstName);
      console.log(`Name: ${firstName} ${person.lastName}`);
      console.log(`Age: ${person.age}`);
      console.log("Contacts:");
      person.contacts.forEach(contact => {
        console.log(contact);
      });
      console.log("Shipments:");
      person.shipments.forEach(shipment => {
        console.log(shipment);
      });
    } else {
      console.log(`Person with first name ${firstName} not found.`);
    }
  }

  showMenu() {
    console.log("\nMenu:");
    console.log("1. Register Person");
    console.log("2. Contact Us");
    console.log("3. Add Shipment");
    console.log("4. details");
    console.log("5. Exit");

    rl.question("Choose an option: ", option => {
      switch (option) {
        case "1":
          rl.question("Enter first name: ", firstName => {
            rl.question("Enter last name: ", lastName => {
              rl.question("Enter age: ", age => {
                this.registerPerson(firstName, lastName, age);
                this.showMenu();
                console.log(this.adjacencyList);
              });
            });
          });
          break;
        case "2":
          this.contactUs();
          this.showMenu();
          break;
        case "3":
          rl.question("Enter first name: ", firstName => {
            rl.question("Enter shipment ID: ", shipmentId => {
              this.addShipment(firstName, shipmentId);
              console.log(this.adjacencyList);
              this.showMenu();
            });
          });
          break;
        case "4":
          rl.question("show info ", startPerson => {
            this.dfs(startPerson);
            
            this.continueWithNextPerson();
          });
          break;
        case "5":
          rl.close();
          break;
        default:
          console.log("Invalid option. Please choose a valid option.");
          this.showMenu();
      }
    });
  }

  continueWithNextPerson() {
    rl.question("Enter the name of the next person (or press Enter to exit): ", nextPerson => {
      if (nextPerson.trim() !== "") {
        this.showPersonInfo(nextPerson);
        this.continueWithNextPerson();
      } else {
        this.showMenu();
      }
    });
  }
}

const graph = new Graph();

console.log("Welcome to the interactive system!");
graph.showMenu();
