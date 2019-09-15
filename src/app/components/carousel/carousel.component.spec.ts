import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Passing pages', () => {

    let page0;
    let page1;
    let page2;
    let page3;

    beforeEach(() => {
      page0 = [
          { name: 'foo', url: 'foo.jpg', size: [''] },
          { name: 'foo', url: 'foo.jpg', size: [''] },
          { name: 'foo', url: 'foo.jpg', size: [''] },
          { name: 'foo', url: 'foo.jpg', size: [''] },
        ];

      page1 = [
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
      ];

      page2 = [
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
      ];

      page3 = [
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
        { name: 'foo', url: 'foo.jpg', size: [''] },
      ];

      component.pages = [page0, page1, page2, page3];
    });

    it('should move to page two when on first page', () => {
      component.setPage(0);
      expect(component.currentPage).toEqual(page0);

      component.setPage(1);
      expect(component.currentPage).toEqual(page1);
    });

    it('should move to page first page, index out of array', () => {
      component.setPage(4);
      expect(component.currentPage).toEqual(page0);
    });

    it('should move to page last page, when back in first page', () => {
      component.setPage(-1);
      expect(component.currentPage).toEqual(page3);
    });

  });
});
