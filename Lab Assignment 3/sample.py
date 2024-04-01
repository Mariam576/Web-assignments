import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Replace these values with your own credentials
client_id = '48696840d33245d4a7c8602045c728d0'
client_secret = 'c92f96344d734a5a8a22f5cd8ffa1431'

# Initialize Spotipy client
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Playlist URLs
playlist_urls = [
    'https://open.spotify.com/playlist/37i9dQZF1DX0XUfTFmNBRM',
    'https://open.spotify.com/playlist/6X3wpjdFbD8PlTISUIPT2c',
    'https://open.spotify.com/playlist/656d91JastxforR4ac4eIs',
    'https://open.spotify.com/playlist/0i2S0eEdftTrmLKueMWUKX',
    'https://open.spotify.com/playlist/1SX3oHTD0iRZM4c7TXZKL9',
    'https://open.spotify.com/playlist/2bcSVCNr1AtyVrB3YP9dLl',
    'https://open.spotify.com/playlist/5v81llV1qv1gPhu5GAUj6M',
    'https://open.spotify.com/playlist/37i9dQZF1DX8xfQRRX1PDm',
    'https://open.spotify.com/playlist/04227MSKljdgaDF8fmbzoD',
    'https://open.spotify.com/playlist/60E39cllB6TpXJyVb3Cd0p'
]

# Define a dictionary to store playlist details and tracks
playlists_data = []

# Get playlist details
for playlist_url in playlist_urls:
    playlist_id = playlist_url.split('/')[-1]
    playlist = sp.playlist(playlist_id)
    playlist_data = {
        "name": playlist['name'],
        "total_tracks": playlist['tracks']['total'],
        "url": playlist_url,
        "tracks": []
    }
    
    # Batch processing: Fetch track details in batches
    track_ids = [track['track']['id'] for track in playlist['tracks']['items']]
    track_details_batch = sp.tracks(track_ids)
    
    for idx, track in enumerate(playlist['tracks']['items']):
        track_data = {
            "name": track['track']['name'],
            "artists": [artist['name'] for artist in track['track']['artists']],
            "album": track['track']['album']['name'],
            "url": track['track']['external_urls']['spotify']
        }
        
        # Retrieve image URL from batch response
        if len(track_details_batch['tracks']) > idx and len(track_details_batch['tracks'][idx]['album']['images']) > 0:
            track_data["image"] = track_details_batch['tracks'][idx]['album']['images'][0]['url']
        else:
            track_data["image"] = None
        
        playlist_data["tracks"].append(track_data)
    
    playlists_data.append(playlist_data)
