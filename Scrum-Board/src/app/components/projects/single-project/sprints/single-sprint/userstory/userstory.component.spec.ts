import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryServiceStub } from 'src/app/stubs/userstoryservicestub';

import { UserstoryComponent } from './userstory.component';

describe('UserstoryComponent', () => {
  let component: UserstoryComponent;
  let fixture: ComponentFixture<UserstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserstoryComponent ],
      providers: [{ provide: UserStoryService, useClass: UserStoryServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
