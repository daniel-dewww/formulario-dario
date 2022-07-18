import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  constructor() { }

  transform(items: any[], searchText: string, searchKey?: string): any[] {
    return utilTransform(items, searchText, searchKey);
  }

}

export function utilTransform(items: any[], searchText: string, searchKey?: string): any[] {
  if (!items) return [];
  if (!searchText) return items;

  let lstSearchKey: string[] = []
  if (!searchKey && items?.length > 0) {
    for (var key in items[0]) {
      lstSearchKey.push(key)
    }
  }

  // TODO: need to improve this filter
  // only filter by searchKey if you put it

  if (searchKey) {
    console.log('searchKey')
    return items.filter(item => {
      if (item[searchKey]) {
        return item[searchKey].toLowerCase().includes(searchText.toLowerCase());
      }
    });
  } else {
    let addFilter: any[] = [];
    items.forEach(item => {
      let isIncludes: boolean = false
      lstSearchKey.forEach(key => {
        if (item[key] && item[key].toLowerCase().includes(searchText?.toLowerCase())) {
          isIncludes = true;
        }
      });
      if (isIncludes) {
        addFilter.push(item)
      }
    });

    return addFilter
  }
}
