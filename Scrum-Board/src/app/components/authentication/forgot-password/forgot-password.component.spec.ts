import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationServiceStub } from 'src/app/stubs/authenticationservicestub';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers: [{ provide: AuthenticationService, useClass: AuthenticationServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
