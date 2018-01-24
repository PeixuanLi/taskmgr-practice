import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private store$ : Store<fromRoot.State>){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuth();
    }

    checkAuth(): Observable<boolean> {
        return this.store$
            .select(s => s.auth)
            .map(auth => {
                const result = auth.token !== undefined && auth.token !== null;
                if (!result) {
                    this.store$.dispatch(go(['/login']));
                }
                return result;
            })
            .defaultIfEmpty(false);
    }
}
