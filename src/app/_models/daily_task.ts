import { Group } from './group';
import { Problem } from './problem';
export interface DailyTask {
  id: number;
  problems: Problem[];
  dueDate: Date;
  group: Group;
  description: string;
}
