import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, forkJoin} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiResponse, Game} from "../models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<ApiResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<ApiResponse<Game>>(`${environment.BASE_URL}/games`, {
      params
    })
  }

  getGameDetails(gameId: string): Observable<Game> {
    console.log(gameId, 'gameID');
    const gameInfoRequest = this.http.get(`${environment.BASE_URL}/games/${gameId}`);
    const gameTrailersRequest = this.http.get(`${environment.BASE_URL}/games/${gameId}/movies`);
    const gameScreenShotRequest = this.http.get(`${environment.BASE_URL}/games/${gameId}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenShotRequest
    }).pipe(
      map((response: any) => {
        return {
          ...response['gameInfoRequest'],
          screenshots: response['gameScreenShotRequest'].results,
          trailers: response['gameTrailersRequest'].results
        }
      })
    )
  }
}
