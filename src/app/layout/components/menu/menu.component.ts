import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppMenuConfig } from './app-menu-cofig';
import { MenuItem } from './menu-item';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
    menu: MenuItem[] = [];

    menuOpened: boolean = false;
    activeMenu: any;
    mostrarCalendario: boolean = true;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.initMenu();
        this.searchMenu();
    }

    initMenu() {
        let configMenu = new AppMenuConfig();
        this.menu = configMenu.MENU;
    }

    searchMenu(): void {
        const auxMenu = new AppMenuConfig().MENU;
        this.activeMenu = auxMenu.filter((f) => window.location.pathname.indexOf(f.label.toLowerCase()) >= 0)[0];
    }

    openMenu(menuSelected: any, event: Event) {
        this.activeMenu = menuSelected;
        if (menuSelected.label === 'Calendário') {
            this.menuOpened = true;
            this.mostrarCalendario = true;
        } else {
            if (menuSelected.submenus?.length > 0) {
                this.menuOpened = true;
                this.mostrarCalendario = false;
            } else {
                if (menuSelected.link) this.router.navigate([menuSelected.link]);
                this.menuOpened = false;
                this.mostrarCalendario = false;
            }
        }

        event.stopPropagation();
    }

    closeMenu() {
        this.menuOpened = false;
        this.searchMenu();
    }

    isMenuActive(menu: any) {
        // return this.activeMenu.label.indexOf(link.toLowerCase()) >= 0;
        return this.activeMenu?.label === menu.label;
    }

    goToPage(menu: any) {
        this.router.navigate([menu.link]);
        this.menuOpened = false;
    }

    logout() {
        // this.loginService.logout();
        this.router.navigate(['/login']);
    }
}
