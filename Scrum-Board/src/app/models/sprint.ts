export interface Sprint {
    id: string;
    name: string;
    description: string;
    startdate: Date;
    projectId: string;
    enddate: Date;
    userstories: [string];
    archived: boolean;
}