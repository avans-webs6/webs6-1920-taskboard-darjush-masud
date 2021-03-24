import { Project } from "../models/project";
import { User } from "../models/user";

export class ProjectUser {
  id: string;
  projectId: string;
  userId: string;
  role: string;
}
