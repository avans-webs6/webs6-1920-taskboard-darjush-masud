export interface Sprint {
    id: string;
    name: string;
    description: string;
    startdate: string;
    projectId: string;
    enddate: string;
    userstories: [string];
    archived: boolean;
}