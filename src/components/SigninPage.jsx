import {
  Group,
  Title,
  TextInput,
  InputWrapper,
  PasswordInput,
  Button,
  Anchor,
  Blockquote,
  Space,
  Skeleton,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeOpenIcon, LockClosedIcon } from "@modulz/radix-icons";
import { useForm } from "@mantine/hooks";
import { useEffect, useState, useContext } from "react";
import { LoginContext, adminContext, userContext } from "../global/context";

const SigninPage = (props) => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      // password: (value) => value.trim().length >= 2,
    },
    errorMessages: {
      email: "Enter a valid email address",
      // password: "Prompt must include at least 2 letters",
    },
  });
  const attemptLogin = async (loginPayload) => {
    try {
      const response = await fetch(
        "https://and-then-backend.herokuapp.com/session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginPayload),
        }
      );
      const data = await response.json();
      console.log(data);
      setUser(data.payload);
      setLoggedIn(true);
      if (data.payload.role === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log("login failed");
      setAdmin(false);
      setUser(false);
      setLoggedIn(false);
      setError("Invalid login");
    }

    // else {
    //   console.log("login failed");
    //   setAdmin(false);
    //   setUser(false);
    //   setLoggedIn(false);
    //   setError("Invalid Login");
    // }
  };

  return (
    <div style={{ width: "50%", margin: "auto", padding: "5% 5% 5% 5%" }}>
      <form
        onSubmit={form.onSubmit((values) => {
          //console.log(values);
          attemptLogin(values);
        })}
      >
        <Group position="center" direction="column" grow>
          <Title align="center">Login</Title>

          {props.quoteAuthor === "" ? (
            <div>
              <Skeleton height={15} mt={12} radius="xl" />
              <Skeleton height={15} mt={12} radius="xl" />
              <Skeleton height={15} mt={12} width="30%" radius="xl" />
            </div>
          ) : (
            <Blockquote cite={props.quoteAuthor}>{props.quote}</Blockquote>
          )}

          <InputWrapper
            id="input-email"
            required
            label="Email"
            description="Please enter email account is registered to."
          >
            <TextInput
              id="input-email"
              placeholder="Your email"
              icon={<EnvelopeOpenIcon />}
              onFocus={()=> {setError("")}}
              {...form.getInputProps("email")}
            />
          </InputWrapper>
          <InputWrapper
            id="input-password1"
            required
            label="Password"
            description="Please enter password."
            error={error}
          >
            <PasswordInput
              id="input-password"
              icon={<LockClosedIcon />}
              placeholder="Your password"
              onFocus={()=> {setError("")}}
              {...form.getInputProps("password")}
            />
          </InputWrapper>
        </Group>
        <Space h="15px" />
        <Group position="apart">
          <Anchor
            size="xs"
            weight={400}
            underline={true}
            component={Link}
            variant="text"
            to="/signup"
          >
            Need an account?
          </Anchor>
          <Button radius="md" color="dark" type="submit">
            Login
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default SigninPage;
