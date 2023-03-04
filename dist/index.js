import ytpl from "ytpl";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import * as url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const playListURL = "https://www.youtube.com/playlist?list=PLopcHtZ0hJF20vLxAKkCus_NTwwrkCfKy";
// ffmpeg.setFfmpegPath(path.join(__dirname, "path", "to", "ffmpeg"));
async function downloadPlaylist(playListURL, outputDir) {
    const ids = [];
    const playListID = playListURL.split("list=")[1];
    const playlist = await ytpl(playListID);
    for (const video in playlist.items) {
        if (Object.prototype.hasOwnProperty.call(playlist.items, video)) {
            const element = playlist.items[video];
            ids.push(element === null || element === void 0 ? void 0 : element.url);
        }
    }
    return new Promise((res, rej) => {
        if (ids.length <= 0)
            return rej("Invalid url | No videos found.");
        return res(ids);
    });
}
downloadPlaylist(playListURL).then((data) => downloadVideos(data));
async function downloadVideos(urls) {
    for (const url of urls) {
        const stream = ytdl(url, {
            quality: "highest",
            filter: "audioandvideo",
        });
        const ffmpegProcess = ffmpeg();
        console.log(ffmpegProcess);
        ffmpegProcess
            .input(stream)
            .outputOption("-c:v copy")
            .outputOption("-c:a copy")
            .format("mp4")
            .on("error", (err) => {
            console.log(err);
            console.log(`An error occurred ${err.message}`);
        })
            .on("end", () => {
            console.log(`Finished downloading ${url}!`);
        })
            .pipe();
    }
}
