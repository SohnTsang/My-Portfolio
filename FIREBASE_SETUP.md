# Firebase Setup for Contact Form

This guide will help you set up Firebase to enable the contact form functionality on your portfolio website.

## Prerequisites

1. A Google account
2. Basic knowledge of Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "kaho-portfolio")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location closest to your users
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "portfolio-web")
6. Copy the Firebase configuration object

## Step 4: Update the Configuration

Replace the placeholder configuration in `script.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## Step 5: Set Up Firestore Security Rules (Optional but Recommended)

In the Firestore Database section, go to "Rules" and update the rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contact_messages collection
    match /contact_messages/{document} {
      allow read, write: if true; // For development - change this for production
    }
  }
}
```

## Step 6: Test the Contact Form

1. Open your portfolio website
2. Navigate to the contact section
3. Fill out and submit the form
4. Check the Firebase Console > Firestore Database to see if messages are being saved

## Step 7: Set Up Email Notifications (Optional)

To receive email notifications when someone submits a contact form:

### Option A: Firebase Functions with Nodemailer

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize Functions: `firebase init functions`
4. Install nodemailer: `cd functions && npm install nodemailer`
5. Create the email function in `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

exports.sendContactEmail = functions.firestore
    .document('contact_messages/{messageId}')
    .onCreate(async (snap, context) => {
        const messageData = snap.data();
        
        // Configure your email service (Gmail, SendGrid, etc.)
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-app-password'
            }
        });
        
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'tsangkaho12@gmail.com',
            subject: `New Contact Form Message from ${messageData.name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${messageData.name}</p>
                <p><strong>Email:</strong> ${messageData.email}</p>
                <p><strong>Message:</strong></p>
                <p>${messageData.message}</p>
                <p><strong>IP:</strong> ${messageData.ip}</p>
                <p><strong>Timestamp:</strong> ${messageData.timestamp.toDate()}</p>
            `
        };
        
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    });
```

6. Deploy the function: `firebase deploy --only functions`

### Option B: Use a Third-Party Service

You can also use services like:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/)
- [EmailJS](https://www.emailjs.com/)

## Security Considerations

1. **API Key Security**: The Firebase API key is safe to expose in client-side code, but you should set up proper security rules
2. **Rate Limiting**: Consider implementing rate limiting to prevent spam
3. **Input Validation**: The form already includes client-side validation, but you should also validate on the server side
4. **CORS**: Make sure your domain is allowed in Firebase Console

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**
   - Check if Firebase SDK is loaded correctly
   - Verify your configuration object

2. **"Permission denied" error**
   - Check Firestore security rules
   - Ensure your domain is allowed

3. **Form not submitting**
   - Check browser console for errors
   - Verify Firebase project is active

### Debug Mode:

Add this to your `script.js` for debugging:

```javascript
// Enable Firebase debug mode
localStorage.setItem('debug', 'firebase:*');
```

## Production Deployment

Before going live:

1. Set up proper Firestore security rules
2. Configure authentication if needed
3. Set up proper email notifications
4. Test thoroughly with real data
5. Monitor usage and costs

## Cost Considerations

- Firebase Firestore has a generous free tier
- You get 50,000 reads, 20,000 writes, and 20,000 deletes per day for free
- Contact forms typically use minimal resources

## Support

If you encounter issues:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the [Firebase Console](https://console.firebase.google.com/) for error logs
3. Check the browser console for client-side errors 