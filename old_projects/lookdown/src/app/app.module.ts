import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {AboutMePageComponent} from './pages/about-me-page/about-me-page.component';
import {SkillsPageComponent} from './pages/skills-page/skills-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReferencesPageComponent} from './pages/references-page/references-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    AboutMePageComponent,
    SkillsPageComponent,
    ReferencesPageComponent,
    ContactPageComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
