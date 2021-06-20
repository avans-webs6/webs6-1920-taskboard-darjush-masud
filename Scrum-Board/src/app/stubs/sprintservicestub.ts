import { Observable } from "rxjs";

export class SprintServiceStub {
    getSprintByID(sprintID: string): Observable<any>{
        return new Observable;
    }


    getActiveSprint(projectID: string): Observable<any>{
        return new Observable;
    }

    getArchivedSprints(projectID: string): Observable<any>{
        return new Observable;
    }
}