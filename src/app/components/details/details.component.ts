import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../models";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0;
  gameId: string = '';
  game: Game | null = null;
  routSub: Subscription  = new Subscription();
  gameSub: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['game-id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(gameId: string): void {
    this.gameSub = this.httpService.getGameDetails(gameId)
      .subscribe((gameResponse: Game) => {
        this.game = gameResponse;
        setTimeout(() => {
          this.gameRating = this.game ? this.game.metacritic : 0;
        }, 1000)
      })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432'
    } else if (value > 50) {
      return '#fffa50'
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }

  ngOnDestroy() {
    this.game = null;
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routSub) {
      this. routSub.unsubscribe();
    }
  }

}
