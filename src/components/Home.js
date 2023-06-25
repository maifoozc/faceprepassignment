import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const LOAD_DELAY = 1000;
  const CARD_HEIGHT = 90;

  // This is the `loginValidator` function.
  // It is used to check if the user is logged in.
  const loginValidator = () => {
    if (
      localStorage.getItem("username") !== "foo" ||
      localStorage.getItem("password") !== "bar"
    ) {
      navigate("/");
    }
  };

  // This is the `logoutHandler` function.
  // It is used to logout the user.
  const logoutHandler = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    navigate("/");
  };

  useEffect(() => {
    loginValidator();
  }, []);

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numCards, setNumCards] = useState(0);

  const userAPI = `https://randomuser.me/api/?results=${numCards}&page=${page}`;

  // This is the `fetchUserList` function.
  // It is used to fetch the list of users from the API.
  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(userAPI);
      setUserList((prevUserList) => [
        ...prevUserList,
        ...response.data.results,
      ]);

      setTimeout(() => {
        setIsLoading(false);
      }, LOAD_DELAY);
    } catch (err) {
      console.error(err, "error");
      setIsLoading(false);
    }
  };

  // This code is run when the window is resized
  useEffect(() => {
    const calculateNumCards = () => {
      const windowHeight = window.innerHeight;
      const numCards = Math.floor(windowHeight / CARD_HEIGHT);
      setNumCards(numCards);
    };

    calculateNumCards();
    window.addEventListener("resize", calculateNumCards);

    return () => {
      window.removeEventListener("resize", calculateNumCards);
    };
  }, []);

  useEffect(() => {
    fetchUserList();
  }, [numCards, page]);




  // This is the `handleScroll` function.
  // This code is run when the scroll is used
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={logoutHandler}
          sx={{ backgroundColor: "gold", color: "#000" }}
        >
          Logout
        </Button>
      </div>

      <div style={{ margin: "20px", height: "88vh" }}>
        {userList.map((user, index) => (
          <div key={user.id.name}>
            <Card sx={{ maxWidth: 220, marginBottom: 2 }}>
              <CardMedia
                sx={{ height: 90 }}
                image={user.picture.large}
                title={`${user.name.title} ${user.name.first}`}
              />
              <CardContent>
                <Typography>
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </Typography>
              </CardContent>
            </Card>
            {isLoading && index === userList.length - 1 && (
              <Skeleton variant="rectangular" width={220} height={100} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
