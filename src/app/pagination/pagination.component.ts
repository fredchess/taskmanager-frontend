import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPaginated, ISimplePaginated } from './paginated.model';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, RouterModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() data!: ISimplePaginated;
  @Output() paginate: EventEmitter<ISimplePaginated> = new EventEmitter();
  availableLimits: number[] = [2, 10, 25, 50, 100];
  pagination!: ISimplePaginated;

  constructor(
    private router: Router
  )
  {

  }


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

  changeLimit(event: any) {
    this.pagination.limit = event.target.value;
    this.paginate.emit(this.pagination)
  }

  changePage(page: number) {
    this.pagination.page = page
    this.paginate.emit(this.pagination)
  }

  prev() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
      this.paginate.emit(this.pagination);
    }
  }

  next() {
    if (this.pagination.page < this.getTotalPages()) {
      this.pagination.page++;
      this.paginate.emit(this.pagination);
    }
  }
}
