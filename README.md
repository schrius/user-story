# User Story (Under development)
Simple ticketing system application

## Front End
Users is able to submit a story(ticket) and view the stories from the front-end when authorizied.
JWT is stored in local storage. JWT will be removed if logged out.
Admin have a seperate view that can review all stories(ticket) and decide to accept it or reject the request.

## Back End
Back end is resposible for authorization and authenicaiton using JWT.
Once user is authorized a JWT is returned.

User can only request stories that corresponding to its user ID, and create a new story when logged in.

Admin can request update to the story status and get all stories.

## Testing
Manually integration test was performed in Mac, and utilize third-party library for cross environment testing.

## Database - MySQL
ormconfig.json contain test environment configuration

### Setup
1. Run `npm i` command in both front-end and backend
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
4. To initialized test data run:
```bash
npm run migration:run
```
5. To clear the test data run:
```bash
npm run migration:revert
```
6. To run test
```bash
npm test
```

### Project Structure

```bash
├── README.md
├── back-end
│   ├── README.md
│   ├── jest.config.js
│   ├── ormconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── __test__
│   │   │   └── index.test.js
│   │   ├── config
│   │   │   └── config.ts
│   │   ├── controllers
│   │   │   ├── AuthController.ts
│   │   │   ├── StoryController.ts
│   │   │   └── UserController.ts
│   │   ├── entity
│   │   │   ├── Story.ts
│   │   │   └── User.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   ├── checkJwt.ts
│   │   │   └── checkRole.ts
│   │   ├── migration
│   │   │   ├── 1585607730140-CreateAdminUser.ts
│   │   │   └── 1585676396443-CreateStory.ts
│   │   └── routes
│   │       ├── auth.ts
│   │       ├── index.ts
│   │       ├── story.ts
│   │       └── user.ts
│   └── tsconfig.json
└── front-end
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── api
    │   │   ├── index.js
    │   │   └── story.js
    │   ├── components
    │   │   ├── RouteWithLayout.js
    │   │   ├── StoryDialog.js
    │   │   ├── Topbar.js
    │   │   └── index.js
    │   ├── constants
    │   │   └── actionTypes.js
    │   ├── index.css
    │   ├── index.js
    │   ├── layout
    │   │   ├── index.js
    │   │   └── layout.js
    │   ├── logo.svg
    │   ├── middleware.js
    │   ├── redux
    │   │   ├── actions
    │   │   │   ├── index.js
    │   │   │   ├── login.js
    │   │   │   └── storyList.js
    │   │   └── reducer
    │   │       ├── index.js
    │   │       ├── login.js
    │   │       └── story.js
    │   ├── routes
    │   │   ├── index.js
    │   │   ├── privateRoute.js
    │   │   └── userRoute.js
    │   ├── serviceWorker.js
    │   ├── setupTests.js
    │   ├── store.js
    │   └── views
    │       ├── 404.js
    │       ├── auth
    │       │   ├── Login.css
    │       │   └── Login.js
    │       ├── index.js
    │       └── story
    │           ├── CreateStory.css
    │           ├── CreateStory.js
    │           ├── StoryApproval.js
    │           └── StoryList.js
    └── yarn.lock
```