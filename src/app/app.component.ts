import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.changeDarkMode()
  }

  prefersColorScheme(theme:boolean){
    if(theme){
      document.body.setAttribute('color-theme','dark');
    }else{
      document.body.setAttribute('color-theme','light')
    }
    console.log(theme)
  }

  changeDarkMode(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches){
      }
  }
}
