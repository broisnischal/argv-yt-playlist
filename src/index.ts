import ytpl from "ytpl";
import ytdl from "ytdl-core";

const passURL = "https://www.youtube.com/playlist?list=PLopcHtZ0hJF20vLxAKkCus_NTwwrkCfKy";

async function downloadPlaylist(playListURL: string, outputDir: string): Promise<void> {
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
