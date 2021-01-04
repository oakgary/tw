// ==UserScript==
// @name       Massenraubzug
// @namespace  oakgary
// @description  
// @copyright  oakgary
// @include    https://de*.die-staemme.de/game.php*mode=scavenge_mass*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

win.$.ajaxSetup({ cache: true });
win.$.getScript('https://oakgary.github.io/tw/rz_mass_uglified.js');