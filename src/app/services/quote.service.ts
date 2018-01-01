import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Quote } from '../domain/quote';


@Injectable()
export class QuoteService {
  // private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(@Inject('BASE_CONFIG') private config,
              private http: Http) {
  }

  getQuote(): Observable<Quote> {
    const url = `${this.config.url}/quotes/${Math.floor(Math.random() * 8)}`;
    
    return this.http.get(url)
      .debug('quote:')
      .map(res => res.json());
  }
}
