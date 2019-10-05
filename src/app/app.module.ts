import { WeatherService } from './services/weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForecastComponent } from './forecast/forecast.component';
import { CelsuisPipe } from './celsuis.pipe';
import { FavoritesComponent } from './favorites/favorites.component';
import {MatButtonModule} from '@angular/material/button';
import { FilterPipe } from './filter.pipe';
import { FavoritePipe } from './favorite.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatListModule , MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import {MatSlideToggleModule, MatCheckboxModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForecastComponent,
    CelsuisPipe,
    FavoritesComponent,
    FilterPipe,
    FavoritePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
    MatSlideToggleModule, MatCheckboxModule,

  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
