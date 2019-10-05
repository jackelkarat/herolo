import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any;
  farenheint:boolean;
  celsuis:boolean;
  constructor() {
    this.farenheint = true;
    this.celsuis = false;
  }

  ngOnInit() {
  this.favorites = localStorage.getItem('Favorites');
  this.favorites = JSON.parse(this.favorites);

  }

  celsuisFarenheint(): void {
    if(this.farenheint == true){
      this.farenheint = false;
      this.celsuis = true;
    }else{
      this.farenheint = true;
      this.celsuis = false;
    }
  }

}
