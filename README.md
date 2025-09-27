# Document Management System

A web application for managing documents with user authentication and role-based access. Users can upload documents with a title and tags, while admins can view all uploaded documents.

## Features

- **User Authentication:** Register and login to access the system.
- **Role-Based Access:**
  - **Users:** Can upload documents and view their own uploads.
  - **Admin:** Can Upload and Can view all uploaded documents.
- **Document Upload:**
  - Upload multiple files at once.
  - Add a title and tags for each document.
- **File Validation:** Only image files (JPG, PNG, GIF) are allowed, with a maximum size of 5MB per file.
- **Secure:** Sensitive information stored in `.env` and protected routes for authenticated users.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Material UI
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Local
