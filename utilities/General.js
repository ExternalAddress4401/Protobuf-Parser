const addUrlsToSongs = (songs, parsedAssets) => {
	return songs.map(song => {
		const chart = parsedAssets.assetBundles.find(el => el.id.startsWith(`interactions_${song.chart_id}`));
		const audio = parsedAssets.assetBundles.find(el => el.id.startsWith(`${song.song_id}_audiobank`));

		if(audio) {
			song.audioUrl = `${parsedAssets.downloadUrl}/${parsedAssets.downloadBucketVersion}/Android/${audio.id}_${audio.HashAndroid}${audio.CRCAndroid}.bundle`;
		}
		if(chart) {
			song.chartUrl = `${parsedAssets.downloadUrl}/${parsedAssets.downloadBucketVersion}/Android/${chart.id}_${chart.HashAndroid}${chart.CRCAndroid}.bundle`;
		}
		
		return song;
	})
}

module.exports = { addUrlsToSongs }