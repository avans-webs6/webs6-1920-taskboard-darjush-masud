export interface UserStory {
  id: string;
  name: string;
  description: string;
  status: string;
  storypoints: number;
  owner: string;
  ownerName: string;
  assigned: boolean;
  archived: boolean;
}
