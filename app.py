from flask import Flask, render_template, request, send_from_directory
from pytubefix import YouTube
import os
import re
from pathlib import Path

app = Flask(__name__)

os.environ["PYTUBE_PO_TOKEN"] = "2U5d3m6NbSNSa36bnUlAOvVibK6QFe1ZWBjMLYZlkpg"

def sanitize_filename(name):
    """Clean title to make it a safe filename."""
    name = re.sub(r'[\\/*?:"<>|#🔥🗿]', "", name)
    return name.strip().replace(" ", "_")

def get_downloads_folder():
    """Get user's system Downloads folder."""
    return str(Path.home() / "Downloads")

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        try:
            link = request.form.get("link")
            if not link:
                return render_template("index.html", message="⚠️ Please enter a YouTube URL.")

            # ✅ Use Player-Origin Token
            yt = YouTube(link, use_po_token=True)

            title = yt.title
            thumb_url = yt.thumbnail_url

            # ✅ Progressive (video+audio)
            progressive_streams = yt.streams.filter(progressive=True, file_extension="mp4").order_by("resolution").desc()

            # ✅ Adaptive (video only – higher qualities like 1080p, 2K, 4K)
            adaptive_streams = yt.streams.filter(adaptive=True, only_video=True, file_extension="mp4").order_by("resolution").desc()

            # ✅ Audio-only
            audio_streams = yt.streams.filter(only_audio=True).order_by("abr").desc()

            # ✅ Merge and remove duplicates
            all_video_streams = []
            seen = set()
            for s in list(progressive_streams) + list(adaptive_streams):
                if s.resolution and s.resolution not in seen:
                    all_video_streams.append(s)
                    seen.add(s.resolution)

            return render_template(
                "index.html",
                link=link,
                title=title,
                thumb_url=thumb_url,
                video_streams=all_video_streams,
                audio_streams=audio_streams,
                choose_quality=True
            )

        except Exception as e:
            return render_template("index.html", message=f"❌ Error: {str(e)}")

    return render_template("index.html")


@app.route("/download", methods=["POST"])
def download():
    try:
        link = request.form.get("link")
        choice = request.form.get("choice")
        quality = request.form.get("quality")

        # ✅ Use Player-Origin Token again here
        yt = YouTube(link, use_po_token=True)

        safe_title = sanitize_filename(yt.title)
        downloads_path = get_downloads_folder()
        os.makedirs(downloads_path, exist_ok=True)

        if choice == "audio":
            stream = yt.streams.filter(only_audio=True).first()
            file_path = stream.download(output_path=downloads_path, filename=f"{safe_title}.mp3")
            message = f"✅ <b>{yt.title}</b> downloaded successfully as audio!<br>📂 Saved in: <b>Downloads</b>"

        else:
            stream = yt.streams.filter(res=quality, file_extension="mp4").first()
            if not stream:
                return render_template("index.html", message="❌ Selected resolution not available.")
            file_path = stream.download(output_path=downloads_path, filename=f"{safe_title}.mp4")
            message = f"✅ <b>{yt.title}</b> downloaded successfully in {quality} quality!<br>📂 Saved in: <b>Downloads</b>"

        return render_template(
            "index.html",
            message=message,
            thumb_url=yt.thumbnail_url,
            title=yt.title,
            link=link
        )

    except Exception as e:
        return render_template("index.html", message=f"❌ Error: {str(e)}")


# ✅ SEO-related files
@app.route("/robots.txt")
def robots():
    return send_from_directory("static", "robots.txt")

@app.route("/sitemap.xml")
def sitemap():
    return send_from_directory("static", "sitemap.xml")

@app.route("/googleabaf9b569873b3d9.html")
def google_verification():
    return app.send_static_file("googleabaf9b569873b3d9.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
