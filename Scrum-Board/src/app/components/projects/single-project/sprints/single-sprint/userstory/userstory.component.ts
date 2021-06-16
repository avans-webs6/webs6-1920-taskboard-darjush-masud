import { Component, Input, OnInit } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';

@Component({
	selector: 'app-userstory',
	templateUrl: './userstory.component.html',
	styleUrls: ['./userstory.component.sass']
})
export class UserstoryComponent implements OnInit {

	@Input()
	public userStories: [UserStory];
	constructor(private userstoryService: UserStoryService) { }

	ngOnInit(): void {
	}

}
