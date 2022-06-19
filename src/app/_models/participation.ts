import { Team } from './team';
export interface Participation {
  rank: number;
  year: string;
  name: string;
  location: string;
  team: Team;
}
