import AbstractComponent from "../../../../bin/AbstractComponent";
import {SubscriberObjectInterface} from "../../../../bin/SubscriberInterface";
import {NAV_BACKGROUND_CONTAINER, NavCssClasses} from "../../../../helper/NavbarHelper";
import {CssHelper} from "../../../../helper/CssHelper";


export default class NavbarOpener extends AbstractComponent {
    private navBackground: HTMLElement;

    constructor() {
        super();
    }

    private showNavBackground() {
        this.navBackground.classList.remove(CssHelper.HIDE_CLASS);
    }

    // import nav objects from dom
    private importNavObjects() {
        this.navBackground = document.getElementById(NAV_BACKGROUND_CONTAINER);
    }


    // copied template from https://bulma.io/documentation/components/navbar/
    run(): Promise<any> {
        return new Promise(resolve => {

            this.importNavObjects();

            // Get all "navbar-burger" elements
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {
                // Add a click event on each of them
                $navbarBurgers.forEach((el: HTMLElement) => {
                    el.addEventListener('click', () => {

                        // Get the target from the "data-target" attribute
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);

                        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                        this.showNavBackground();
                    });
                });
            }
            resolve();
        });
    }

    getSubscriberEvent(): SubscriberObjectInterface {
        return {
            priority: 1,
            onLoad: true
        };
    }
}