import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.8)' }),
        animate(350, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(350, style({ opacity: 0, transform: 'scale(.8)' }))
      ])

    ])
  ]
})
export class LoaderComponent implements OnInit {

  @Input() show: boolean;

  constructor() { }

  ngOnInit() {
  }

}
