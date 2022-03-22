import {TestBed} from '@angular/core/testing';

import {UserApiService} from './user-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [UserApiService]
    });
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createUser', () => {
    const expectedResponse = {
      firstName: 'aa',
      lastName: 'bb',
      email: 'aa@bb.cc'
    };
    it('call create user endpoint and send back same object without password', () => {
      service.createUser({
        firstName: 'aa',
        lastName: 'bb',
        email: 'aa@bb.cc',
        password: 'aabbccdD'
      }).subscribe(posts => {
        expect(posts).toEqual(expectedResponse);
      });
      const request = httpMock.expectOne( 'https://demo-api.now.sh/users');
      expect(request.request.method).toBe('POST');
      request.flush(expectedResponse);
    });
  });
});
