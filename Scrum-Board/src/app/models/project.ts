import { Member } from "./member";

export interface Project {
  id: string;
  name: string;
  description: string;
  userstories?: [string];
  owner: string;
  status: string;
  ownerName: string;
  members?: [Member];
  archived: boolean;
}
