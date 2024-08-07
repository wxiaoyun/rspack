/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/logging/truncateArgs.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */

const arraySum = (array: number[]) => {
	let sum = 0;
	for (const item of array) sum += item;
	return sum;
};

/**
 * @param args items to be truncated
 * @param maxLength maximum length of args including spaces between
 * @returns truncated args
 */
const truncateArgs = (args: any[], maxLength: number): string[] => {
	const lengths = args.map(a => `${a}`.length);
	const availableLength = maxLength - lengths.length + 1;

	if (availableLength > 0 && args.length === 1) {
		if (availableLength >= args[0].length) {
			return args;
		}
		if (availableLength > 3) {
			return ["..." + args[0].slice(-availableLength + 3)];
		}
		return [args[0].slice(-availableLength)];
	}

	// Check if there is space for at least 4 chars per arg
	if (availableLength < arraySum(lengths.map(i => Math.min(i, 6)))) {
		// remove args
		if (args.length > 1)
			return truncateArgs(args.slice(0, args.length - 1), maxLength);
		return [];
	}

	let currentLength = arraySum(lengths);

	// Check if all fits into maxLength
	if (currentLength <= availableLength) return args;

	// Try to remove chars from the longest items until it fits
	while (currentLength > availableLength) {
		const maxLength = Math.max(...lengths);
		const shorterItems = lengths.filter(l => l !== maxLength);
		const nextToMaxLength =
			shorterItems.length > 0 ? Math.max(...shorterItems) : 0;
		const maxReduce = maxLength - nextToMaxLength;
		let maxItems = lengths.length - shorterItems.length;
		let overrun = currentLength - availableLength;
		for (let i = 0; i < lengths.length; i++) {
			if (lengths[i] === maxLength) {
				const reduce = Math.min(Math.floor(overrun / maxItems), maxReduce);
				lengths[i] -= reduce;
				currentLength -= reduce;
				overrun -= reduce;
				maxItems--;
			}
		}
	}

	// Return args reduced to length in lengths
	return args.map((a, i) => {
		const str = `${a}`;
		const length = lengths[i];
		if (str.length === length) {
			return str;
		}
		if (length > 5) {
			return "..." + str.slice(-length + 3);
		}
		if (length > 0) {
			return str.slice(-length);
		}
		return "";
	});
};

export { truncateArgs };
