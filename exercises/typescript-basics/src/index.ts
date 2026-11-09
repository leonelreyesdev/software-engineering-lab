function greetStudent(name: string, semester: number): string {
  return `Hello, ${name}! You are in semester ${semester}.`;
}

const message: string = greetStudent("Leonel", 7);

console.log(message);
