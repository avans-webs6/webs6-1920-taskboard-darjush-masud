import { Observable } from "rxjs";

export class UserStoryServiceStub {
    getActiveUserStory(projectID: string): Observable<any>{
        return new Observable;
    }

    getArchivedUserStories(projectID: string): Observable<any>{
        return new Observable;
    }
}