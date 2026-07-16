import AbstractComponent from "../../../../bin/AbstractComponent";
import {SubscriberObjectInterface} from "../../../../bin/SubscriberInterface";

import "~/scss/components/BulmaTabSlider.scss";
import {CssHelper} from "../../../../helper/CssHelper";

class TabContent {
    private elements: NodeListOf<HTMLElement>;
    constructor() {
        this.elements = document.querySelectorAll(".content-tab")
    }

    hideAll() {
        this.elements.forEach(el => el.classList.remove(CssHelper.ACTIVE_CLASS));
    }
}

class TabHeader {
    public elements: NodeListOf<HTMLElement>;
    constructor() {
        this.elements = document.querySelectorAll(".tab-header")
    }

    hideAll() {
        this.elements.forEach(el => el.classList.remove(CssHelper.ACTIVE_CLASS));
    }
}


export default class TabSlider extends AbstractComponent {
    private tabContents: TabContent;
    private tabHeaders: TabHeader;

    constructor() {
        super();

        this.tabHeaders = new TabHeader();
        this.tabContents = new TabContent();
    }

    run(): Promise<any> {
        return new Promise(resolve => {
            this.tabHeaders.elements.forEach((tabHeader: HTMLElement) => {
                tabHeader.addEventListener("click", evt => {
                    this.tabContents.hideAll();
                    document.getElementById(tabHeader.dataset.target).classList.add(CssHelper.ACTIVE_CLASS);

                    this.tabHeaders.hideAll();
                    tabHeader.classList.add(CssHelper.ACTIVE_CLASS);
                })
            });
            resolve();
        })
    }

    getSubscriberEvent(): SubscriberObjectInterface {
        return {
            onLoad: false
        };
    }
}