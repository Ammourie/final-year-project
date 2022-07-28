import { User } from './user';
import { Coach } from './coach';
export interface Team {
  id: number;
  name: string;
  members: User[];
  coach: Coach;
}
