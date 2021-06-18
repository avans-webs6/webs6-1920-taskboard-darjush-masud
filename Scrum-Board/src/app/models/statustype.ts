import { UserStoryOwner } from "./userstoryowner";

export interface StatusType {
	name: string,
	members: [UserStoryOwner]
}