import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFail, signInSuccess } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("api/auth/google", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate("/home");
            } else dispatch(signInFail(res.statusText));
        } catch (error) {
            res.error("Google authentication failed");
        }
    };

    return (
        <button
            className="bg-red-600 text-white rounded-lg  p-3 uppercase hover:opacity-95"
            type="button"
            onClick={handleGoogleClick}
        >
            Continue with Google
        </button>
    );
}
