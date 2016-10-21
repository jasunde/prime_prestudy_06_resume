(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
  var item = $('header h1').first(),
      title = item.text(),
      newTitle = '',
      i = 0;

  addToString(0, newTitle);

  function addToString(ind, newTitle) {
    scramble(title[ind], newTitle);
  }

  // char string
  function scramble(char, str) {
    var x = char;
    var timer = setInterval(function () {
      if (i > 0) {
        str = str.substr(0, str.length - 1);
      }
      if (i === 2) {
        clearInterval(timer);
        i = 0;
        str += x;
        item.text(str);
        if (str.length < title.length) {
          addToString(str.length, str);
        }
      } else {
        char = alterCharacter(char);
        str += char;
        item.text(str);
        if (item.css('visibility') === 'hidden') item.css('visibility', 'visible');
        i++;
      }
    }, 30);
  }

  // string -> string
  function alterCharacter(char) {
    var rand = Math.floor(Math.random() * 10);
    return String.fromCharCode(char.charCodeAt(0) + rand);
  }

  var spriteList = $('.sprites'),
      sprites = spriteList.find('li'),
      hiddenSprites = sprites.slice(4).detach(),
      num = 4,
      i = 0;

  setInterval(function () {
    var el = $('.sprites li').eq(i);
    i = (i + 1) % 4;
    $({ deg: 0 }).animate({ deg: 90 }, {
      duration: 600,
      step: function step(now) {
        el.css({
          transform: 'rotateY(' + now + 'deg)'
        });
      },
      complete: function complete() {
        var newEl = sprites.eq(num);
        num = (num + 1) % (sprites.length - 4);
        el.before(newEl).detach();
        $({ deg: 90 }).animate({ deg: 0 }, {
          duration: 600,
          step: function step(now) {
            newEl.css({
              transform: 'rotateY(' + now + 'deg)'
            });
          }
        });
      }
    });
  }, 2000);

  var main = $('main');
  var hide = $('button');

  hide.on('click', function (e) {
    $(this).text(main.css('display') === 'none' ? 'Hide the Resume' : 'Show the Resume');
    main.toggle();
  });
});

},{}]},{},[1]);
