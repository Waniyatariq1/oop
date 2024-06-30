#! /usr/bin/env node
import inquirer from "inquirer"
import chalk from "chalk"


class Student {
    name:string
    constructor(n:string){
        this.name=n
    }
}

class Person{
    student:Student[]=[]
    addStudent(obj:Student){
        this.student.push(obj)
    }
}

const persons = new Person()

const programStart =async(persons:Person) => {
    do{
    console.log(chalk.greenBright("Welcome"));
    const ans = await  inquirer.prompt({
        name: "select",
        type: "list",
        message: "Whom would you like to interact with",
        choices: ["staff", "student", "exit"]
    })
    if(ans.select === "staff"){
        console.log("You approach the staff room. feel free to ask any thing");
        
    }else if(ans.select === "student"){
        const ans = await inquirer.prompt({
            name: "student",
            type: "input",
            message: "Enter the student name you wish to engage with."
        })
        const student = persons.student.find(val => val.name === ans.student)
        if(!student){
            const name = new Student(ans.student)
            persons.addStudent(name)
            console.log(`Hello i am ${name.name}, nice to meet you!`);
            console.log(chalk.yellow("New student added"));
            console.log(chalk.greenBright("Current student list"));
            console.log(persons.student);    
        }else{
            console.log(`Hello i am ${student.name}, nice to see you again! `);
            console.log("Existing student list");
            console.log(persons.student);
            
        }
    }else if(ans.select === "exit"){
        console.log("Exiting the program");
        process.exit()
    }
}while(true)
}

programStart(persons)
