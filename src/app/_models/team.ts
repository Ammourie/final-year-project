import { Student } from './student';
import { Coach } from './coach';
export interface Team {
  id: number;
  name: string;
  members: Student[];
  coach: Coach;
}
