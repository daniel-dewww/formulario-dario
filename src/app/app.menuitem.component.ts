import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { AppMainComponent } from './app.main.component';

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-menuitem]',
    /* tslint:enable:component-selector */
    template: `
          <ng-container>
              <a [attr.href]="item.url" (click)="itemClick($event)" *ngIf="(!item.state || item.children) && item.visible !== false"
                 (mouseenter)="onMouseEnter()" (keydown.enter)="itemClick($event)"
                [attr.target]="item.target" [attr.tabindex]="0" [ngClass]="item.class">
                  <span class="menuitem-text">{{item.state}}</span>
                  <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.children"></i>
                  <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
              </a>
              <a (click)="itemClick($event)" (mouseenter)="onMouseEnter()" *ngIf="(item.state && !item.children) && item.visible !== false"
                  [routerLink]="item.state" routerLinkActive="active-menuitem-routerlink" [ngClass]="item.class"
                  [routerLinkActiveOptions]="{exact: !item.preventExact}" [attr.target]="item.target" [attr.tabindex]="0">
                  <span class="menuitem-text">{{item.state}}</span>
                  <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.children"></i>
                  <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
              </a>
              <ul *ngIf="(item.children && active) && item.visible !== false" [@children]="(appMain.isHorizontal() && root) ? (active ? 'visible' : 'hidden') :
              (active ? 'visibleAnimated' : 'hiddenAnimated')">
                  <ng-template ngFor let-child let-i="index" [ngForOf]="item.children">
                      <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
                  </ng-template>
              </ul>
          </ng-container>
      `,
    host: {
        '[class.active-menuitem]': 'active'
    },
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px'
            })),
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    @Input() root: boolean;

    @Input() parentKey: string;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string;

    constructor(public appMain: AppMainComponent, public router: Router, private cd: ChangeDetectorRef, private menuService: MenuService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.appMain.isHorizontal()) {
                    this.active = false;
                } else {
                    if (this.item.state) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
            });
    }

    ngOnInit() {
        if (!this.appMain.isHorizontal() && this.item.state) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.state[0], !this.item.children && !this.item.preventExact);
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // navigate with hover in horizontal mode
        if (this.root) {
            this.appMain.menuHoverActive = !this.appMain.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.children) {
            this.active = !this.active;
        } else {
            // activate item
            this.active = true;

            // hide overlay menus
            if (this.appMain.isMobile()) {
                this.appMain.sidebarActive = false;
                this.appMain.menuMobileActive = false;
            }

            // reset horizontal menu
            if (this.appMain.isHorizontal()) {
                this.menuService.reset();
            }
        }
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root && this.appMain.menuHoverActive && this.appMain.isHorizontal() && this.appMain.isDesktop()) {
            this.menuService.onMenuStateChange(this.key);
            this.active = true;
        }
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
