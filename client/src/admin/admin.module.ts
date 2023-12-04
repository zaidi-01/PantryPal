import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/api-authorization/authorize.guard';
import { ApplicationPaths } from 'src/app/app.constants';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSessionIndicatorComponent } from './admin-session-indicator/admin-session-indicator.component';
import { AdminComponent } from './admin.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailsEditComponent } from './recipe-details-edit/recipe-details-edit.component';
import { RecipeIdInputComponent } from './recipe-id-input/recipe-id-input.component';

const buildRoutes = (appPaths: ApplicationPaths): Routes => [
  {
    path: appPaths.admin,
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: appPaths.createRecipe,
        component: CreateRecipeComponent,
      },
      {
        path: appPaths.editRecipe,
        component: EditRecipeComponent,
      },
      {
        path: appPaths.deleteRecipe,
        component: DeleteRecipeComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminSessionIndicatorComponent,
    RecipeIdInputComponent,
    CreateRecipeComponent,
    EditRecipeComponent,
    DeleteRecipeComponent,
    RecipeDetailsEditComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule.forChild([]),
  ],
  providers: [
    { provide: ApplicationPaths, useClass: ApplicationPaths },
    {
      provide: ROUTES,
      useFactory: buildRoutes,
      deps: [ApplicationPaths],
      multi: true,
    },
  ],
  exports: [AdminSessionIndicatorComponent],
})
export class AdminModule {}
