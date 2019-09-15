import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../models/Product.model';
import { chunk } from 'lodash';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('picture', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0  }),
        animate('350ms 250ms', style({ transform: 'translateX(0) ', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0) translateY(-200%)', opacity: 1 }),
        animate(250, style({ transform: 'translateX(100%) translateY(-200%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public items: Array<Product>;
  @Input() public itemPerPage = 4;

  public pages: Array<Array<Product>>;
  public currentPage: Array<Product>;
  public currentPageIndex: number;

  public pause = false;
  private intervalId: number;

  constructor() { }

  ngOnInit() {
    let nextPage = 1;
    this.intervalId = setInterval(() => {
      if (!this.pause && this.currentPageIndex !== nextPage) {
        this.setPage(nextPage);
        nextPage = this.currentPageIndex + 1;
      }
    }, 2400);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.pages = chunk(this.items, this.itemPerPage);
      this.setPage(0);
    }
  }

  public setPage(index: number = 0) {

    if (this.pages.length <= index) {
      this.currentPageIndex = 0;

    } else if (index < 0 ) {
      this.currentPageIndex = this.pages.length - 1;

    } else {
      this.currentPageIndex = index;
    }

    this.currentPage = this.pages[this.currentPageIndex];
  }

}
