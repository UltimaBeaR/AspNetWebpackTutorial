// Определение основного angular компонента (компонент для отображения фразы hello world)

import { Component } from '@angular/core';

import template from './template.html';
import style from './style.scss';

@Component({
    selector: 'hello-world',
    template: template,
    styles: [style]
})
export class MainComponent {
    hello: string[];

    constructor() {
        this.hello = ['h', 'e', 'l', 'l', 'o'];
    }

    doSomething(text: string) {
        this.hello.push(text);
    }
}