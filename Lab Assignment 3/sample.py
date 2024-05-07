import json
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Define your YouTube API key (replace 'YOUR_API_KEY' with your actual API key)
API_KEY = 'AIzaSyD6Fupe0Qd_7Nuqd3Ileos5EbRFoqgJA7o'

def search_youtube_songs(queries, max_results_per_query=100):
    # Initialize the YouTube Data API v3 client
    youtube = build('youtube', 'v3', developerKey=API_KEY)

    # List to store song details
    songs_data = []

    try:
        for query_data in queries:
            query = query_data['query']
            region_code = query_data['regionCode']
            language = query_data['language']

            # Make a request to fetch songs based on the user's search query
            request = youtube.search().list(
                q=query,
                type='video',
                part='snippet',
                maxResults=max_results_per_query,
                regionCode=region_code
            )
            response = request.execute()

            for item in response['items']:
                video_id = item['id']['videoId']
                video_title = item['snippet']['title']
                thumbnail_url = item['snippet']['thumbnails']['medium']['url']

                # Construct embeddable YouTube URL
                embed_url = f'https://www.youtube.com/embed/{video_id}'

                # Construct song data object
                song_data = {
                    'name': video_title,
                    'url': embed_url,
                    'thumbnail': thumbnail_url,
                    'language': language
                }

                # Append song data to the list
                songs_data.append(song_data)

    except HttpError as e:
        print(f'HTTP error occurred: {e}')
    
    return songs_data

# Define search query for new English songs
new_english_query = {'query': 'new English songs', 'regionCode': 'US', 'language': 'English'}

# Example Usage:
songs_results = search_youtube_songs([new_english_query], max_results_per_query=100)

# Save fetched song data to a JSON file
output_file = 'new_english_songs.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(songs_results, f, ensure_ascii=False, indent=4)

print(f'Successfully saved {len(songs_results)} new English songs data to {output_file}')