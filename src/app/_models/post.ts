import { Author } from "./author";

export interface Post {
  id: number;
  content: string;
  photo: string;
  author: Author;
}
