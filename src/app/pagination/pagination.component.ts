import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPaginated, ISimplePaginated } from './paginated.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() data!: ISimplePaginated;
  @Output() get: EventEmitter<ISimplePaginated> = new EventEmitter();
  availableLimits: number[] = [10, 25, 50, 100];
  pagination!: ISimplePaginated;


  ngOnInit() {
    this.pagination = this.data
  }
  getTotalPages(): number {
    return Math.ceil(this.data.totaldata / this.data.limit);
  }

  getArrayFromTotalPages() : number[] {
    const total = this.getTotalPages();
    return Array.from({length: total}, (_, i) => i + 1);
  }

  changeLimit(limit: number) {
    this.pagination.limit = limit;
  }

  changePage(page: number) {
    this.pagination.page = page;

    this.get.emit(this.pagination);
  }
}
