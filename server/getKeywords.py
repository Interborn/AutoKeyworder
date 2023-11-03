import requests
import json
import sys

def get_keywords(image_path, client_id, client_secret):
    with open(image_path, 'rb') as f:
        image_data = f.read()
        
    data = {'data': image_data}
    response = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret))
    
    if response.status_code != 200:
        return None, response.status_code, response.text

    response_data = json.loads(response.text)
    if 'keywords' not in response_data:
        return None, None, response.text

    return '; '.join([x['keyword'] for x in response_data['keywords']]), None, None

if __name__ == "__main__":
    image_path = sys.argv[1]
    client_id = 'mvdpZVHaT4sG1pfAVFy5qwPw'
    client_secret = 'uZZV87sRWVgHXe6dg5nSOst10lvFg8FwJqU5H7wkojoVE9Oc'
        
    keywords, error_code, error_text = get_keywords(image_path, client_id, client_secret)
    if error_code:
        print(f"Keywords Error: {error_code}\n{error_text}")

    if keywords is not None:
        print(f"{keywords}")