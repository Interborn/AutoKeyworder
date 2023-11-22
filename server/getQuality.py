import requests
import json
import sys

def get_quality(image_path, client_id, client_secret):
    with open(image_path, 'rb') as f:
        image_data = f.read()
        
    data = {'data': image_data}
    response = requests.post('https://api.everypixel.com/v1/quality', files=data, auth=(client_id, client_secret))
    
    if response.status_code != 200:
        return None, response.status_code, response.text

    response_data = json.loads(response.text)
    if 'quality' not in response_data:
        return None, None, response.text

    return response_data['quality']['score'], None, None

if __name__ == "__main__":
    image_path = sys.argv[1]
    client_id = 'mvdpZVHaT4sG1pfAVFy5qwPw'
    client_secret = ''
    
    quality_score, error_code, error_text = get_quality(image_path, client_id, client_secret)
    if error_code:
        print(f"Quality Score Error: {error_code}\n{error_text}")

    if quality_score is not None:
        print(f"{quality_score}")