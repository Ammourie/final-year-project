import { User } from './user';
export interface TrainingGroup {
  id: number;
  name: string;
  level:string;
  coach: {
    id: number;
    fullName: string;
    codeforcesAccount: string;
  };
  students: User[];
}
