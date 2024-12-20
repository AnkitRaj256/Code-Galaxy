import { useGoogleLogin } from "@react-oauth/google";
import googleAuth from "./api";
import {useNavigate} from 'react-router-dom';
import { FaGoogle, FaGithub } from "react-icons/fa";
    
const GoolgeLogin = (props) => {
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
		try {

            if (authResult["code"]) {
				const result = await googleAuth(authResult.code);			
				//const {email, name} = result.data.user;
				//const token = result.data.token;
				//const obj = {email,name, token, image};
				console.log(result);
				//localStorage.setItem('user-info',JSON.stringify(obj));
				//navigate('/dashboard');
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
          <div className="social-login">
            <button className="social-btn google" onClick={googleLogin}>
              <FaGoogle /> Sign in with Google
            </button>
          </div>
        );
};

export default GoolgeLogin;