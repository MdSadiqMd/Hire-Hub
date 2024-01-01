import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/homePage");
    return null;
  }

  return (
    <>
      <h1>Login</h1>
      <h2>Login with Google</h2>
      <button onClick={() => signIn("google")}>
        <FcGoogle /> Login
      </button>
    </>
  );
};

export default Home;
