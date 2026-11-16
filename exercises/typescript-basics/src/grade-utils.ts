
export interface Student {
    id: number;
    name: string;
    grades: number[];
}

export const PASSING_GRADE = 70;

export function calculateAverage(grades: number[]): number | null {
    if (grades.length === 0) {
        return null;
    }

    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return total / grades.length;
}

export function getStatus(average: number | null): string {
    if (average === null) {
        return "NO GRADES";
    }

    return average >= PASSING_GRADE ? "PASS" : "FAIL";
}
