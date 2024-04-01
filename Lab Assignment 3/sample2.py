import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json

# Set up Spotify credentials
client_id = 'YOUR_CLIENT_ID'
client_secret = 'YOUR_CLIENT_SECRET'

# Authenticate with Spotify API
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Function to search for artists by genre
def search_artists_by_genre(genre):
    artists = []
    offset = 0
    while True:
        results = sp.search(q='genre:"{}"'.format(genre), type='artist', limit=50, offset=offset)
        artists.extend(results['artists']['items'])
        if len(results['artists']['items']) < 50:
            break
        offset += 50
    return artists

# Search for Hindi artists
hindi_artists = search_artists_by_genre('hindi')

# Save the data to a JSON file
output_file = 'hindi_artists.json'
with open(output_file, 'w') as f:
    json.dump(hindi_artists, f, indent=4)

print("Hindi artists data saved to", output_file)
