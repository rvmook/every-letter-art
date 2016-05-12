var LETTER_G = 'M3,3.9h2.9v1.7c0,0.9-0.3,1.6-0.9,2.1C4.5,8.4,3.8,8.7,3,8.7c-0.7,0-1.2-0.2-1.6-0.5c-0.4-0.3-0.8-0.6-1-1C0.3,7,0.2,6.9,0.2,6.8c0-0.1-0.1-0.3-0.1-0.5C0,6,0,5.3,0,4.3c0-1,0-1.7,0.1-2C0.1,2,0.2,1.7,0.4,1.5c0.2-0.4,0.5-0.7,1-1.1C1.8,0.2,2.3,0,3,0c0.8,0,1.4,0.3,2,0.7c0.5,0.5,0.8,1.1,1,1.8H4.5C4.4,2.2,4.2,1.9,4,1.6C3.7,1.4,3.4,1.3,3,1.3c-0.3,0-0.5,0.1-0.8,0.2C2,1.6,1.8,1.7,1.7,1.9C1.5,2.1,1.4,2.3,1.3,2.6C1.3,2.9,1.3,3.5,1.3,4.3s0,1.4,0.1,1.7c0.1,0.3,0.2,0.5,0.3,0.7C1.8,6.9,2,7.1,2.2,7.2C2.4,7.3,2.7,7.4,3,7.4c0.5,0,0.9-0.2,1.2-0.5c0.3-0.3,0.5-0.8,0.5-1.3V5.1H3V3.9z';

var SVGGraphics = require('pixi-svg-graphics');

var SVG_G = '<svg><path fill="red" d="M3,3.9h2.9v1.7c0,0.9-0.3,1.6-0.9,2.1C4.5,8.4,3.8,8.7,3,8.7c-0.7,0-1.2-0.2-1.6-0.5c-0.4-0.3-0.8-0.6-1-1C0.3,7,0.2,6.9,0.2,6.8c0-0.1-0.1-0.3-0.1-0.5C0,6,0,5.3,0,4.3c0-1,0-1.7,0.1-2C0.1,2,0.2,1.7,0.4,1.5c0.2-0.4,0.5-0.7,1-1.1C1.8,0.2,2.3,0,3,0c0.8,0,1.4,0.3,2,0.7c0.5,0.5,0.8,1.1,1,1.8H4.5C4.4,2.2,4.2,1.9,4,1.6C3.7,1.4,3.4,1.3,3,1.3c-0.3,0-0.5,0.1-0.8,0.2C2,1.6,1.8,1.7,1.7,1.9C1.5,2.1,1.4,2.3,1.3,2.6C1.3,2.9,1.3,3.5,1.3,4.3s0,1.4,0.1,1.7c0.1,0.3,0.2,0.5,0.3,0.7C1.8,6.9,2,7.1,2.2,7.2C2.4,7.3,2.7,7.4,3,7.4c0.5,0,0.9-0.2,1.2-0.5c0.3-0.3,0.5-0.8,0.5-1.3V5.1H3V3.9z"></path></svg>';

var PIXI = require('../libs/pixi');
var _win = window,
	_doc = document,
	_letter = new Letter(),
	_container,
	_canvasEl,
	_renderer;


init();

function init() {

	_canvasEl = _doc.querySelector('.js-list');

	if(_canvasEl) {

		// create an new instance of a pixi stage
		_container = new PIXI.Sprite();

		// create a renderer instance.
		_renderer = PIXI.autoDetectRenderer(400, 300, {
			view:_canvasEl
		});

		_renderer.backgroundColor = 0xffffff;

		_letter.init(SVG_G);


		_win.addEventListener('resize', onResize);
		requestAnimationFrame(redraw);

		onResize();
	}
}

function onResize() {

	_renderer.resize(_win.innerWidth, _win.innerHeight);

	var newX = Math.round(_win.innerHeight / 2),
		newY = Math.round(_win.innerWidth / 2);

	_letter.updatePosition(newX, newY);
}




function redraw() {

	requestAnimationFrame(redraw);

	// render the stage
	_renderer.render(_container);
}

function Letter() {

	var _isFocused,
		_image,
		_graphics,
		_pos = {x:0,y:0};

	function init(svgString) {

		var div = _doc.createElement('div'),
			svgEl;

		div.innerHTML = svgString;

		svgEl = div.querySelector('svg');

		_image = PIXI.Sprite.fromImage('assets/images/test.jpg');

		_container.addChild(_image);

		_graphics = new PIXI.Graphics();
		_graphics.interactive = true;
		SVGGraphics.drawSVG(_graphics, svgEl);

		_container.addChild(_graphics);

		_graphics.scale.x = 10;
		_graphics.scale.y = 10;

		_image.mask = _graphics;
		_graphics.click = onClick;
	}

	function onClick() {

		if(_isFocused) {

			blur();

		} else {

			focus();
		}
	}

	function focus() {

		_isFocused = true;
		updateScale();
	}

	function blur() {

		_isFocused = false;
		updateScale();
	}

	function updateScale() {

		var scale;

		if(_isFocused) {

			scale = 20;

		} else {

			scale = 10;
		}

		TweenLite.to(_graphics.scale, 0.35, {
			x:scale,
			y:scale,
			onUpdate:redraw
		})
	}

	function updatePosition(newX, newY) {

		_pos.x = newX;
		_pos.y = newY;

		redraw();
	}

	function redraw() {

		_graphics.y = _image.y = _pos.x;
		_graphics.x = _image.x = _pos.y;

		_image.x -= 230;
		_image.y -= 230;

		_graphics.x -= 3 * _graphics.scale.x;
		_graphics.y -= 4.5 * _graphics.scale.y;
	}

	this.init = init;
	this.focus = focus;
	this.blur = blur;
	this.updatePosition = updatePosition;
}