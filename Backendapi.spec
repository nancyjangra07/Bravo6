-1
+16
  # Do not change the title, if the title changes, the import paths will be broken
  title: Api
  version: 0.1.0
  description: API specification
  description: TeamUp hackathon platform API
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: users
    description: User management
  - name: teams
    description: Team management
  - name: swipes
    description: Swipe system
  - name: matches
    description: Match system
  - name: quizzes
    description: Quiz system
  - name: messages
    description: One-message system
  - name: matching
    description: AI skill matching
paths:
  /healthz:
    get:
-0
+418
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"
  # ── Users ──────────────────────────────────────────────────────────────────
  /users:
    get:
      operationId: listUsers
      tags: [users]
      summary: List all users
      responses:
        "200":
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
    post:
      operationId: createUser
      tags: [users]
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateUserBody"
      responses:
        "201":
          description: Created user
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /users/{id}:
    get:
      operationId: getUser
      tags: [users]
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: User found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
    patch:
      operationId: updateUser
      tags: [users]
      summary: Update user profile
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateUserBody"
      responses:
        "200":
          description: Updated user
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  # ── AI Matching ────────────────────────────────────────────────────────────
  /users/{id}/match-scores:
    get:
      operationId: getMatchScores
      tags: [matching]
      summary: Get AI skill match scores for a user against all others
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: List of match scores
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/MatchScore"
        "404":
          description: User not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  # ── Teams ──────────────────────────────────────────────────────────────────
  /teams:
    get:
      operationId: listTeams
      tags: [teams]
      summary: List all teams
      responses:
        "200":
          description: List of teams
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Team"
    post:
      operationId: createTeam
      tags: [teams]
      summary: Create a team
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateTeamBody"
      responses:
        "201":
          description: Created team
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Team"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /teams/{id}:
    get:
      operationId: getTeam
      tags: [teams]
      summary: Get team by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Team found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Team"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /teams/{id}/success-prediction:
    get:
      operationId: getTeamSuccessPrediction
      tags: [teams]
      summary: Get team success prediction score
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Team success prediction
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TeamSuccessPrediction"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /teams/{id}/suggestions:
    get:
      operationId: getTeamSuggestions
      tags: [teams]
      summary: Get instant team member suggestions based on missing roles
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Suggested users
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TeamSuggestions"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /teams/{id}/members:
    post:
      operationId: addTeamMember
      tags: [teams]
      summary: Add a member to a team
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/AddMemberBody"
      responses:
        "200":
          description: Updated team
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Team"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  # ── Swipes ─────────────────────────────────────────────────────────────────
  /swipes:
    post:
      operationId: swipeUser
      tags: [swipes]
      summary: Swipe on a user (like/dislike). Creates a match if both like each other.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SwipeBody"
      responses:
        "200":
          description: Swipe result
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SwipeResult"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  # ── Matches ────────────────────────────────────────────────────────────────
  /matches:
    get:
      operationId: listMatches
      tags: [matches]
      summary: List all matches
      parameters:
        - name: userId
          in: query
          required: false
          schema:
            type: string
          description: Filter matches by user ID
      responses:
        "200":
          description: List of matches
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Match"
  # ── Quizzes ────────────────────────────────────────────────────────────────
  /quizzes:
    get:
      operationId: listQuizzes
      tags: [quizzes]
      summary: List quizzes optionally filtered by skill
      parameters:
        - name: skill
          in: query
          required: false
          schema:
            type: string
      responses:
        "200":
          description: List of quizzes
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Quiz"
    post:
      operationId: createQuiz
      tags: [quizzes]
      summary: Create a quiz question
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateQuizBody"
      responses:
        "201":
          description: Created quiz
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Quiz"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /quizzes/submit:
    post:
      operationId: submitQuizAnswer
      tags: [quizzes]
      summary: Submit a quiz answer and update user quiz score
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/QuizSubmitBody"
      responses:
        "200":
          description: Quiz result with updated score
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/QuizResult"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  # ── Messages ───────────────────────────────────────────────────────────────
  /messages:
    post:
      operationId: sendMessage
      tags: [messages]
      summary: Send a one-time message to a matched user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SendMessageBody"
      responses:
        "201":
          description: Message sent
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Me...
[truncated]
[truncated]
-0
+1
[truncated]
