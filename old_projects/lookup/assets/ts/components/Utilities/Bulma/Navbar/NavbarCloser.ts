import AbstractComponent from "../../../../bin/AbstractComponent";
import {SubscriberObjectInterface} from "../../../../bin/SubscriberInterface";
import {NAV_BACKGROUND_CONTAINER, NavCssClasses} from "../../../../helper/NavbarHelper";
import {CssHelper} from "../../../../helper/CssHelper";


export default class NavbarCloser extends AbstractComponent {
    private navItems: HTMLCollectionOf<Element>;
    private navDropdownIcon: Element;
    private navMenuContainer: Element;
    private navBackground: HTMLElement;


    // import nav objects from dom
    private importNavObjects() {
        this.navItems = document.getElementsByClassName(NavCssClasses.NAV_ITEMS_CLASS_NAME);
        this.navDropdownIcon = document.getElementsByClassName(NavCssClasses.NAV_DROPDOWN_ICON)[0];
        this.navMenuContainer = document.getElementsByClassName(NavCssClasses.NAV_MENU_CONTAINER)[0];

        this.navBackground = document.getElementById(NAV_BACKGROUND_CONTAINER);
    }

    /**
     * Handle nav item click
     */
    private closeOnNavItemClick() {
        for (let navItemsKey in this.navItems) {
            if (!this.navItems.hasOwnProperty(navItemsKey)) {
                continue;
            }

            this.navItems[navItemsKey].addEventListener("click", () => {
                this.hideNavItems();
                this.hideNavBackground();
            })
        }
    }

    /**
     * Handle background click
     */
    private closeOnBackgroundClick() {
        this.navBackground.addEventListener('click', () => {
            if (!this.navBackground.classList.contains(CssHelper.HIDE_CLASS)) {
                this.hideNavItems();
                this.hideNavBackground();
            }
        })
    }


    /*******************************************
     *               Action methods
     ******************************************/
    private hideNavItems() {
        this.navDropdownIcon.classList.remove(CssHelper.ACTIVE_CLASS);
        this.navMenuContainer.classList.remove(CssHelper.ACTIVE_CLASS);
    }

    private hideNavBackground() {
        this.navBackground.classList.add(CssHelper.HIDE_CLASS);
    }

    private setEscapeTrigger() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                this.hideNavItems();
                this.hideNavBackground();
            }
        });
    }


    run(): Promise<any> {
        return new Promise(resolve => {
            // import objects
            this.importNavObjects();

            this.closeOnNavItemClick();
            this.closeOnBackgroundClick();
            this.setEscapeTrigger();

            resolve();
        });
    }

    getSubscriberEvent(): SubscriberObjectInterface {
        return {
            onLoad: true,
            priority: 5
        };
    }
}