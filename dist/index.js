import ytpl from "ytpl";
const passURL = "https://www.youtube.com/playlist?list=PLopcHtZ0hJF20vLxAKkCus_NTwwrkCfKy";
async function downloadPlaylist(playListURL, outputDir) {
    const playListID = playListURL.split("list=")[1];
    const playlist = await ytpl(playListID);
    for (const video in playlist.items) {
        if (Object.prototype.hasOwnProperty.call(playlist.items, video)) {
            const element = playlist.items[video];
            console.log(element);
        }
    }
}
downloadPlaylist(passURL, "as");
