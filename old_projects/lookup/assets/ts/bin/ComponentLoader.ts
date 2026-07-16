import AbstractComponent, {ComponentPriorityFlags} from "./AbstractComponent";
import SubscriberInterface from "./SubscriberInterface";
import ComponentResolveInterface from "./ComponentResolveInterface";

/**
 * Singleton
 */
export default class ComponentLoader {
    /***********************************************
     *          Singleton design pattern
     ***********************************************/
    private static instance: ComponentLoader;

    public static getInstance(): ComponentLoader {
        if (!ComponentLoader.instance) {
            ComponentLoader.instance = new ComponentLoader();
        }

        return ComponentLoader.instance;
    }

    /***********************************************
     *                   Class
     ***********************************************/
    private registeredComponents: Array<AbstractComponent>;

    constructor() {
        this.registeredComponents = new Array<AbstractComponent>();
    }

    public register(component: AbstractComponent): void {
        this.registeredComponents.push(component);
    }

    /**
     * @description Load all registered components separated by onLoad and sorted by priority
     */
    public load(): Promise<ComponentResolveInterface[]> {
        return new Promise(async (resolve) => {
            let onLoadComponents = this.registeredComponents.filter((subscriber: SubscriberInterface) => subscriber.getSubscriberEvent().onLoad);
            let afterLoadComponents = this.registeredComponents.filter((subscriber: SubscriberInterface) => !subscriber.getSubscriberEvent().onLoad);

            // sort by priority
            onLoadComponents.sort(ComponentLoader.sortByPriorityFunction);
            afterLoadComponents.sort(ComponentLoader.sortByPriorityFunction);

            // resolve array
            let componentsResolve: ComponentResolveInterface[] = [];

            // run on load components
            for(const component of onLoadComponents) {
                const data = await this.loading(component)
                componentsResolve.push({
                    onLoad: true,
                    component: component,
                    resolve: data
                } as ComponentResolveInterface);
            }

            resolve(componentsResolve);

            // run after load components
            for(const component of afterLoadComponents) {
                await this.loading(component);
            }
        })
    }

    private loading(component: AbstractComponent) {
        return new Promise(resolve => {
            setTimeout(async () => {
                 resolve(await component.run());
            }, component.getSubscriberEvent().delay)
        })
    }

    /**
     * @description sort by priority
     * @param {ComponentInterface} componentA
     * @param {ComponentInterface} componentB
     */
    private static sortByPriorityFunction(componentA: SubscriberInterface, componentB: SubscriberInterface): number {
        if (componentB.getSubscriberEvent().priority == ComponentPriorityFlags.UNSET) {
            return -1;
        }

        if (componentA.getSubscriberEvent().priority < componentB.getSubscriberEvent().priority) {
            return -1
        }

        if (componentA.getSubscriberEvent().priority > componentB.getSubscriberEvent().priority) {
            return 1
        }

        return 0;
    }
}