export default interface SubscriberInterface {
    getSubscriberEvent(): SubscriberObjectInterface;
}


export interface SubscriberObjectInterface {
    /**
     * Component is getting loaded on window load event
     */
    onLoad: boolean;

    /**
     * Priority order. The lower the number the earlier its going to execute
     */
    priority?: number;

    /**
     * Delay before component getting executed
     */
    delay?: number;
}