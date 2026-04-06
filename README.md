#  DevMatch

### *Find your perfect hackathon teammate.*

---

##  Problem Statement

In hackathons, finding the right teammates is often stressful, time-consuming, and inefficient. Participants struggle to connect with people who have complementary skills, leading to poorly formed teams and reduced productivity.

---

##  Our Solution

**DevMatch** is a smart matchmaking platform that connects users based on their skills and interests. By analyzing user profiles, DevMatch suggests the most compatible teammates, helping participants build strong and balanced teams quickly.

---

##  Objective

To simplify team formation in hackathons by providing an efficient, skill-based matching system.

---

##  Target Users

* Students participating in hackathons
* Developers looking for collaborators
* Beginners seeking balanced teams

---

##  Tech Stack

* **Frontend:** HTML, CSS, JavaScript *(or React)*
* **Backend:** Node.js, Express.js
* **Database:** MongoDB *(or local storage for MVP)*

---

##  Key Features

*  Create a user profile with skills
*  Find teammates based on matching skills
*  View ranked matches based on compatibility
*  Fast and simple user flow

---

##  User Flow

1. User creates a profile by entering name and skills
2. System stores the user data
3. User clicks on "Find Matches"
4. Matching algorithm compares skills
5. Best matches are displayed in descending order

---

##  Matching Algorithm

DevMatch uses a simple yet effective scoring system:

* Match score = number of common skills between users
* Users are ranked based on highest match score

This ensures that users with the most similar skill sets are recommended first.

---

##  System Design Overview

* REST API built using Express.js
* User data stored in database
* Matching logic handled on server side
* Frontend communicates with backend via API calls

---

##  API Endpoints

###  Create User

```
POST /user
```

**Request Body:**
```json
{
"name": "Aman",
"skills": ["C++", "ML"]
}
```

---

###  Get Matches

```
GET /match/:userId
```

**Response:**
```json
[
{ "name": "Riya", "score": 2 },
{ "name": "Karan", "score": 1 }
]
```

---

##  Edge Cases Handled

* No users available
* No matching skills
* Duplicate or invalid entries
* Self-matching avoided

---

##  Setup Instructions

```bash

# Clone the repository

git clone https://github.com/your-username/DevMatch.git

# Navigate to project

cd DevMatch

# Install dependencies

npm install

# Run the server

npm start
```

---

##  Screenshots

*(Add images after UI is ready)*

```
![Home Page](./screenshots/home.png)
![Matches Page](./screenshots/matches.png)
```

---

##  Challenges Faced

* Designing an efficient matching algorithm
* Handling users with sparse or no overlapping skills
* Ensuring smooth integration between frontend and backend

---

##  Future Enhancements

*  Real-time chat between matched users
*  Advanced skill-based scoring system
*  Match percentage visualization
*  Notifications for new matches

---

##  Evaluation Criteria Covered

*  Strong DSA-based matching logic
*  Clean system design
*  Functional MVP
*  User-friendly interface
*  Complete documentation

---

##  Team Contribution

* Backend Development
* Frontend Development
* Database Design
* Documentation & Presentation

---

##  Tagline

> *"Don’t just join a hackathon. Find your perfect team."*

---
