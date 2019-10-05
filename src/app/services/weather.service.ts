import { Injectable, Inject } from "@angular/core";
import {  Http,  Headers,  Response,  Jsonp,  RequestOptions,  URLSearchParams} from "@angular/http";
import { Observable, Subject, ReplaySubject, from, of, range } from "rxjs";
import { filter, switchMap, map } from "rxjs/operators";
import {  HttpClientModule,  HttpHeaders,  HttpParams,  HttpClient} from "@angular/common/http";
import { Weather } from "../models/weather";
import { Favorites } from "../models/favorites";

@Injectable()
export class WeatherService {
  private weather: Weather[] = [];
  weatherClass: Weather;
  location;
  Favorites: Favorites[];
  favorites: any;

  constructor(private http: Http) {
    if (
      localStorage.getItem("Favorites") != undefined ||
      localStorage.getItem("Favorites") != null ||
      localStorage.getItem("Favorites") != ""
    ) {
      this.favorites = JSON.parse(localStorage.getItem("Favorites"));
    } else {
      localStorage.setItem("Favorites", "");
      this.favorites = [{}];
    }
  }

  currentLocation() {
    //  return new Promise((res, rej)=>{
    //     navigator.geolocation.getCurrentPosition((pos) => {
    //       this.location = pos.coords;
    //       const lat = this.location.latitude;
    //       const lon = this.location.longitude;
    //       console.log(`lat ${lat} and lon ${lon}`);
    //       return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&lat=${lat}&lon=${lon}&units=imperial`).map((response:Response) => response.json()).toPromise().then(
    //         (data) => {
    //           this.weatherClass = new Weather(data.name, data.main.temp, data.weather[0].description, data.main.temp_min, data.main.temp_max, data.weather[0].icon);
    //           res(this.weatherClass);
    //           return this.weatherClass;
    //         }
    //       );
    //     })
    //   })
  }

  addfavorites(Favorite: Favorites) {
    this.favorites.unshift(Favorite);
    localStorage.setItem("Favorites", JSON.stringify(this.favorites));
  }

  removefavorites(Favorite: Favorites, count: number) {
    this.favorites.forEach((cur, index) => {
      if (this.favorites[index].cityName === cur.cityName) {
        this.favorites.splice(index, 1);
      }
    });
    localStorage.setItem("Favorites", JSON.stringify(this.favorites));
  }

  searchForecast(city: string) {
    // tslint:disable-next-line:max-line-length
    return this.http
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=dd04ba20f8397aa356225600ed43c5b2&units=imperial`
      )
      .pipe(map((response: Response) => response.json()));
  }
}
