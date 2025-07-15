import {Article} from '../model/article';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'articles',
  standalone: true
})
export class ArticlesPipe implements PipeTransform {

  transform(items: Array<Article>, code: string, name: string, categoryId: string): any {
    return items.filter(item => {
      const codeMatches = code === undefined || code === '' || item.code.toUpperCase().indexOf(code.toUpperCase()) >= 0;
      const nameMatches = name === undefined || name === '' || item.name.toUpperCase().indexOf(name.toUpperCase()) >= 0;
      const categoryIdMatches = categoryId === undefined || categoryId === '' || item.categoryId ==   parseInt(categoryId);
      return codeMatches && nameMatches && categoryIdMatches;
    });
  }

}
