import { Project } from "../models/project";
import { User } from "../models/user";

export class ProjectUser {
  id: string;
  project: Project;
  user: User;
  role: string;
}
