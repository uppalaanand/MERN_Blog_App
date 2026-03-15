import {create} from 'zustand'
import axios from 'axios'

export const useAuth = create((set) => ({
    currentUser:null,
    loading:false,
    isAuthenticated:false,
    error:null,
    login:async (userCredWithObj) => {
        const {role, ...userCredObj} = userCredWithObj;
        try {
            //set loading true
            set({loading:true, error:null});
            //make api call
            let res = await axios.post("http://localhost:5000/common-api/login", userCredObj, {withCredentials:true});
            console.log("res is", res, res.status);
            if(res.data?.message === "error") {
                console.log("not 200", res.data);
                set({error: res.data.reason, isAuthenticated: false, currentUser: null, loading: false})
            }else{
            //update state
                set({loading:false, isAuthenticated: true, currentUser: res.data.payload});
            }
        }catch(err) {
            console.log("err is:", err);
            set({loading:false, error:err.response?.data?.error || "Login Failed", isAuthenticated: false, currentUser: null});
        }
        console.log(loading, isAuthenticated, currentUser, error);
    },
    logout:async () => {
        try {
            //set loading state
            set({loading:true, error:null});
            //make api request
            await axios.get("http://localhost:5000/common-api/logout", { withCredentials: true});
            //update state
            set({loading:false, isAuthenticated: false, currentUser: null});
        }catch(err) {
            set({
                loading: false,
                isAuthenticated : false,
                currentUser: null,
                error: err.response?.data?.error || "Logout failed",
            })
        }
    },
}))