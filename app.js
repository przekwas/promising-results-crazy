// array of color names for tailwind class names
const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

// the lab steps abstracted to an array of objects
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

// since promise.then syntax is locally scoped args
// we use some globals we update to act as temp placeholders
// for outputting the previous promise operation
let prevResult = 6;

let p = Promise.resolve();
maths.forEach(({ type, operand }, idx) => {
	p = p.then(
		() =>
			new Promise((resolve, reject) => {
				slowMath[type](prevResult, operand)
					.then(result => {
						handleSlowMath({ result, type, operand, idx });
						resolve();
					})
					.catch(handleError);
			})
	);
});

function handleSlowMath({ result, type, operand, idx }) {
	makeCard({
		idx,
		result,
		maf: `${type} ${prevResult} and ${operand} is`
	});

	prevResult = result;
	return;
}

function handleError(e) {
	console.error('[error]', e.message);
	Swal.fire({
		icon: 'error',
		title: "Promise Rejected",
		text: e.message
	});
}

function makeCard({ maf, result, idx }) {
	const random = colors[idx % colors.length];
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
