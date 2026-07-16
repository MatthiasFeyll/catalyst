import SubscriberInterface, {SubscriberObjectInterface} from "./SubscriberInterface";

export interface ComponentInterface {
    run(): Promise<any>;
}

export enum ComponentPriorityFlags {
    UNSET = -1,
}

export default abstract class AbstractComponent implements ComponentInterface, SubscriberInterface {
    abstract run(): Promise<any>;
    abstract getSubscriberEvent(): SubscriberObjectInterface;
}

