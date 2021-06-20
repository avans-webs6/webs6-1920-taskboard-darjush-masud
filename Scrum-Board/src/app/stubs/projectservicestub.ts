import { Observable } from "rxjs";

export class ProjectServiceStub{

    getProjectByID(projectID:string): Observable<any>{
        return new Observable;
    }


    getActiveProjects(): Observable<any>{
        return new Observable;
    }

    getArchivedProjects (): Observable<any>{
        return new Observable;
    }

    
}