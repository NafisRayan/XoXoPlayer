import sqlite3

# JSON data with progress field added
tracks_data = [
    {
        "id": "1",
        "url": "https://www.chosic.com/wp-content/uploads/2021/07/Raindrops-on-window-sill.mp3",
        "title": "Raindrops on window sill",
        "artist": "",
        "artwork": "https://picsum.photos/id/10/200/300",
        "album": "Chosic",
        "duration": 119,
        "progress": 0
    },
    {
        "id": "2",
        "url": "https://www.chosic.com/wp-content/uploads/2021/04/kvgarlic__largestreamoverloginforestmarch.mp3",
        "title": "Peaceful water stream",
        "artist": "",
        "artwork": "https://picsum.photos/id/1038/200/300",
        "album": "Chosic",
        "duration": 66,
        "progress": 0
    },
    {
        "id": "3",
        "url": "https://www.chosic.com/wp-content/uploads/2021/05/inossi-got-you.mp3",
        "title": "Got You",
        "artist": "",
        "artwork": "https://picsum.photos/id/103/200/300",
        "album": "INOSSI",
        "duration": 178,
        "progress": 0
    },
    {
        "id": "4",
        "url": "https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3",
        "title": "And So It Begins",
        "artist": "",
        "artwork": "https://picsum.photos/id/1019/200/300",
        "album": "Artificial Music",
        "duration": 208,
        "progress": 0
    },
    {
        "id": "5",
        "url": "https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3",
        "title": "Keys of moon",
        "artist": "The Epic Hero",
        "artwork": "https://picsum.photos/id/1003/200/300",
        "album": "",
        "duration": 149,
        "progress": 0
    },
    {
        "id": "6",
        "url": "https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3",
        "title": "Equinox",
        "artist": "Purple Cat",
        "artwork": "https://picsum.photos/id/1016/200/300",
        "album": "",
        "duration": 140,
        "progress": 0
    }
]

# Connect to SQLite database (or create it)
conn = sqlite3.connect('tracks.db')
cursor = conn.cursor()

# Create table with an additional 'progress' column
cursor.execute('''
CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    artist TEXT,
    artwork TEXT,
    album TEXT,
    duration INTEGER,
    progress INTEGER DEFAULT 0
)
''')

# Insert JSON data into the SQLite table
for track in tracks_data:
    cursor.execute('''
    INSERT INTO tracks (id, url, title, artist, artwork, album, duration, progress)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (track["id"], track["url"], track["title"], track["artist"], track["artwork"], track["album"], track["duration"], track["progress"]))

# Commit and close connection
conn.commit()
conn.close()

print("Data with progress field inserted into tracks.db successfully.")
