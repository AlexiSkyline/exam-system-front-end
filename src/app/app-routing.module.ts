import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guards/admin.guard';
import { NormalGuard } from './services/guards/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuestionnairesComponent } from './pages/admin/view-questionnaires/view-questionnaires.component';
import { AddQuestionnaireComponent } from './pages/admin/add-questionnaire/add-questionnaire.component';
import { UpdateQuestionnaireComponent } from './pages/admin/update-questionnaire/update-questionnaire.component';
import { ViewQuestionnaireQuestionsComponent } from './pages/admin/view-questionnaire-questions/view-questionnaire-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuestionnaireComponent } from './pages/user/load-questionnaire/load-questionnaire.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [ AdminGuard ],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'category',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'questionnaires',
        component: ViewQuestionnairesComponent
      },
      {
        path: 'add-questionnaire',
        component: AddQuestionnaireComponent
      },
      {
        path: 'questionnaire/:id',
        component: UpdateQuestionnaireComponent
      },
      {
        path: 'view-questions/:id/:title',
        component: ViewQuestionnaireQuestionsComponent
      },
      {
        path: 'add-question/:id/:title',
        component: AddQuestionComponent
      },{
        path: 'update-question/:id',
        component: UpdateQuestionComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [ NormalGuard ],
    children: [
      {
        path: ':id',
        component: LoadQuestionnaireComponent
      },
      {
        path: 'instructions/:id',
        component: InstructionsComponent
      }
    ]
  },
  {
    path: 'start/:id',
    component: StartComponent,
    canActivate: [ NormalGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
