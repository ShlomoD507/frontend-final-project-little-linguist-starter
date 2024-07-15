import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { HelpComponent } from './help/help.component';
import { MixdWordsComponent } from './mixd-words/mixd-words.component';
import { ChooseYourGameComponent } from './choose-your-game/choose-your-game.component';
import { SortWordsComponent } from './sort-words/sort-words.component';
import { TeamSyncComponent } from './TeamSync/TeamSync.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "Dashboard", component: DashboardComponent},
    {path: "help", component: HelpComponent},
    {path: "mixd-words", component: MixdWordsComponent},
    {path: "choose-your-game", component: ChooseYourGameComponent},
    {path: "sort-words", component: SortWordsComponent},
    {path: "TeamSync", component: TeamSyncComponent},
];
