import {
  Group,
  Title,
  Input,
  InputWrapper,
  PasswordInput,
  Button,
  Anchor,
  Blockquote,
  LoadingOverlay,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { EnvelopeOpenIcon, LockClosedIcon } from "@modulz/radix-icons";
import { useForm } from "@mantine/hooks";
import { useEffect, useState } from "react";

const SigninPage = (props) => {
  

  return (
    <div style={{ width: "50%", margin: "auto", padding: "5% 5% 5% 5%" }}>
      <Group position="center" direction="column" grow>
        <Title align="center">Login</Title>
  
        <Blockquote cite={props.quoteAuthor}>
          {props.quote}
        </Blockquote>
       
        <InputWrapper
          id="input-email"
          required
          label="Email"
          description="Please enter email account is registered to."
          error="Email error"
        >
          <Input
            id="input-email"
            placeholder="Your email"
            icon={<EnvelopeOpenIcon />}
          />
        </InputWrapper>
        <InputWrapper
          id="input-password1"
          required
          label="Password"
          description="Please enter password."
          error="password error"
        >
          <PasswordInput
            id="input-password"
            icon={<LockClosedIcon />}
            placeholder="Your password"
          />
        </InputWrapper>
      </Group>
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
        <Button radius="md" color="dark">
          Login
        </Button>
      </Group>
    </div>
  );
};

export default SigninPage;
