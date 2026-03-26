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


### DATE : 25-03-2026
### Inorder to store images/files we will use cdn services like cloudinary/aws
    - Client-side app -> we uses FormData(multipart/formdata) -> it allows both binary/text content to store and send.

    - HTTP Server -> uses express.json()-->req.body
        - But inorder to extract files from req we uses multer 

    - API will take those files and stores them in cloudinary , cloudinary will returns one cdn link that stores in database
        - To upload the file to cloudinary it will take sometime, during that time we need to store the the image somewhare, for that we have 2 ways:
            - 1. Creating one folder in server like uploads/
            - 2. Storing them in RAM.
                - We can reduce the storage by asking users to upload the images with limited size by compressing.

    - Database stores that cdn links for reference

### onChange() event will be occured when content is changed in input field

### Flow
    User selects file
        |
    Frontend validates (intant feedback)
        |
    User submits form
        |
    Backend validates again (security layer)
        |
    Upload -> Save

- Add state to React component for preview. This will store a temporary image URL to display

### Process to use FormData
//create a FormData object
    const formData = new FormData();

//add all user properties to formData object
    formData.append("role", newUser.role);
    formData.append("firstName", newUser.firstName);
                    (or)
let { role, profileImageUrl, ...userObj } = newUser;
    //add all fields except profilePic to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    // add profilePic to Formdata object
    formData.append("profileImageUrl", profileImageUrl[0]);

let resObj = await axios.post("http://localhost:5000/user-api/users", formData);


### images for in backend


### protecting routes in frontend 

- Create one protected components and wrap the restricted components into it.
    <!-- Ex : <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashbourd />
         </ProtectedRoute> -->

    <!-- function ProtectedRoute({ children, allowedRoles }) {
          return children;
    }

    export default ProtectedRoute; -->


### Page Refress
    Place this in RootLayout
        const refreshPage = useAuth(state=>state.refreshPage);
        const loading = useAuth(state=>state.loading);
        
        useEffect(() => {
            refreshPage();
        }, []);

    In Store
        const res = await axios.get("http://localhost:5000/common-api/check-auth", { withCredentials : true});
        //update the state
         set({loading:false, isAuthenticated: true, currentUser: res.data.payload});

    In backend
        <!-- Generate the token
        const token = jwt.sign({userId : user._id, role : user.role, email : user.email}, process.env.JWT_SECRET, { expiresIn : '1h' }); -->
        const userObj = user.toObject();
        delete userObj.password;
        const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn : '1h' });