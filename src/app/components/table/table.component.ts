import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  products$!: Observable<any>;

  constructor(private productStore: ProductStore) {

  }

  ngOnInit(): void {
    this.products$ = this.productStore.state$;
  }


}
