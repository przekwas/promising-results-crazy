const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
const maths = [
	{ type: 'add', operand: 2 },
	{ type: 'multiply', operand: 2 },
	{ type: 'divide', operand: 4 },
	{ type: 'subtract', operand: 3 },
	{ type: 'add', operand: 98 },
	{ type: 'remainder', operand: 2 },
	{ type: 'multiply', operand: 50 },
	{ type: 'remainder', operand: 40 },
	{ type: 'add', operand: 32 }
];
let prevResult = 6,
	mathsIdx = 0;

slowMath[maths[mathsIdx].type](prevResult, maths[mathsIdx].operand)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.then(handleSlowMath)
	.catch(handleError);

function handleSlowMath(result) {
	if (mathsIdx >= maths.length - 1) {
		console.log('[opIdx]', mathsIdx);
		makeCard({
			result,
			maf: `${maths[mathsIdx - 1].type} ${prevResult} and ${maths[mathsIdx - 1].operand} is`
		});
		return;
	}

	makeCard({
		result,
		maf: `${maths[mathsIdx].type} ${prevResult} and ${maths[mathsIdx].operand} is`
	});
	prevResult = result;
	mathsIdx++;
	return slowMath[maths[mathsIdx].type](result, maths[mathsIdx].operand);
}

function handleError(e) {
	console.error('[error]', e.message);
}

function makeCard({ maf, result }) {
	const random = colors[Math.floor(Math.random() * colors.length)];
	$(`
	<div class="w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/4" id="fade">
		<div
			class="flex flex-col items-center justify-around h-40 p-4 text-center bg-${random}-300 md:h-60"
		>
			<div class="text-sm font-bold text-${random}-100">${maf}</div>
			<div class="text-7xl md:text-9xl" id="meme">${result}</div>
		</div>
	</div>
	`).appendTo('#async-magic');
}
