                                           Blog App
                                                |
                                                |
                                           Types of a Roles
                                        /           |           \
                                Auther              User           Admin
                               |                    |                    \
                        Registration               Registration            Login
                        Login                      Login                   View Article
                        Add Article                View Article            Block & Activate User
                        View a Article             write comments
                        Edit & Del Article


                        Soft Delete


### Backend Development

1. Create git repo
    git init

2. add .gitignore file

3. Create .env file for Environment variables & Read data from .env with 'dotenv' module
    npm i dotenv

4. Genarate package.json
    npm init -y

5. Download express module
    npm i express

6. Connect to Database

7. Add Middlewares( body-parser, err handling middlewares )

8. Design Schemas and create models
    1. User
    2. Article
    3. Comment

        1. User Fields (   role[author | admin | user], firstName, lastName, email, profileImageUrl, isActive[true | false]  )

        2. Article Fields (    Author : ref , title, category, content, dateOfCreation, deteOfModification, comments : [userCommentsSchema], isArticleActive[true | false]   )

        3. Comment Fields ( user : ref , comment )

9. Design REST APIs for ALL resources

### Registration & Login

10. Registration & login in common for USER & AUthOR. Create a seperate service for reuse

11. The Client 

### Frontend Development

    Create new React app
    Install TailwindCSS
    Install react-hook-form
    Create the following components 
        a. Home
        b. Register
        c. Login
        d. AddArticle
        e. UserDashboard
        f.  AuthorDashboard
        g. AdminDashboard
    Design forms in Register, Login & AddArticle components  with responsive nature as like in the attached sample UIs

### Date : 10-03-2026   =>  Week9(Day2)
    1. For styles create one common.js file.

    fetch Vs axios
    fetch : manual testing of status code

    what is the proof that token is sending through req
    cors

    npm i react-hot-toast

### From UserProfile/UserDashboard component.
    -   Read articles of all authors
    -   Display them in the form of Grid of cards
            1. card for extra small
            2. cards for small
            3. cards for medium
            4. cards from large screen onwards

### From AuthorProfile component
    -   Read articles of his own
    -   Display them in the form of Grid of cards
            1. card for extra small
            2. cards for small
            3. cards for medium
            4. cards from large screen onwards