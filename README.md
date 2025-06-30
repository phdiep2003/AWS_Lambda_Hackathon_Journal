# Empathy Journal – AI-Powered Mental Health Reflection

Empathy Journal is a secure, serverless journaling web app that helps users explore their emotions through AI-generated insights and behavioral trends. Built for the **AWS Lambda Hackathon 2025**, this project combines mental wellness with cutting-edge cloud tech.

# Live Demo: https://empathy-journal.vercel.app/
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/9efe4218-dce0-43fd-8859-b0d68f65f74f" />

---

### How We Used AWS Lambda

The app uses AWS Lambda to handle GPT-powered journal analysis. When a user submits their journal entry and clicks **"Analyze with AI"**, the frontend sends a POST request to an API Gateway endpoint, which triggers a Lambda function. This Lambda function:

1. Receives the journal entry
2. Sends the text to OpenAI's GPT API
3. Formats the response (emotion, themes, summary, prompts)
4. Sends the result back to the frontend for display and storage

---

## AWS Services Used

| Service        | Purpose |
|----------------|---------|
| AWS Lambda     | Serverless backend to run GPT logic |
| API Gateway    | Expose Lambda as RESTful HTTP endpoint |
| CloudWatch     | Monitor and debug Lambda invocations |
| IAM Roles      | Permission control for Lambda execution |

---

## Key Features

- **Distraction-Free Journaling**  
  Write in peace with a clean, minimal editor interface.

- **GPT-Powered Reflection**  
  Each journal entry is analyzed by Gemini to detect:

  - Emotional tone
  - Repeating themes
  - Suggestive questions to reflect deeper

- **Mood & Behavior Tracking**

  - Track mood over time
  - Surface recurring thoughts and patterns
  - Auto-generated weekly summaries

- **Security & Privacy First**

  - Client-side AES encryption (via Web Crypto API)
  - Optional offline data export (`.zip` format)

- **Serverless Backend with AWS Lambda**
  - GPT analysis handled via Lambda + API Gateway
  - Firebase Firestore for real-time journal storage
  - Zero backend server to manage

---

## Built With

| Category | Tech Stack                                      |
| -------- | ----------------------------------------------- |
| Cloud    | AWS Lambda, API Gateway, Firebase Hosting       |
| AI       | OpenAI GPT-4o API                               |
| Frontend | React, Vite, Tailwind CSS                       |
| Charts   | Chart.js (for mood/emotion trends)              |
| Security | AES encryption (Web Crypto API), JWT (optional) |

---

## Local Development

1. Clone the repo:

```bash
git clone https://github.com/your-username/empathy-journal-lambda.git
cd empathy-journal-lambda
```

2. Install frontend dependencies:

```
npm install
npm run dev
```

3. Create a .env file:

```
VITE_LAMBDA_URL=https://your-api-gateway-url
```

4. Start journaling and analyzing your thoughts

---

## Challenges & Learnings

- Configuring CORS correctly between Lambda and the frontend
- Making GPT responses consistent + parseable
- Styling responsive UI with Tailwind CSS
- Handling async + loading states while calling AI


---

## Future Plans

- Weekly emotion summaries
- Mood trend charts with Chart.js
- Offline-first mode (PWA)
- Export to PDF or Markdown
- AI-generated gratitude prompts
