const getRewards = (event, gameConfig) => {
	const realSongs = [];
	const songs = event.piece.gachaRewards.uniqueTier.rewards.filter(el => el.type == 6);
	for(const song of songs) {
		realSongs.push(gameConfig.songs.find(el => el.id == song.piece.Beatmap_id));
	}
	return realSongs;
}

module.exports = { getRewards }