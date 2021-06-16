export interface Project {
  id: string;
  name: string;
  description: string;
  userstories: [string];
  owner: string;
  status: string;
  ownerName: string;
  members: [string];
  archived: boolean;
}
