import Home from "./components/Home";
import Admin from "./components/Adminui";
import Forbidden from "./components/Forbiddenui"
import {store} from "./store/store";


export const routes = [
    {path: "", component: Home},
    {path: "/forbidden", component: Forbidden},
    {
         path: "/admin", 
         component: Admin,
         beforeEnter(to, from, next) {
             if(store.state.userData.roles.includes("admin")) {
                 next()
             } else {
                 next("/forbidden")
             }
         }
    }
]