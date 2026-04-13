const API = {
	async getMovies() {
		const res = await fetch('../api/catalog.php');
		return await res.json();
	}
};
