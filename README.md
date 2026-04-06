#  DevMatch

### *More than matching — building the perfect hackathon team.*

---

##  Problem Statement

Finding the right teammates during hackathons is often stressful, inefficient, and time-consuming. Participants struggle to identify collaborators with complementary skills, shared interests, and compatible working styles.

---

##  Our Solution

**DevMatch** is a smart teammate discovery platform that connects users through **skill-based matching, swipe interactions, and real-time collaboration tools**. It simplifies team formation by helping users find the most compatible partners quickly and efficiently.

---

##  Objective

To streamline hackathon team formation by combining intelligent matching with interactive and user-friendly features.

---

##  Target Users

* Students participating in hackathons
* Developers looking for collaborators
* Beginners seeking balanced teams
* Designers and AI enthusiasts

---

##  Tech Stack

* **Frontend:** HTML, CSS, JavaScript *(or React)*
* **Backend:** Node.js, Express.js
* **Database & Auth:** Supabase

---

##  Key Features

*  **Detailed User Profiles**
  Includes skills, role, experience level, personality, and availability

*  **Smart Matching System**
  Recommends users based on shared skills and compatibility

*  **Swipe-Based Interaction**
  Like or dislike users (Tinder-style experience)

*  **Mutual Match Creation**
  Matches are created only when both users like each other

*  **Messaging System**
  Chat functionality between matched users

*  **Skill-Based Quizzes**
  Evaluate and validate user expertise

*  **Team Formation**
  Create teams with required roles and manage members

---

##  User Flow

1. User signs up and creates a profile
2. Adds skills, role, and experience
3. Browses other users via swipe interface
4. Likes or dislikes profiles
5. Mutual likes result in a match
6. Users can chat and form teams

---

##  Matching Logic

* Users are recommended based on **common skills**
* Swipe system allows interaction between users
* A match is created only on **mutual likes**
* Additional factors:

  * Role compatibility
  * Experience level
  * Quiz performance

---

##  System Design Overview

* Supabase handles **database and authentication**
* Backend manages:

  * Matching logic
  * Swipe interactions
  * Team management
* Frontend provides:

  * Interactive UI
  * Swipe experience
  * Match visualization

---

##  Database Schema

The system is structured using the following core tables:

* **Users** → Profile data (skills, role, experience, personality)
* **Teams** → Team creation and role requirements
* **Swipes** → User interactions (like/dislike)
* **Matches** → Mutual connections between users
* **Messages** → Communication between matched users
* **Quizzes** → Skill-based questions and evaluation

---

##  Core Functionalities

* Create and manage user profiles
* Swipe (like/dislike) other users
* Generate matches based on mutual interest
* Send messages between matched users
* Create and manage teams
* Evaluate skills through quizzes

---

##  Edge Cases Handled

* Users with no matching skills
* Duplicate swipes prevented
* Self-matching restricted
* Users with no available teammates
* Messaging restricted to matched users only

---

##  Setup Instructions

```bash

# Clone the repository

git clone https://github.com/your-username/DevMatch.git

# Navigate to project directory

cd DevMatch

# Install dependencies

npm install

# Start the server

npm start
```

---

##  Screenshots

*(Add after UI is ready)*

```
![Home Page](./screenshots/home.png)
![Swipe Interface](./screenshots/swipe.png)
![Matches Page](./screenshots/matches.png)
```

---

##  Challenges Faced

* Designing an efficient and fair matching system
* Handling real-time interactions (swipes & matches)
* Managing relational data (users, teams, matches)
* Ensuring smooth user experience

---

##  What Makes DevMatch Unique?

* Combines **skill-based matching + swipe interaction**
* Supports **real-time communication**
* Includes **quiz-based skill validation**
* Enables **structured team formation**
* Inspired by modern matchmaking apps but built for developers

---

##  Future Enhancements

*  Real-time chat with notifications
*  Match percentage visualization
*  Advanced AI-based recommendations
*  Smart notifications for new matches
*  Deployment with live collaboration

---

##  Evaluation Criteria Covered

*  Strong DSA-based matching logic
*  Scalable system design
*  Functional MVP with advanced features
*  Clean and intuitive UI
*  Complete and structured documentation

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
