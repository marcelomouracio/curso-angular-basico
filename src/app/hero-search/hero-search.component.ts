import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  //templateUrl: './hero-search.component.html',
  //styleUrls: ['./hero-search.component.css']
  template: `
    <app-search-input (search)="onSearch($event)"></app-search-input>

    <ul class="list-group">
      <li class="list-group-item" *ngFor="let hero of heroes$ | async">
        <a routerLink="heroes/{{ hero.id }}">
          {{ hero.name }}
        </a>
      </li>
    </ul>
  `
})
export class HeroSearchComponent implements OnInit {
  //nome_variavel$, o $ no final é uma convenção de que a variavel é um observable
  heroes$: Observable<Hero[]>;
  //sbject é um observable que escuta e emite eventos
  private searchTems = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSearch(term: string) {
    //.next é para atribuir ao SearchTerms a busca,
    this.searchTems.next(term);
  }

  getHeroes() {
    this.heroes$ = this.searchTems.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
