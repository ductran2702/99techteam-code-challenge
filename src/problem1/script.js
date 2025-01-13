function sum_to_n_a(n) {
	let result = 0;
	for(let i = 1; i <= n; i++) {
		result += i;
	}

	return result
}

function sum_to_n_b(n) {
	return (n + 1) * n / 2
}

function sum_to_n_c(n) {
	return 0.5 * n * n + 0.5 * n
}
