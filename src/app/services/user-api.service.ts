import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, IUserSignUpRequest} from "./user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly userApiUrl: string = 'https://demo-api.now.sh/users';

  constructor(private httpClient: HttpClient) {}

  postUser(userSignUpRequest: IUserSignUpRequest): Observable<IUser> {
    return this.httpClient.post<IUser>(this.userApiUrl, userSignUpRequest);
  }
}
