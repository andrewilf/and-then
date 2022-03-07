![and then logo](https://github.com/andrewilf/and-then/blob/main/src/img/and%20then%20logo.png?raw=true)
Prompt, Participate, Publish!

**Background:**
And Then is a collaborative writing platform for aspiring or adventurous authors who wish to write stories through a community. It is an attempt to solve the issues people who wish to write collaboratively face. It uses the MERN stack in its current iteration.
The backend repository can be found here for more information on its implementation: https://github.com/andrewilf/and-then-backend

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
### Create stories together with a community
Using And Then, you can create story prompts you feel others will be interested in. Other users can contribute nodes to prompts which appear as suggested nodes. If the prompt owners likes a particular suggested node, they can approve it so it appears on the prompts storyline.

### Robust prompt search
Search for the stories you are interested in. Find prompts with names or tags which interest you and be a part of their journey.
![search fields](https://github.com/andrewilf/and-then-backend/blob/main/readme_img/Search%20fields%20image.png?raw=true)

### Follow story prompts
Found a prompt you like? With an account you can click on the follow switch and have the prompt saved you your homepage for quick access and to let the prompt owner know that you love their project.
![follow](https://github.com/andrewilf/and-then/blob/main/readme_imgs/follow.png?raw=true)
### Get recommended recently made or trending prompts
Curious about what's new or hot? On the home page look through the 3 latest or trending prompts on the platform. Join a project that just started or be part of the momentum of the next big project around.
  
### Get suggested a random prompt
If you are feeling particularly adventurous search for a random prompt. You will be brought to a prompt you might have never thought about searching for. This feature can be found by clicking on the random prompt option on the top bar.
![random](https://github.com/andrewilf/and-then/blob/main/readme_imgs/randombar.png?raw=true)
# Instructions

This acts as a guide on how to generally use the platform:

### Create an account and login
Most features of And Then need an account to access besides searching and reading existing prompts on the platform. You need to log into the account after it has been created. Do note passwords cannot be recovered in the current implementation so be careful. All passwords stored on the database are hashed so even admin users cannot figure out what your password is.
### Creating a new prompt
To create a prompt, click on the create prompt password found on the top left of the all prompts page. You will be brought to a creation page. Here you must enter the prompt title, prompt text, additional info you feel is relevant to contributors( such as writing point of view or approval conditions), genre (only 1 genre can currently be chosen), rating, and banner image. 
As a prompt owner you can still edit prompts so do not stress out if you accidentally make a typo or feel your prompt has moved in a very different direction since the beginning.
![create prompt](https://github.com/andrewilf/and-then/blob/main/readme_imgs/createprompt.png?raw=true)
### Suggesting a story node to a prompt
If you wish to contribute to a prompt instead, find a prompt you want to contribute and click on the contribute node button at the bottom of the page. You will be brought to the create node page with a text editor to type in your contribution.
Do note while a node is still a suggested node it can be edited. However if your node gets added to a storyline, it currently cannot be edited by a non-admin user.

### Approve a suggested story node to your prompt
If multiple people suggest a node to your prompt, you can browse all the contributions. As the prompt owner if you find a particular node which you like, click on the checkbox to add it to the prompt's storyline. Do note nodes added to a storyline cannot be removed.

### End the story
As a prompt owner, if you wish to end a prompt and prevent any further contributions from being made, scroll to the bottom of the prompt and click the green "The End." button. A modal will appear to confirm if you want to end the story.
![feed image](url)
Congratulations on completing your story!
### Read or save it for later
If you want to read a prompt's full storyline in a more traditional manner without the node formatting, click on the "view as book" button on the prompt page. It can be found on the right side below the prompts banner image.
![feed image](url)
If you instead wish to save the story as a PDF to read it offline, share it with others, or keep it for posterity, click on the "generate PDF" button on the top right of the prompt's "book view" page.
Do note this "book view" and the ability to save the story as a PDF can be done whether the story is ongoing on completed.

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
