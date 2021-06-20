import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceStub } from '../stubs/authenticationservicestub';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let username = "redhood@gmail.com";
  let password = "hallo123";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthenticationService, useClass: AuthenticationServiceStub }],
      imports: [
        RouterTestingModule,
        AngularFireModule
      ]
    });
    service = TestBed.inject(AuthenticationService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



it('it should be correct number', () => {
  const result = 22;
 
  expect(result).toEqual(22);
});


});
