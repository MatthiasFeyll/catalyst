import AbstractComponent from "bin/AbstractComponent";
import ScrollListener from "components/EventListener/ScrollListener";

test('ScrollListener', () => {
   const test = new ScrollListener();

   expect (test).toBeInstanceOf(AbstractComponent);
});