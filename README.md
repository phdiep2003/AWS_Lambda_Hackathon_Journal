# Empathy Journal – AI-Powered Mental Health Reflection

Empathy Journal is a secure, serverless journaling web app that helps users explore their emotions through AI-generated insights and behavioral trends. Built for the **AWS Lambda Hackathon 2024**, this project combines mental wellness with cutting-edge cloud tech.

---

## Key Features

- **Distraction-Free Journaling**  
  Write in peace with a clean, minimal editor interface.

- **GPT-Powered Reflection**  
  Each journal entry is analyzed by OpenAI’s GPT to detect:

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
