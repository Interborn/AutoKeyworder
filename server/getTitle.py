import openai
import sys
from getKeywords import get_keywords

# Initialize OpenAI settings
openai.organization = "org-HTJL8DAqvtYJx8lhEuGYVme8"
openai.api_key = "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"

def generate_title(keywords, originalFilename):
    prompt = f"This image has the following keywords: {keywords} and was uploaded under the filename {originalFilename}. What would be a descriptive and marketable title (at least 5 words) for this image?"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=10
    )
    return response['choices'][0]['text'].strip()

if __name__ == "__main__":
    image_path = sys.argv[1]
    original_filename = image_path.split('/')[-1]
    client_id = 'mvdpZVHaT4sG1pfAVFy5qwPw'
    client_secret = 'uZZV87sRWVgHXe6dg5nSOst10lvFg8FwJqU5H7wkojoVE9Oc'
        
    keywords, error_code, error_text = get_keywords(image_path, client_id, client_secret)
    if error_code:
        print(f"Keywords Error: {error_code}\n{error_text}")
    else:
        title = generate_title(keywords, original_filename)
        print(f"{title}")