import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from './hero.model';
import { HEROES } from './heroes/mock-heroes';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`

  private httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token'),
      }),
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.add('Hero Service: obtendo os herois')
    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl, this.httpOptions).pipe(
      tap((heroes) => this.log(`Obtido ${heroes.length} herois.`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    /*
    //return of(HEROES.find((hero) => hero.id === id));
    this.messageService.add(`Hero Service: obtendo o heroi id=${id}`)
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
    */
   const url = `${this.heroesUrl}/${id}`;
   return this.http.get<Hero>(url, this.httpOptions).pipe(
     tap(() => this.log(`Hero Service: obtendo o heroi id=${id}`)),
     catchError(this.handleError<Hero>('getHero'))
   );
  }

  updateHero(hero: Hero): Observable<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put<Hero>(url, hero, this.httpOptions).pipe(
      tap(()=> this.log(`Heroi com id = ${hero.id} atualizado`)),
      catchError(this.handleError<Hero>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) =>
          this.log(`Adicionado heroi com id = ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;

    //nesse caso não precisa passar o httpOptions
    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(() => this.log(`Removido heroi com id = ${hero.id}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?name${term}`;

    return this.http
    .get<Hero[]>(url, this.httpOptions)
    .pipe(
      tap((heroes) => heroes && heroes.length
        ? this.log(`Encontrado ${heroes.length} herois.`)
        : this.log(`A busca por ${term} não trouxe registros.`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //mostrar no console
      console.log(error);

      //mostrar em messages
      this.log(`${operation} failed: ${error.message}`);

      //retornar valor
      return of(result as T);
    };

  }
}
