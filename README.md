Subscribe Backend Function

This is a backend function for handling newsletter subscriptions using Node.js, Express, and MongoDB. It includes email verification using Nodemailer to confirm subscriptions.

Features

Subscribe Users: Users enter their email to subscribe.

Email Verification: A verification link is sent to confirm the subscription.

MongoDB Integration: Stores subscriber details in a database.

Error Handling & Logging: Ensures smooth operation and debugging.

Prerequisites

Before running this project, make sure you have:

Node.js installed

MongoDB set up 

Git installed

Getting Started

1. Clone the Repository

git clone https://github.com/Naty2580/Subscribe
cd  Subscribe/back

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
BASE_URL=your_server_Url
CLIENT_URL=Your_frontend_URL  # this should be handled in the frontend side

4. Run the Server

npm start

The server should start on http://localhost:5000

5. API Endpoints

Subscribe a User

POST /api/subscriber/subscribe

Request Body:

{
  "email": "user@example.com"
}

Response:

{
  "message": "Verification email sent! Check your inbox."
}

Verify Email

GET /api/subscriber/confirm/:email

The link is sent in the email. Clicking the verification link confirms the subscription.

6. Deployment (Optional)

To deploy, set environment variables in your hosting platform (e.g., Render, Vercel, Railway, or DigitalOcean) and run the application as described.

Troubleshooting

Error: MongoDB not connecting?

Check your MONGO_URI in .env.

Ensure MongoDB is running.

Emails not being sent?

Verify SMTP credentials.

Verification link not working?

Ensure CLIENT_URL is correctly set in .env.

Need Help?

Feel free to open an issue or reach out.
