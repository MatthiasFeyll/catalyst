import AbstractComponent from "./AbstractComponent";

export default interface ComponentResolveInterface {
    /**
     * resolved component onLoad loaded?
     */
    onLoad: boolean;

    /**
     * resolved component
     */
    component: AbstractComponent;

    /**
     * resolved data
     */
    resolve: any;
}