import { Component, OnInit, Input } from '@angular/core';
import {Game} from "../../models";

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {
  @Input() game: Game | null =  null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.game,'game');
  }

}
