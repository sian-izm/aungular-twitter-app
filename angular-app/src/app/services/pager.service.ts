import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PagerService {
  getPager(currentPage: number = 1, pageSize: number = 10) {
    let nextPage: number
    let previousPage: number;

    if (currentPage < 1) {
      currentPage = 1;
    }
    if (pageSize >= 10) {
      nextPage = currentPage + 1
    }
    if (currentPage !== 1) {
      previousPage = currentPage - 1
    }
    return {
      currentPage: currentPage,
      nextPage: nextPage,
      previousPage: previousPage,
    };
  }
}
