**API Endpoints**

1. GET /scores

Description: Retrieve the top 10 scores for the scoreboard.

Request:

GET /scores HTTP/1.1
Host: api.example.com

Response:

{
  "data": [
    { "userId": "123", "username": "Alice", "score": 500 },
    { "userId": "456", "username": "Bob", "score": 450 },
    ...
  ],
  "timestamp": "2025-01-13T12:00:00Z"
}

2. POST /scores

Description: Update the score for a user upon action completion.

Request:

POST /scores HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer ...

{
  "actionId": "abc123"
}

Response:

Success:

{
  "status": "success",
  "newScore": 520
}

Error (Unauthorized):

{
  "status": "error",
  "message": "Unauthorized"
}

**Execution Flow**

1. Action Completion:

User performs an action on the website.

The frontend sends a POST /scores request to the API with the actionId in body with JWT token in session.

2. Score Update:

The API validates the JWT token and know which user is updating score.

The server cross-references the actionId with valid actions.

If valid, the backend compares the new score with the 10th ranked user, if it is higher then this user will be in the top 10, otherwise the backend will just update his score in the database.

The top 10 users's id, name and score are stored in Cache.

3. Broadcast Update:

The API publishes the updated top 10 scores via WebSocket or a pub/sub mechanism.

The frontend updates the scoreboard in real time.

**Security Measures**

1. Authentication:

Require a valid JWT token for all score update requests.

Use JWT or OAuth2 for authentication.

2. Action Validation:

Verify that actionId corresponds to a legitimate, completed action.

3. Rate Limiting:

Implement rate limiting to prevent excessive score update requests from a single user.

4. Input Sanitization:

Sanitize all input to prevent SQL injection and other attack vectors.

**Database Design**

Table: scores

| Column     |      Type     |  Description                |
|------------|:-------------:|----------------------------:|
| userId     |  VARCHAR(50)  | Unique identifier for users |
| username   |  VARCHAR(100) | Display name of the user    |
| score      |  INT          | User's current score        |
| updated_at |  TIMESTAMP    | Last score update time      |
