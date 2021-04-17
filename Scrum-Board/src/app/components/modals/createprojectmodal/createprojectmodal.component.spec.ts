import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateProjectModalComponent } from './createprojectmodal.component';


describe('CreateProjectModalComponent', () => {
  let component: CreateProjectModalComponent;
  let fixture: ComponentFixture<CreateProjectModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
