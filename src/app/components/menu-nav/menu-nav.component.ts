import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  @Input() dataToCronograma:Array<any>;
  constructor() { }

  ngOnInit(): void {
    console.log("datos entrantes");
  }

}
