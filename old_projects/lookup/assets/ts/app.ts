// import all scss
import '~/scss/app.scss';



// import own components
import ComponentLoader from "./bin/ComponentLoader";


// load components
window.onload = async () => {
    await ComponentLoader.getInstance().load();
}
