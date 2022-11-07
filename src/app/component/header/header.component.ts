import { Component,EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() changeScheme = new EventEmitter<boolean>; 
  preferScheme : boolean = false
  constructor() { }

  ngOnInit() {}

  changeColorScheme(newBoolean: boolean){
    if(this.preferScheme != newBoolean && newBoolean){
      this.preferScheme = !this.preferScheme
      return  this.changeScheme.emit(this.preferScheme)
    }

    if(this.preferScheme != newBoolean && !newBoolean){
      this.preferScheme = !this.preferScheme
      return  this.changeScheme.emit(this.preferScheme)
    }
  }
}
