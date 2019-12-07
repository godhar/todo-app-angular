import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Todo, TodoEntry} from '../models/todo.model';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosResolverService implements Resolve<Todo[]>  {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    console.log('resolver called');
    return this.http.get('api/todos/')
      .pipe(
        catchError(err => {
          console.error(err);
          return this.handleError();
        }),
        map( (res: Todo[]) => {
          console.log(res)
          if (res) {
            return res.map(( t ) => {
              return new TodoEntry().deserialize( t );
            }
            );
          } else {
            return this.handleError();
          }
        })
      );
  }


  handleError(): Observable<boolean[]> {
    // this.router.navigate(['/not-found']);
    return of([false]);
  }
}
