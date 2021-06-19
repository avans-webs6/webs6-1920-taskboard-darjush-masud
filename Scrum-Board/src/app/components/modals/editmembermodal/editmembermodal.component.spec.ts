import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmembermodalComponent } from './editmembermodal.component';

describe('EditmembermodalComponent', () => {
  let component: EditmembermodalComponent;
  let fixture: ComponentFixture<EditmembermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmembermodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmembermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
