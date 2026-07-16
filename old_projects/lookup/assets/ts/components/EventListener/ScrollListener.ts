import AbstractComponent from "../../bin/AbstractComponent";
import {SubscriberObjectInterface} from "../../bin/SubscriberInterface";
import {CssHelper} from "../../helper/CssHelper";

// link(navitem) to anchor(part) association
interface Link_AnchorObject {
    navItem: HTMLAnchorElement;
    part: HTMLElement;
    yPosition: number; // y-position on page
}

/**
 *  This class connects the functionality of manually scrolling and clicking on a nav-item link
 */
export default class ScrollListener extends AbstractComponent {
    readonly link_anchorArr: Array<Link_AnchorObject> = [];
    private currentLink_anchorEl: Link_AnchorObject;

    private blockScrollTrigger: boolean = false;

    constructor() {
        super();
        const navItems = document.querySelectorAll<HTMLAnchorElement>('.navbar-item');

        // associate navitem and part and push them to link_anchorArr
        navItems.forEach(navItem => {
            const part = document.getElementById(navItem.getAttribute('href').substr(1));

            if (part) {
                this.link_anchorArr.push({
                    navItem: navItem,
                    part: part,
                    yPosition: part.offsetTop - 52, // - 52px of static navbar height
                });
            }
        });

        // if there is a set anchor on load -> set nav item classes and currentlink_anchorEl
        const hash = window.location.hash;
        if (hash) {
            for(const index in this.link_anchorArr) {
                if (!this.link_anchorArr.hasOwnProperty(index)) {
                    continue;
                }

                // if link matches with hash break loop
                if (this.link_anchorArr[index].navItem.getAttribute('href') === hash) {
                    this.link_anchorArr[index].navItem.classList.add(CssHelper.ACTIVE_CLASS);
                    this.currentLink_anchorEl = this.link_anchorArr[index];

                    // set blockScrollTrigger and release it after one second
                    this.blockScrollTrigger = true;
                    setTimeout(() => {
                        this.blockScrollTrigger = false;
                    }, 1000);

                    break;
                }
            }
        }
    }

    // change procedure
    private changeLinkAnchorAction(target: Link_AnchorObject) {
        if (this.currentLink_anchorEl === target) {
            return;
        }

        // remove active class from the current nav item
        if (this.currentLink_anchorEl) {
            this.currentLink_anchorEl.navItem.classList.remove(CssHelper.ACTIVE_CLASS);
        }

        // set active class for the next nav item
        target.navItem.classList.add(CssHelper.ACTIVE_CLASS);

        // update current element and refresh url
        this.currentLink_anchorEl = target;
        history.replaceState({}, '', '#' + target.part.id);
    }


    run(): Promise<any> {
        return new Promise(resolve => {
            // when nav item is clicked pause scroll trigger
            this.link_anchorArr.forEach(link_anchorEl => {
                link_anchorEl.navItem.addEventListener('click', () => {
                    this.blockScrollTrigger = true;
                    this.changeLinkAnchorAction(link_anchorEl);

                    setTimeout(() => {
                        this.blockScrollTrigger = false;
                    }, 500);
               })
            });

            // handle scroll
            window.onscroll = (e: Event) => {
                e.preventDefault();

                if (this.blockScrollTrigger) {
                    return;
                }

                // is at end of page
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                    this.changeLinkAnchorAction(this.link_anchorArr[this.link_anchorArr.length - 1]);

                    return;
                }

                this.link_anchorArr.forEach(link_anchorEl => {
                    // calculate distance to current part
                    let distance = window.pageYOffset - link_anchorEl.yPosition;

                    // if the difference is in range between -75 to 75 then change
                    if (distance < 75 && distance > -75) {
                        this.changeLinkAnchorAction(link_anchorEl);
                    }
                });
            };

            resolve();
        });
    }

    getSubscriberEvent(): SubscriberObjectInterface {
        return {
            onLoad: true,
            priority: 1
        }
    }
}