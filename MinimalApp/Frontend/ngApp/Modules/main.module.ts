// Определение основного angular модуля

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HelloWorldComponent } from 'ngApp/Components/hello-world/hello-world.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [HelloWorldComponent],
    bootstrap: [HelloWorldComponent],
})
export class MainModule { }