# Quiz Builder
#### Building steps:

 1. Clone the GitHub repository:

    `git clone https://github.com/jann712/quiz-builder.git`

 2. Change to the frontend directory, install the packages and start the server (on port 3000 by default)


    `cd frontend && npm i && npm run dev`


 3. Change to the backend directory to repeat the same steps for the backend (on port 4000)

    `cd backend && npm i && npm run start`

 4. Install Prisma DB on the backend (make sure you're on the correct directory)
 
    `npm install prisma --save-dev`

 5. Initialize Prisma
 
    `npx prisma init`

 6. Migrate the first iteration of the database
 
    `npx prisma migrate dev --name init`

 7. Install Prisma Client
 
    `npm install @prisma/client`
    
 8. If it didn't do it automatically during the first run, generate the database
 

    `npx prisma generate`


#### Build a sample form

With the frontend and backend running, head to 

> localhost:3000/create

to create a new quiz.
