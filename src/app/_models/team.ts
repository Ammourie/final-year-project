import { Coach } from './coach';
export interface Team {
  id: number;
  name: string;
  members: number[];
  coach: Coach;
}
