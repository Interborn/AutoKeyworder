import openai
import sys
import json

# Initialize OpenAI settings
openai.organization = "org-HTJL8DAqvtYJx8lhEuGYVme8"
openai.api_key = "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"

# List of categories and their corresponding numbers
categories = [
    "Animals", "Buildings and Architecture", "Business", "Drinks",
    "The Environment", "States of Mind", "Food", "Graphic Resources",
    "Hobbies and Leisure", "Industry", "Landscapes", "Lifestyle",
    "People", "Plants and Flowers", "Culture and Religion", "Science",
    "Social Issues", "Sports", "Technology", "Transport", "Travel"
]

def get_category(keywords):
    # Join the keywords into a string
    keywords_str = ', '.join(keywords)

    # Create a prompt to classify the category of the image based on keywords
    prompt = f"The image has these keywords: {keywords_str}. Which category does it most likely fit into? Choose from the following list: {', '.join(categories)}."

    # Query OpenAI API to get the most likely category
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=60
    )
    predicted_category = response['choices'][0]['text'].strip()

    # Match the predicted category with the number
    category_number = next((i + 1 for i, category in enumerate(categories) if category.lower() in predicted_category.lower()), None)

    return category_number, predicted_category

if __name__ == "__main__":
    keywords = json.loads(sys.argv[1])
    category_number, predicted_category = get_category(keywords)

    # Output the category number and predicted category (for debugging)
    print(json.dumps({"category_number": category_number, "predicted_category": predicted_category}))
