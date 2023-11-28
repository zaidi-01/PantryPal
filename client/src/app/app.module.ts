import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { AdminModule } from 'src/admin/admin.module';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { anonymousGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AlertComponent } from './alert/alert.component';
import { AppComponent } from './app.component';
import { ApplicationPaths } from './app.constants';
import { FridgeComponent } from './fridge/fridge.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SharedModule } from 'src/shared/shared.module';

const buildRoutes = (appPaths: ApplicationPaths): Routes => [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: appPaths.fridge,
    component: FridgeComponent,
    canActivate: [anonymousGuard],
  },
  {
    path: appPaths.search,
    component: RecipeSearchComponent,
    canActivate: [anonymousGuard],
  },
  {
    path: `${appPaths.recipe}/:id`,
    component: RecipeComponent,
    canActivate: [anonymousGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FridgeComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeComponent,
    AlertComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    AdminModule,
    SharedModule,
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
