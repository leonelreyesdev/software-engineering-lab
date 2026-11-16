
export interface Student {
    id: number;
    name: string;
    grades: number[];
}

export type GradeStatus = "PASS" | "FAIL" | "NO GRADES";

export const PASSING_GRADE = 70;

export function calculateAverage(grades: number[]): number | null {
    if (grades.length === 0) {
        return null;
    }

    if (grades.some((grade) => !Number.isFinite(grade))) {
        throw new RangeError("Grades must be finite numbers");
    }

    const total = grades.reduce((sum, grade) => sum + grade, 0);
    const average = total / grades.length;

    if (!Number.isFinite(average)) {
        throw new RangeError("Average must be a finite number");
    }

    return average;
}

export function getStatus(average: number | null): GradeStatus {
    if (average === null) {
        return "NO GRADES";
    }

    if (!Number.isFinite(average)) {
        throw new RangeError("Average must be a finite number");
    }

    return average >= PASSING_GRADE ? "PASS" : "FAIL";
}
