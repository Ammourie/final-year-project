import { Student } from './student';
export interface TrainingGroup {
  id: number;
  name: string;
  level:string;
  coach: {
    id: number;
    fullName: string;
    codeforcesAccount: string;
  };
  students: Student[];
}
