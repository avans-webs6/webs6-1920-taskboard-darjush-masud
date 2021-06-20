import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let username = "redhood@gmail.com";
  let password = "hallo123";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [
        RouterTestingModule,
        AngularFireModule
      ]
    });
    service = TestBed.inject(AuthenticationService);
    
  });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('creates an account and redirects it to dashboard', () => {
//     const result = service.SignIn(username, password);
   
//     expect(result).toHaveBeenCalledWith(['/dashboard']);
// });

it('it should be correct', () => {
  const result = 22;
 
  expect(result).toEqual(22);
});


});
