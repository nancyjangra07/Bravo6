#  DevMatch

### *More than matching — building the perfect hackathon team.*

---

##  Problem Statement

Finding the right teammates during hackathons is often stressful, inefficient, and time-consuming. Participants struggle to identify collaborators with complementary skills, shared interests, and compatible working styles.

---

##  Our Solution

**DevMatch** is a smart teammate discovery platform designed to connect users through **skill-based matching, swipe interactions, and team formation tools**. It combines an interactive frontend prototype with a scalable backend architecture to streamline team building.

---

##  Objective

To simplify hackathon team formation by combining intuitive user interaction with a powerful backend system for matching and collaboration.

---

##  Target Users

* Students participating in hackathons
* Developers, designers, and AI enthusiasts
* Beginners looking for balanced teams

---

##  Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** Supabase (PostgreSQL)
* **API Design:** RESTful APIs (OpenAPI specification)

---

##  Key Features

###  Implemented (Frontend Prototype)

*  Create developer profiles (name, role, skills, bio)
*  Browse and search users by skills
*  Dynamic profile rendering using cards
*  Basic chat interface (frontend simulation)
*  Quiz feature (frontend logic)
*  Swipe interface prototype
  
## Summary

### Your frontend modules:

* index.html → Main UI
* styles.css → Design
* app.js → Navigation
* swipe.js → Swipe system
* messaging.js → Chat
* quiz.js → Quiz
* teams.js → Teams 

###  Backend Capabilities

*  User management system
*  Swipe-based matching system
*  Mutual match creation
*  Messaging system (one-message logic)
*  Team creation with role-based requirements
*  AI-based skill match scoring

---

##  User Flow

1. User creates a profile
2. Profile is displayed in browse section
3. Users search and filter based on skills
4. Users interact via swipe prototype
5. Matches and team logic handled via backend APIs
6. Users can chat and attempt quizzes (UI prototype)

---

##  Matching Logic

* Frontend supports **basic skill-based filtering**
* Backend supports **advanced matching**:

  * Skill comparison
  * AI-based match scoring
  * Role compatibility
* Swipe system enables mutual matching

---

##  System Design Overview

* Frontend built with HTML, CSS, and JavaScript for interactive UI
* Backend exposes REST APIs for users, teams, swipes, matches, quizzes, and messaging
* Supabase is used for database and authentication
* Modular architecture allows easy scaling from prototype to full product
* API follows structured OpenAPI specification

---

##  Database Schema

The system uses a structured relational database with the following tables:

* **Users** → Profile data (skills, role, experience, personality)
* **Teams** → Team creation and role requirements
* **Swipes** → Like/dislike interactions
* **Matches** → Mutual matches between users
* **Messages** → Communication system
* **Quizzes** → Skill-based evaluation

---

##  API Overview

Key API modules include:

* Users → Create, update, fetch profiles
* Teams → Create teams and manage members
* Swipes → Like/dislike users
* Matches → Store mutual matches
* Quizzes → Skill-based questions and scoring
* Messages → Communication between users
* Matching → AI-based match scoring

---

##  Edge Cases Handled

* Users with no matching skills
* Duplicate swipes prevented
* Self-matching restricted
* Users with no available teammates
* Controlled messaging between users

---

##  Note

This project demonstrates a **working frontend prototype** along with a **fully designed backend architecture**. Backend APIs and database schema are implemented, while full frontend-backend integration is in progress.

---

##  What Makes DevMatch Unique?

* Combines **skill-based matching + swipe interaction**
* Includes **AI-driven match scoring**
* Supports **team formation with role requirements**
* Designed as a **scalable full-stack system**
* Demonstrates both **implementation and system design thinking**

---

##  Future Enhancements

*  Full frontend-backend integration
*  Real-time chat system
*  Match percentage visualization
*  Advanced AI recommendations
*  Live deployment with user authentication

---

##  Setup Instructions

```bash

# Clone the repository

git clone https://github.com/your-username/DevMatch.git

# Navigate to project

cd DevMatch

# Install dependencies

npm install

# Run backend server

node server.js
```

---

##  Screenshots

*(Add after UI is finalized)*

```
![Home Page](./screenshots/home.png)
![Browse Page](./screenshots/browse.png)
![Profile Cards](./screenshots/cards.png)
```

---

##  Evaluation Criteria Covered

*  Strong system design (full API architecture)
*  Implementation of frontend prototype
*  Clear DSA-based matching concept
*  Scalable and modular structure
*  Well-documented project

---

##  Team Contribution

* Backend Development
* Frontend Development
* Database Design
* Testing & Debugging
* Documentation & Presentation

---

##  Tagline

> *"Don’t just join a hackathon. Build the perfect team."*

---
