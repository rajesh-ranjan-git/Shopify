import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase.config";

const googleAuthFirebase = async () => {
  const provider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(firebaseAuth, provider);

  const formData = {
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
  };

  console.log("formData : ", formData);

  return formData;
};

export default googleAuthFirebase;
