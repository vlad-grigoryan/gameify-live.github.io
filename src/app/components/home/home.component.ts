import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiResponse, Game} from "../../models";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort = '';
  public games: Array<Game> | undefined;
  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;
  constructor(
    private httpService : HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGameList(sort, search)
      .subscribe((gameList: ApiResponse<Game>) => {
        console.log(gameList.results[0], 'gameList');
        this.games = gameList.results;
      })
  }

  async openGameDetails(gameId: string): Promise<void> {
    await this.router.navigate(['details', gameId]);
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if(this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

}
