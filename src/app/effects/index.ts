import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import { QuoteEffects } from './quote.effect';
import { AuthEffects } from './auth.effect';
;

export const effects = {
  quote: QuoteEffects,
  auth: AuthEffects,
};

@NgModule({
  imports: [
    EffectsModule.run(effects.quote),
    EffectsModule.run(effects.auth),
  ],
})
export class AppEffectsModule {
}
