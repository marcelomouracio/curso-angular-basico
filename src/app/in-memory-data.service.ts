import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const heroes: Hero[] = [
      {id: 1, name: "Thor"},
      {id: 2, name: "Hulk"},
      {id: 3, name: "Homem de Ferro"},
      {id: 4, name: "Mulher Maravilha"},
      {id: 5, name: "Pantera Negra"},
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    // [1,2,3,4,5]
    const listaHeroisComIds = heroes.map(hero => hero.id);
    //...listaHeroisComIds => 1,2,3,4,5 - o operador "..." retorna apenas os valores e não o array
    //Math.max(1,2,3,4,5);
    const valorMaxId = Math.max(...listaHeroisComIds);

    return heroes.length > 0 ? valorMaxId + 1 : 1;
  }

}
