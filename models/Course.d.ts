export interface Course {
    id: number;
    title: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    maxCapacity: number;
    registrations: any[];
    courseType: {
        name: string;
        description: string;
        ageRange: any;
    };
}