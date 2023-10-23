import requests
import json
import sys
import openai

openai.api_key = "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"

def get_keywords_and_quality(image_path, client_id, client_secret):
    with open(image_path, 'rb') as f:
        image_data = f.read()

    data = {'data': image_data}
    response = requests.post('https://api.everypixel.com/v1/quality', files=data, auth=(client_id, client_secret))
    
    if response.status_code != 200:
        return None, None, response.status_code, response.text

    response_data = json.loads(response.text)
    if 'quality' not in response_data:
        return None, None, None, response.text

    quality_score = response_data['quality']['score']
    
    # Fetching keywords as you did before
    response = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret))
    if response.status_code != 200:
        return None, None, response.status_code, response.text

    response_data = json.loads(response.text)
    if 'keywords' not in response_data:
        return None, None, None, response.text

    keywords = ', '.join([x['keyword'] for x in response_data['keywords']])
    
    return keywords, quality_score, None, None

if __name__ == "__main__":
    image_path = sys.argv[1]
    client_id = 'mvdpZVHaT4sG1pfAVFy5qwPw'
    client_secret = 'uZZV87sRWVgHXe6dg5nSOst10lvFg8FwJqU5H7wkojoVE9Oc'

    keywords, quality_score, error_code, error_text = get_keywords_and_quality(image_path, client_id, client_secret)
    
if error_code is not None:
    print(f"Error: {error_code}\n{error_text}")
else:
    print(f"{keywords}|{quality_score}")
