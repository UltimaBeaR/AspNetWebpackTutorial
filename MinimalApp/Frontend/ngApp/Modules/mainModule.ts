// Определение основного angular модуля

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainComponent } from '../Components/helloWorld/helloWorld';

@NgModule({
    imports: [BrowserModule],
    declarations: [MainComponent],
    bootstrap: [MainComponent]
})
export class MainModule { }