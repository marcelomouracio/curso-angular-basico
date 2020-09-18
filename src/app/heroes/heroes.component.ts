import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero.model';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes: Hero[];

  filter = '';

  /*
  // lista de heroes passou a ser consumida do serviço
  hero: Hero = {
    id: 1,
    name: 'Thor',
  }

  heroes = HEROES
  */

  //constructor(private heroService: HeroService, private messageService: MessageService) { }
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  //não utilizado
  /*
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selecionado hero id = ${hero.id}`);
    //sintaxe Javascript
    //this.messageService.add(`HeroesComponent: Selecionado hero id = + hero.id`);
  }
  */

  getHeroes(){
    //chamada síncrona
    //this.heroes = this.heroService.getHeroes();

    //chamada assincrona via observable no service
    this.heroService.getHeroes().subscribe((heroesBE) => (this.heroes = heroesBE));
  }

  onAdd(name: string) {
    this.heroService.addHero({name} as Hero).subscribe((hero) => {
      if (hero) {
        this.heroes.push(hero);
      }
    });
    //{name: name} equivalente a { name } pois a chave tem o mesmo valor da variável referente ao valor
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe((response) => {
      if (typeof response !== 'undefined') {
        this.heroes = this.heroes.filter((heroItem) => heroItem !== hero);
      }
    });
  }

  onFilter(term: string) {
    this.filter = term;
  }
}
