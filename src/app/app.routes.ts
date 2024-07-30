import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { HelpComponent } from './help/help.component';
import { MixdWordsComponent } from './mixd-words/mixd-words.component';
import { ChooseYourGameComponent } from './choose-your-game/choose-your-game.component';
import { SortWordsComponent } from './sort-words/sort-words.component';
import { TeamSyncComponent } from './TeamSync/TeamSync.component';
import { TriviaComponent } from './trivia/trivia.component';
import { ChooseYourDialogComponent } from './choose-your-dialog/choose-your-dialog.component';

export const routes: Routes = [
    {path: "admin", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "", component: DashboardComponent},
    {path: "help", component: HelpComponent},
    {path: "mixd-words/:id", component: MixdWordsComponent},
    {path: "choose-your-game", component: ChooseYourGameComponent},
    {path: "sort-words/:id", component: SortWordsComponent},
    {path: "TeamSync", component: TeamSyncComponent},
    {path: "trivia/:id", component: TriviaComponent},
    {path: "choose-your-dialog", component: ChooseYourDialogComponent},
];
