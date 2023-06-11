import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";

export default function dashboard() {
  const [user, loading] = useAuthState(auth);
  const rout = useRouter();
  if (loading) return <h1>Loading...</h1>;
  if (!user) rout.push("/auth/login");
  return (
    user && (
      <div>
        <h1>Welcome your dashboard {user.displayName}</h1>
        <button
          onClick={() => auth.signOut()}
          className="bg-blue-500 text-white p-2 rounded-md mt-10"
        >
          Sign out
        </button>
      </div>
    )
  );
}
