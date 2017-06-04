// Определение основного angular компонента (компонент для отображения фразы hello world)

import { Component } from '@angular/core';

import template from "./hello-world.component.html";
import style from './hello-world.component.scss';

@Component({
    selector: 'hello-world',
    template: template,
    styles: [style]
})
export class HelloWorldComponent {
    hello: string[];

    constructor() {
        this.hello = ['h', 'e', 'l', 'l', 'o'];
    }

    doSomething(text: string) {
        this.hello.push(text);
    }
}