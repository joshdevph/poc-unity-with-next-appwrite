# Project Authentication

This project provides a secure authentication system for interactive training modules, built with Unity, Next.js, and Appwrite.

## Key Features

### Authentication & Security
- **Appwrite Authentication**: Email/Password login, Google sign-in, and secure password reset.
- **Role-Based Access Control (RBAC)**: Assign permissions for trainees, instructors, and admins.
- **Secure API Calls**: All data exchanges encrypted with HTTPS.
- **Session Management**: Automatic token refresh and session timeout for security.

### Training Module Access
- Authentication required before accessing any of the three training modules.
- **Access Logs**: Store and track user access history in Appwrite.
- **Progress Tracking**: Track module completion status in real time.

### Administration Dashboard
- View user registration details and login activity.
- Grant/revoke access to training modules.
- Export reports for compliance & training records.

## Tech Stack
- **Frontend**: Next.js
- **Backend**: Appwrite
- **Application Framework**: Unity