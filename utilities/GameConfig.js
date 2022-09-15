const getSeasonSongs = (parsed) => {
	const seasons = {};
	const songs = parsed.songs;
	const boxes = parsed.boxes.filter(el => el.idLabel.includes('season'));
	for(const box of boxes) {
		seasons[box.idLabel.split('-')[2]] = box.BeatmapPicker.SelectionGroups[0].CuratedSongs_id.map(
			boxSong => songs.find(el => el.id == boxSong)
		);
	}
	return seasons;
}

module.exports = { getSeasonSongs };