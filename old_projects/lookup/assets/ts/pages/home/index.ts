// import scss
import "~/scss/pages/home/index.scss";

import ComponentLoader from "../../bin/ComponentLoader";
import NavbarOpener from "../../components/Utilities/Bulma/Navbar/NavbarOpener";
import NavbarCloser from "../../components/Utilities/Bulma/Navbar/NavbarCloser";
import ScrollListener from "../../components/EventListener/ScrollListener";
import BulmaTabSlider from "../../components/Utilities/Bulma/Tab/TabSlider";

/*******************************************************
 *                      Utilities
 *******************************************************/
const navbarCloser = new NavbarCloser();

const navbarOpener = new NavbarOpener();

const bulmaTab = new BulmaTabSlider();

/*******************************************************
 *                   Event listener
 *******************************************************/
const scrollListener = new ScrollListener();


/*******************************************************
 *                  Register components
 *******************************************************/
ComponentLoader.getInstance().register(navbarOpener);
ComponentLoader.getInstance().register(navbarCloser);
ComponentLoader.getInstance().register(scrollListener);
ComponentLoader.getInstance().register(bulmaTab);
