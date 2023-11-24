import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { AdminModule } from 'src/admin/admin.module';
import { ScrollingModule } from '@angular/cdk/scrolling'; 
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AppComponent } from './app.component';
import { ApplicationPaths } from './app.constants';
import { FridgeComponent } from './fridge/fridge.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeComponent } from './recipe/recipe.component';

const buildRoutes = (appPaths: ApplicationPaths): Routes => [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: appPaths.fridge, component: FridgeComponent },
  { path: appPaths.search, component: RecipeSearchComponent },
  { path: `${appPaths.recipe}/:id`, component: RecipeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FridgeComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    AdminModule,
    ScrollingModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    ApiAuthorizationModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: ApplicationPaths, useClass: ApplicationPaths },
    {
      provide: ROUTES,
      useFactory: buildRoutes,
      deps: [ApplicationPaths],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
