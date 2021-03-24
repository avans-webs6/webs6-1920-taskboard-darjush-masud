export class Project {
  public id?: string;
  public name: string;
  public description: string;
  public userstories: [string];
  public owner: string;
  public ownerName: string;
  public members: [string];
  public archived: boolean;
}
