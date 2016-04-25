module.exports = function(pixiGraphic, d) {

	var commands = d.match(/[a-df-z][^a-df-z]*/ig),
		command,
		firstCoord,
		lastCoord,
		lastControl,
		pathIndex = 0,
		j,
		len,
		argslen,
		lastPathCoord,
		i,
		commandType,
		args,
		offset;

	for (i = 0, len = commands.length; i < len; i++) {
		command = commands[i];
		commandType = command[0];
		args = command.slice(1).trim().split(/[\s,]+|(?=\s?[+\-])/);

		for (j = 0, argslen = args.length; j < argslen; j++) {
			args[j] = parseFloat(args[j])
		}

		offset = {
			x: 0,
			y: 0
		};

		if (commandType === commandType.toLowerCase()) {
			// Relative positions
			offset = lastCoord;
		}

		switch (commandType.toLowerCase()) {
			// moveto command
			case 'm': moveTo(); break;

			// lineto command
			case 'l': lineTo(); break;

			// curveto command
			case 'c': curveTo(); break;

			// vertial lineto command
			case 'v': verticalLineTo(); break;

			// horizontal lineto command
			case 'h': horizontalLineTo(); break;

			// quadratic curve command
			case 's': quadraticCurve(); break;

			// closepath command
			case 'z':
				// Z command is handled by M
				break;
			default:
				throw new Error('Could not handle path command: ' + commandType + ' ' + args.join(','))
		}
	}

	if (pathIndex > 1) {
		// Move from lastCoord to lastPathCoord
		pixiGraphic.lineTo(lastPathCoord.x, lastCoord.y);
		pixiGraphic.lineTo(lastPathCoord.x, lastPathCoord.y);
	}

	function moveTo() {

		args[0] += offset.x;
		args[1] += offset.y;

		if(pathIndex === 0) {

			// First path, just moveTo()
			pixiGraphic.moveTo(args[0], args[1])

		} else if(pathIndex === 1) {
			// Second path, use lastCoord as lastPathCoord
			lastPathCoord = {
				x: lastCoord.x,
				y: lastCoord.y
			}
		}

		if(pathIndex > 1) {
			// Move from lastCoord to lastPathCoord
			pixiGraphic.lineTo(lastPathCoord.x, lastCoord.y);
			pixiGraphic.lineTo(lastPathCoord.x, lastPathCoord.y);
		}

		if(pathIndex >= 1) {
			// Move from lastPathCoord to new coord
			pixiGraphic.lineTo(lastPathCoord.x, args[1]);
			pixiGraphic.lineTo(args[0], args[1]);
		}

		if(!firstCoord) {
			firstCoord = { x: args[0], y: args[1] }
		}

		lastCoord = { x: args[0], y: args[1] };
		pathIndex++;
	}

	function lineTo() {
		args[0] += offset.x;
		args[1] += offset.y;

		pixiGraphic.lineTo(
			args[0],
			args[1]
		);

		lastCoord = { x: args[0], y: args[1] };
	}

	function curveTo() {

		var k,
			klen;

		for (k = 0, klen = args.length; k < klen; k += 2) {
			args[k] += offset.x;
			args[k + 1] += offset.y
		}

		pixiGraphic.bezierCurveTo(
			args[0],
			args[1],
			args[2],
			args[3],
			args[4],
			args[5]
		);

		lastCoord = { x: args[4], y: args[5] };
		lastControl = { x: args[2], y: args[3] };
	}

	function verticalLineTo() {

		args[0] += offset.y;

		pixiGraphic.lineTo(lastCoord.x, args[0]);
		lastCoord.y = args[0];
	}

	function horizontalLineTo() {
		args[0] += offset.x;

		pixiGraphic.lineTo(args[0], lastCoord.y);
		lastCoord.x = args[0];
	}

	function quadraticCurve() {

		var l,
			llen,
			rx,
			ry;

		for (l = 0, llen = args.length; l < llen; l += 2) {
			args[l] += offset.x;
			args[l + 1] += offset.y;
		}

		rx = 2 * lastCoord.x - lastControl.x;
		ry = 2 * lastCoord.y - lastControl.y;

		pixiGraphic.bezierCurveTo(
			rx,
			ry,
			args[0],
			args[1],
			args[2],
			args[3]
		);
		lastCoord = { x: args[2], y: args[3] };
		lastControl = { x: args[0], y: args[1] };
	}
};