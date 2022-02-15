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
  Skeleton,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { EnvelopeOpenIcon, PersonIcon } from "@modulz/radix-icons";
import { useForm } from "@mantine/hooks";

const SignupPage = (props) => {
  return (
    <div style={{ width: "50%", margin: "auto", padding: "5% 5% 5% 5%" }}>
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
          error="Username unavailable"
        >
          <Input
            id="input-username"
            placeholder="Your username"
            icon={<PersonIcon />}
          />
        </InputWrapper>
        <InputWrapper
          id="input-email"
          required
          label="Email"
          description="Please enter a unique email."
          error="Email unavailable"
        >
          <Input
            id="input-email"
            icon={<EnvelopeOpenIcon />}
            placeholder="Your email"
          />
        </InputWrapper>

        <Group position="apart" grow>
          <InputWrapper
            id="input-password1"
            required
            label="Password"
            description="Please enter a unique password."
           // error="password error"
          >
            <PasswordInput id="input-password" placeholder="Your password" />
          </InputWrapper>
          <InputWrapper
            id="input-password2"
            required
            label="Retype Password"
            description="Please retype your password."
            //error="password does not match"
          >
            <PasswordInput id="input-password2" placeholder="Retype password" />
          </InputWrapper>
        </Group>
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
        <Button radius="md" color="dark">
          Create account
        </Button>
      </Group>
    </div>
  );
};

export default SignupPage;
