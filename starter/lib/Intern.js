// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(id, name, email, school) {
    super(id, name, email);
    this.school = school;
  }

  getId() {
    return this.id;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }
  getName() {
    return this.name;
  }
}

module.exports = Intern;
