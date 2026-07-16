import AbstractComponent from "../../../assets/ts/bin/AbstractComponent";
import {SubscriberObjectInterface} from "../../../assets/ts/bin/SubscriberInterface";

export default class TestComponent extends AbstractComponent {
    public loaded: boolean = false;

    constructor(private onLoad: boolean,
                private priority: number,
                private delay: number = 0
    ) {
        super();
    }

    run(): Promise<number> {
        this.loaded = false;

        return new Promise(resolve => {
            this.loaded = true;
            resolve(this.priority);
        });
    }

    getSubscriberEvent(): SubscriberObjectInterface {
        return {
            onLoad: this.onLoad,
            delay: this.delay,
            priority: this.priority
        };
    }
}