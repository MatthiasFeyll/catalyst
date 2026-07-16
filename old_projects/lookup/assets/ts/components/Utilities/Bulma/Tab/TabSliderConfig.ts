export default interface TabSliderConfig {
    /**
     * Index of column
     */
    i: any;

    /**
     * vector x0 | start position width
     */
    x0: number;

    /**
     * vector y0 | start position height
     */
    y0: number;

    /**
     * Set boolean true when screen touched
     */
    locked: boolean;

    /**
     *
     */
    dragged: boolean;

    /**
     * Current window width
     */
    w: any;

    /**
     * Initial animation position
     */
    ini: any;

    /**
     * Final animation position
     */
    fin: any;

    /**
     * Request animation ID
     */
    rID: any;

    /**
     * Actual number of frames
     */
    anf: number;

    /**
     * Transitions
     */
    readonly TFN: any;

    /**
     * Number of children
     */
    readonly N: number;

    /**
     * Number of Frames per slide
     */
    readonly NF: number;

    /**
     * Tab slider element
     */
    contentWrapper: HTMLElement;

    /**
     * Wrapper element of header columns
     */
    tabColumnHeader: NodeListOf<HTMLElement>;
}