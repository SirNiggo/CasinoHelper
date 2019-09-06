import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  opened: boolean;
  menuIconName = "menu";

  openFreepikLink(event: Event) {
    event.preventDefault();
    window.open("https://www.freepik.com/kjpargeter");
  }

  ngOnInit(): void {
    this.sidenav.openedChange.subscribe((status) => {
      this.opened = status;
    });
    this.sidenav.openedStart.subscribe(() => {
      this.menuIconName = "menu_open";
    });
    this.sidenav.closedStart.subscribe(() => {
      this.menuIconName = "menu";
    });
  }

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
