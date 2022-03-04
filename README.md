![and then logo](https://github.com/andrewilf/and-then/blob/main/src/img/and%20then%20logo.png?raw=true)
Prompt, Participate, Publish!

**Background:**
And Then is a collaborative writing platform for aspiring or adventurous authors who wish to write stories through a community. It is an attempt to solve the issues people who wish to write collaboratively face. It uses the MERN stack in its current iteration.
The backend repository can be found here: https://github.com/andrewilf/and-then-backend

**Scope:**
The project aims to cover all the features users would need to write a simple crowd sourced story. This entails the ability to write prompts, suggest paragraphs(called nodes), add nodes to the prompt storyline, and end the story which prevents further contributions from being added.

It should be noted such a platform would be envisioned to also have typical social features platforms like Reddit or WattPad would have such as: likes, comments, user messaging, and instant notifications. These will be exluded from the scope of the current project iteration.

Try it here: https://and-then-front-end.herokuapp.com/
**Note the app may initially take a while to start up on Heroku since it is hosted on a free account. If the app is reported to have crashed, refresh the page.**

# Table of Contents

- [Features](#Features)
- [Instructions](#Instructions)
- [npm Libraries Used](#npm-Libraries-Used)
- [Developer Notes](#Developer-Notes)
- [Areas to improve on/wish list](#areas-to-improve-onwish-list)
- [Running the App locally](#running-the-app-locally)
- [Links](#Links)

# Features

In its current inplementation, And Then has the following features:

- **Create stories together with a community**: lorem
  ![feed image](url)

- **Robust prompt search**: lorem
  ![feed image](url)

- **Follow story prompts**: lorem
  ![feed image](url)

- **Get recommended recently made or trending prompts**: lorem
  ![feed image](url)

# Instructions

### Creating a new prompt

### Suggesting a story node to a prompt

### Approve a suggested story node to your prompt

### End the story

### Save it as a PDF

# npm Libraries Used

- Mantine (core, hooks, modals, notifications, rte): https://mantine.dev/
- date-fns: https://www.npmjs.com/package/date-fns
- React Responsive Carousel: https://www.npmjs.com/package/react-responsive-carousel
- Radix Icons: https://icons.modulz.app/
- React to PDF: https://www.npmjs.com/package/react-to-pdf
- React Confetti Explosion: https://www.npmjs.com/package/react-confetti-explosion

# Developer Notes

- And Then is seen as an ongoing project which will go through large overhauls between versions. Extensive code rewrites will likely be required.
- Each prompt currently only has one storyline attached.
- When a suggested node is added to the storyline, all other suggested nodes are deleted.
- Nodes which have been added to a storyline currently cannot be edited by non admin users. This is to prevent user vandalism to stories should disagreements between users occur. A system where users can still perform edits should be implemented but changes should only go into effect pending the prompt owner's approval.

# Areas to improve on/wish list

- Refine Rich Text Editor, currently copying text from another source will also copy over their html as well.
- PDF generation for prompts needs to be improved. Current implementation is quite crude and may have strange formatting.
- Add appropriate error pages or redirects.
- Handle user authentication better. Requires security to be improved upon on the backend.
- Remove .env genre variable to instead use the genre variable found in "components/variousVariables.js" as they are identical.
- Add ability to tag multiple genres to a story.
- Investigate occasional application crash on Heroku server when idling for a long stretch of time. Logs seem to indicate a memory leak though no possible source of error can be found.
- Use web sockets to notify users of actions done by other users such as contributions or having their node added to a storyline.
- Add typical social features such as likes, comments, and user messaging.
- Add ability for node owners to edit nodes already added to a storyline.
- Add ability to branch out storylines from certain nodes. (A lot of rework would be required. Needs more consideration from a design perspective and user journey).
- Add light and dark mode toggle. Currently only stays in dark mode.
- Hide "mature" rated stories when not logged in and in new accounts. Mature stories will show up in the user's search if a setting is toggled.
- The ability to upload and use custom prompt cover images.

# Running the app locally

If you wish to clone and run this app on your local machine:

- you need to configure some config variables. You can edit the included file "dotenv"(remember to rename it .env) and write your own API details which the app will use.
- Run the following commands inside your AND-THEN folder: npm install, npm start.

## Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrewianfaulkner/)
