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