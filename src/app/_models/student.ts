import { Participation } from './participation';
import { TeachingGroup } from './teaching_group';
import { Team } from './team';
import { TrainingGroup } from './training_group';
export interface Student {
  id: number;
  userName: string;
  createdAt: Date;
  lastActive: Date;
  codeforcesAccount: string;
  atCoderHandle: string;
  codeChefHandle: string;
  university: string;
  faculty: string;
  profilePhoto: string;
  teams: Team[];
  participations: Participation[];
  trainingGroups: TrainingGroup[];
  teachingGroups: TeachingGroup[];
}
