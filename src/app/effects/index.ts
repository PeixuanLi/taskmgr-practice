import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effect';
import {QuoteEffects} from './quote.effect';
import {ProjectEffects} from './project.effect';
import {TaskListEffects} from './task-list.effect';
import {TaskEffects} from './task.effect';
import {UserEffects} from './user.effect';

export const effects = {
  auth: AuthEffects,
  quote: QuoteEffects,
  projects: ProjectEffects,
  tasklists: TaskListEffects,
  tasks: TaskEffects,
  users: UserEffects
};

@NgModule({
  imports: [
    EffectsModule.run(effects.auth),
    EffectsModule.run(effects.quote),
    EffectsModule.run(effects.projects),
    EffectsModule.run(effects.tasklists),
    EffectsModule.run(effects.tasks),
    EffectsModule.run(effects.users),
  ],
})
export class AppEffectsModule {
}
