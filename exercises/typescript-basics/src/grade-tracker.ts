
import { calculateAverage, getStatus } from "./grade-utils";
import type { Student } from "./grade-utils";

const students: Student[] = [
    {
        id: 1,
        name: "Leonel",
        grades: [95, 88, 92]
    },
    {
        id: 2,
        name: "Carlos",
        grades: [65, 70, 60]
    },
    {
        id: 3,
        name: "Sofia",
        grades: [85, 90, 95]
    },
    {
        id: 4,
        name: "Maria",
        grades: []
    }
];

for (const student of students) {
    const average = calculateAverage(student.grades);
    const averageText = average === null ? "N/A" : average.toFixed(2);

    console.log(
        `${student.name} | Average: ${averageText} | ${getStatus(average)}`
    );
}
