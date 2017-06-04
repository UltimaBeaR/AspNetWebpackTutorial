// Определение необходимых вещей, без которых angular работать не захочет

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Глобальные стили
import './styles/global.scss';

// Загрузка angular приложения (указывается основной angular модуль для загрузки)

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainModule } from './ngApp/Modules/mainModule';

platformBrowserDynamic().bootstrapModule(MainModule);