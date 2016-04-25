var LETTER_G = 'M3,3.9h2.9v1.7c0,0.9-0.3,1.6-0.9,2.1C4.5,8.4,3.8,8.7,3,8.7c-0.7,0-1.2-0.2-1.6-0.5c-0.4-0.3-0.8-0.6-1-1C0.3,7,0.2,6.9,0.2,6.8c0-0.1-0.1-0.3-0.1-0.5C0,6,0,5.3,0,4.3c0-1,0-1.7,0.1-2C0.1,2,0.2,1.7,0.4,1.5c0.2-0.4,0.5-0.7,1-1.1C1.8,0.2,2.3,0,3,0c0.8,0,1.4,0.3,2,0.7c0.5,0.5,0.8,1.1,1,1.8H4.5C4.4,2.2,4.2,1.9,4,1.6C3.7,1.4,3.4,1.3,3,1.3c-0.3,0-0.5,0.1-0.8,0.2C2,1.6,1.8,1.7,1.7,1.9C1.5,2.1,1.4,2.3,1.3,2.6C1.3,2.9,1.3,3.5,1.3,4.3s0,1.4,0.1,1.7c0.1,0.3,0.2,0.5,0.3,0.7C1.8,6.9,2,7.1,2.2,7.2C2.4,7.3,2.7,7.4,3,7.4c0.5,0,0.9-0.2,1.2-0.5c0.3-0.3,0.5-0.8,0.5-1.3V5.1H3V3.9z';

var SVGGraphics = require('pixi-svg-graphics');

var SVG_G = '<svg version="1.1" id="svg_g" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="5.9px" height="8.7px" viewBox="0 0 5.9 8.7" enable-background="new 0 0 5.9 8.7" xml:space="preserve"><path fill="red" d="M3,3.9h2.9v1.7c0,0.9-0.3,1.6-0.9,2.1C4.5,8.4,3.8,8.7,3,8.7c-0.7,0-1.2-0.2-1.6-0.5c-0.4-0.3-0.8-0.6-1-1C0.3,7,0.2,6.9,0.2,6.8c0-0.1-0.1-0.3-0.1-0.5C0,6,0,5.3,0,4.3c0-1,0-1.7,0.1-2C0.1,2,0.2,1.7,0.4,1.5c0.2-0.4,0.5-0.7,1-1.1C1.8,0.2,2.3,0,3,0c0.8,0,1.4,0.3,2,0.7c0.5,0.5,0.8,1.1,1,1.8H4.5C4.4,2.2,4.2,1.9,4,1.6C3.7,1.4,3.4,1.3,3,1.3c-0.3,0-0.5,0.1-0.8,0.2C2,1.6,1.8,1.7,1.7,1.9C1.5,2.1,1.4,2.3,1.3,2.6C1.3,2.9,1.3,3.5,1.3,4.3s0,1.4,0.1,1.7c0.1,0.3,0.2,0.5,0.3,0.7C1.8,6.9,2,7.1,2.2,7.2C2.4,7.3,2.7,7.4,3,7.4c0.5,0,0.9-0.2,1.2-0.5c0.3-0.3,0.5-0.8,0.5-1.3V5.1H3V3.9z"/></svg> ';

var PIXI = require('../libs/pixi');
var _win = window,
	_doc = document,
	_container,
	_canvasEl,
	_graphics,
	_renderer,
	_isActive,
	_image,
	_context;


init();

function init() {

	var div = _doc.createElement('div');

	div.innerHTML = SVG_G;

	var svgEl = div.querySelector('#svg_g');

	_canvasEl = _doc.querySelector('.js-list');

	if(_canvasEl) {

		_isActive = false;

		// create an new instance of a pixi stage
		_container = new PIXI.Sprite();

		// create a renderer instance.
		_renderer = PIXI.autoDetectRenderer(400, 300, {
			view:_canvasEl
		});

		_renderer.backgroundColor = 0xffffff;


		_image = PIXI.Sprite.fromImage('assets/images/test.jpg');

		_container.addChild(_image);

		_graphics = new PIXI.Graphics();
		_graphics.interactive = true;
		SVGGraphics.drawSVG(_graphics, svgEl);

		_container.addChild(_graphics);

		_graphics.scale.x = 10;
		_graphics.scale.y = 10;

		_image.mask = _graphics;

		_win.addEventListener('resize', onResize);
		_graphics.click = onCircleClick;
		requestAnimationFrame(redraw);

		onResize();
	}
}

function onCircleClick() {

	var scale;

	_isActive = !_isActive;

	if(_isActive) {

		scale = 20;

	} else {

		scale = 10;
	}

	TweenLite.to(_graphics.scale, 0.35, {
		x:scale,
		y:scale,
		onUpdate:onResize
	})
}

function onResize() {

	_renderer.resize(_win.innerWidth, _win.innerHeight);
	_graphics.y = _image.y = Math.round(_win.innerHeight / 2);
	_graphics.x = _image.x = Math.round(_win.innerWidth / 2);

	_graphics.x -= 3 * _graphics.scale.x;
	_graphics.y -= 4.5 * _graphics.scale.y;

	_image.x -= 230;
	_image.y -= 230;
}




function redraw() {

	requestAnimationFrame(redraw);

	// render the stage
	_renderer.render(_container);
}