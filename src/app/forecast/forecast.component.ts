import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { WeatherService } from "../services/weather.service";
import { Forecast } from "../models/forecast";
import {  FormBuilder,  FormGroup,  Validators,  AbstractControl,  FormControl} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Favorites } from "../models/favorites";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.css"]
})
export class ForecastComponent implements OnInit {
  forecastForm: FormGroup;

  forecastCity: any;
  myControl = new FormControl();

  @ViewChild("search", { static: false }) search: ElementRef;

  cities: string[] = [
    "Tel Aviv",
    "New York",
    "Orlando",
    "Texas",
    "London",
    "Paris",
    "Madrid",
    "Prague",
    "Talinn",
    "Palermo",
    "Milan",
    "Washington",
    "Beit Shemesh",
    " Bucharest",
    "Istanbul"
  ];

  filteredCities: Observable<string[]>;
  favorite: any;
  Favorites: Favorites[];
  favorites: any;
  searchFavorite: any;
  searchauto: any;
  countfavorite: number;
  farenheint:boolean;
  celsuis:boolean;

  constructor(private weatherSer: WeatherService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.forecastForm = fb.group({
      forecastCity: [null, Validators.required]
    });
    this.favorite = true;
    this.searchFavorite = false;
    this.searchauto= "Tel Aviv";
    this.farenheint = true;
    this.celsuis = false;
  }

  forecast: Forecast[] = [];

  ngOnInit() {
    if (localStorage.getItem("Favorites") != "") {
      this.favorites = JSON.parse(localStorage.getItem("Favorites"));
      console.log("favorites: " + this.favorites);
    }
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  searchCity(post) {
    this.forecast.splice(0, this.forecast.length);
    this.weatherSer.searchForecast(post.forecastCity).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.list.length; i = i + 8) {
        const forecastWeather = new Forecast(
          data.city.name,
          data.list[i].weather[0].description,
          data.list[i].main.temp,
          data.list[i].dt_txt,
          data.list[i].weather[0].icon
        );
        this.forecast.push(forecastWeather);
      }
      console.log(this.forecast);
      for (let i = 0; i < this.favorites.length; i++) {
        if (
          this.favorites[i].cityName.toLowerCase() == this.searchauto.toLowerCase()
        ) {
          this.searchFavorite = true;
          this.countfavorite = i;
          break;
        } else {
          this.searchFavorite = false;
        }
      }

      this.checkFavorite();

      return this.forecast;
    },
    err => {
      this.toastr.error('sorry, there is no result', 'Not Found');
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  addfavorites() {
    console.log(this.forecast[0]);
    this.weatherSer.addfavorites(this.forecast[0]);
    this.checkFavorite();
    this.searchFavorite = true;
  }

  removefavorites(count) {
    console.log(this.forecast[0]);
    this.weatherSer.removefavorites(this.forecast[0], count);
    this.checkFavorite();
    this.searchFavorite = false;

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


  checkFavorite() {
    for (let i = 0; i < this.favorites.length; i++) {
      if (
        this.favorites[i].cityName.toLowerCase() == this.searchauto.toLowerCase()
      ) {
        this.searchFavorite = true;
        this.countfavorite = i;
        break;
      } else {
        this.searchFavorite = false;
      }
    }
  }



}
