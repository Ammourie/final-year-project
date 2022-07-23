import { Group } from './group';
import { Problem } from './problem';
export interface DailyTask {
  id: number;
  problems: Problem[];
  dueDate: string;
  group: Group;
  description: string;
}
