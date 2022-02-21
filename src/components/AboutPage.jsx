import { Title, Divider, Text, Space } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
const AboutPage = () => {
  useEffect(() => {
    document.title = `Then - About`;
  }, []);
  return (
    <div
      style={{
        padding: "5% 5% 5% 5%",
      }}
    >
      <Title>About</Title>
      <Divider />
      <Text>
        And Then is an independent project which aims to create a collaborative
        writing platform for aspiring authors. The platform is a React app with
        an express server set up to handle the backend. All MongoDB database
        transactions are done using Mongoose.
      </Text>
      <Space h="65px" />
      <Title>Feedback</Title>
      <Divider />
      <Text>
        Please send all feedback or bug reports to Andrew Faulkner. You should
        have my contact if you are a part of the Alpha launch :,)
      </Text>
      <Space h="65px" />
      <Title>Changelog</Title>
      <Divider />
      <Space h="15px" />
      <Title order={3}>version 0.7 (Alpha test)</Title>
      <ul>
        <li>Storylines can now be ended</li>
        <li>Titles change on page change, faveicon changed</li>
      </ul>
      <Space h="15px" />
      <Title order={3}>version 0.6 (Alpha test)</Title>
      <ul>
        <li>basic functionality implemented</li>
      </ul>
      <Title order={3}>Upcoming features</Title>
      <ul>
        <li>Able to save stories as PDFs</li>
        <li>Profile Page works</li>
        <li>I am new page populated</li>
        <li>About page populated</li>
      </ul>
    </div>
  );
};

export default AboutPage;
