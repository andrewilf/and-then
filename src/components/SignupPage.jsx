import {
  Group,
  Title,
  Input,
  InputWrapper,
  PasswordInput,
  Button,
  Anchor,
  Space,
  Blockquote,
  TextInput,
  Grid,
  Skeleton,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeOpenIcon, PersonIcon } from "@modulz/radix-icons";
import { useForm } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useNotifications } from "@mantine/notifications";

const SignupPage = (props) => {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      password2: "",
      username: "",
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      username: (value) => value.trim().length >= 3,
      password: (value) => value.trim().length >= 6,
      password2: (value) => value === form.values.password,
    },
    errorMessages: {
      email: "Enter a valid email address",
      username: "Username must be at least 3 characters long",
      password: "Password must be at least 6 characters long",
      password2: "Retyped password does not match",
      //username: "Username already in use",
    },
  });

  const checkUsername = async (usernameToCheck) => {
    const baseURL = `https://and-then-backend.herokuapp.com/user/username/${usernameToCheck}`;
    //console.log(baseURL)
    try {
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        //body: JSON.stringify({ storyline: props.storyline }),
      });
      const data = await response.json(); //.then(props.promptAPI());
      console.log(data);
      if (!data.error) {
        form.setErrors({ username: "Username already in use" });
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("error>>>", error);
      return false;
    }
  };

  const checkEmail = async (emailToCheck) => {
    const baseURL = `https://and-then-backend.herokuapp.com/user/email/${emailToCheck}`;
    //console.log(baseURL)
    try {
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        //body: JSON.stringify({ storyline: props.storyline }),
      });
      const data = await response.json(); //.then(props.promptAPI());
      console.log(data);
      if (!data.error) {
        form.setErrors({ email: "Enter a valid email address" });
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("error>>>", error);
      return false;
    }
  };

  const checkPasswordRetype = () => {
    if (form.values.password !== form.values.password2) {
      form.setErrors({ password2: "Retyped password does not match" });
      //  form.setErrors({ password2: "Retyped password does not match" });
      return false;
    } else {
      form.setErrors({ password2: "" });
      return true;
      // form.setErrors({ password2: "" });
    }
  };

  const createUserAPI = async (payload) => {
    try {
      const response = await fetch(
        "https://and-then-backend.herokuapp.com/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("prompt creation failed");
    }
  };
  useEffect(() => {
    document.title = `Then - Sign Up`;
  }, []);
  return (
    <div style={{ width: "50%", margin: "auto", padding: "5% 5% 5% 5%" }}>
      <form
        onSubmit={form.onSubmit( async(values) => {
          setLoading(true);
          if (await checkUsername(values.username) && await checkEmail(values.email)) {
            console.log(values);
            createUserAPI(values);
            notifications.showNotification({
              title: "Prompt created",
              message: "Hey there, your account has been created. Login to get started!",
              color: "green",
              //  style: { backgroundColor: "red" },
            });
            setLoading(false);
            navigate("/signin");
          }
          else {
            console.log("failed check")
            setLoading(false);
          }
          //attemptLogin(values);
        })}
      >
        <Group position="center" direction="column" grow>
          <Title align="center">Create account</Title>
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
            id="input-username"
            required
            label="Username"
            description="Please enter a unique username, it can be changed later."
            //error="Username unavailable"
          >
            <TextInput
              id="input-username"
              placeholder="Your username"
              {...form.getInputProps("username")}
              // onBlur={() => {
              //   form.setErrors({ email: "o no" });
              // }}
              icon={<PersonIcon />}
            />
          </InputWrapper>
          <InputWrapper
            id="input-email"
            required
            label="Email"
            description="Please enter a unique email."
            //error="Email unavailable"
          >
            <TextInput
              id="input-email"
              icon={<EnvelopeOpenIcon />}
              placeholder="Your email"
              {...form.getInputProps("email")}
              // error={error}
            />
          </InputWrapper>

          <Grid grow>
            <Grid.Col span={3}>
              <InputWrapper
                id="input-password1"
                required
                label="Password"
                description="Please enter a unique password."
                // error="password error"
              >
                <PasswordInput
                  id="input-password"
                  placeholder="Your password"
                  {...form.getInputProps("password")}
                />
              </InputWrapper>
            </Grid.Col>
            <Grid.Col span={3}>
              <InputWrapper
                id="input-password2"
                required
                label="Retype Password"
                description="Please retype your password."
                //error="password does not match"
              >
                <PasswordInput
                  id="input-password2"
                  placeholder="Retype password"
                  {...form.getInputProps("password2")}
                  onBlur={() => {
                    checkPasswordRetype();
                  }}
                />
              </InputWrapper>
            </Grid.Col>
          </Grid>
        </Group>
        <Space h="15px" />
        <Group position="apart">
          <Anchor
            size="xs"
            weight={400}
            underline={true}
            component={Link}
            variant="text"
            to="/signin"
          >
            Already have an account?
          </Anchor>
          <Button radius="md" color="dark" type="submit" disabled={loading}>
            Create account
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default SignupPage;
