import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
  name: 'searchProject',
  standalone: true
})
export class SearchProjectPipe implements PipeTransform {

  transform(pipeData: any, filter: string): any[] {
    const filterValue = filter.toLowerCase();
    return filterValue ?
      pipeData.filter((item: { [x: string]: string; }) => item['name'].toLowerCase().includes(filterValue)) : pipeData;
    };
}

