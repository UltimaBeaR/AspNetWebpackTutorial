// Определение необходимых вещей, без которых angular работать не захочет

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Определение основного angular компонента (компонент для отображения фразы hello world)

import { Component } from '@angular/core';

@Component({
    selector: 'hello-world',
    template: `<h1>Hello world from {{name}}!</h1>`
})
class HelloWorldComponent { name = 'angular'; }

// Определение основного angular модуля

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [BrowserModule],
    declarations: [HelloWorldComponent],
    bootstrap: [HelloWorldComponent]
})
class HelloWorldModule { }

// Загрузка angular приложения (указывается основной angular модуль для загрузки)

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(HelloWorldModule);