import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Login() {
  const rout = useRouter();
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      rout.push("/dashboard");
    } catch (error) {}
  };
  const FacebookProvider = new FacebookAuthProvider();
  const FaceBookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, FacebookProvider);
      const credential = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credential.accessToken;
      let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
    } catch (error) {}
  };
  useEffect(() => {
    if (user) {
    }
  }, [user]);
  return (
    <div className="shadow-xl mt-32 p-10 text-grey-700 rounded-lg">
      <h2 className="text-3xl font-medium">Join today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
      </div>
      <div className="flex flex-col gap-4 ">
        <button
          className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2"
          onClick={GoogleLogin}
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <button
          onClick={FaceBookLogin}
          className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2"
        >
          <AiFillFacebook className="text-2xl text-blue-400" />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}
