import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationServiceStub } from 'src/app/stubs/authenticationservicestub';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers: [{ provide: AuthenticationService, useClass: AuthenticationServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
