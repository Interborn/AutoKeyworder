import openai
import sys
from getKeywords import get_keywords

# Initialize OpenAI settings
openai.organization = "org-HTJL8DAqvtYJx8lhEuGYVme8"
openai.api_key = "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"

def generate_title(keywords, originalFilename, prompt_template):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt_template,
        max_tokens=10
    )
    return response['choices'][0]['text'].strip()

if __name__ == "__main__":
    image_path = sys.argv[1]
    use_filenames = sys.argv[2]
    original_filename = image_path.split('/')[-1]
    client_id = 'mvdpZVHaT4sG1pfAVFy5qwPw'
    client_secret = 'uZZV87sRWVgHXe6dg5nSOst10lvFg8FwJqU5H7wkojoVE9Oc'
        
    keywords, error_code, error_text = get_keywords(image_path, client_id, client_secret)
    if error_code:
        print(f"Keywords Error: {error_code}\n{error_text}")
    else:
        prompt_template = "This image has the following keywords: " + ', '.join(keywords)
        
        if use_filenames == "true":
            prompt_template += f" and was uploaded under the filename {original_filename}. What would be a descriptive and marketable title (at least 5 words) for this image?"
        else:
            prompt_template += ". What would be a descriptive and marketable title (at least 5 words) for this image?"
        
        title = generate_title(keywords, original_filename, prompt_template)
        print(f"{title}")