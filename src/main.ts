// import './style.css'
import './scss/style.scss'
import {homePage} from "./globals.ts";
import {getElementWrapper} from "./utils";

class Main {
    constructor() {
        console.log('MainClass constructor');
        homePage.init(getElementWrapper<HTMLDivElement>('#content'));
    }
}

new Main();



