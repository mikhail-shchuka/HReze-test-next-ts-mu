import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

const Home: NextPage = () => {
  const user = useAppSelector(store => store.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  });

  return <h1>Title</h1>;
};

export default Home;
