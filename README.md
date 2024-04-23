# KOR ASSESSMENT - Frontend App
## 1. Stack used
- React.js
- Redux
- SAGA
- Axios
- Material UI
- React Router Dom

## 2. Running the server
To set up the server, do the following:
1. Make sure the backend project is running on a separate terminal (follow the instructions here: https://github.com/pedro-cal/kor-app-server)
1. On your terminal, run `yarn` to install dependencies
2. On your terminal, run `yarn dev` to run the server

## 3. Potential issues and pending features
1. I tested almost everything with usernames. Emails might cause issues
2. There is a lot of code styling, architecture and modularization I had to do too quickly and would certainly do differently If I had more time.
3. I’m sure there are many bugs everywhere. Again, I would fix them with more time.
4. I decided to create a new Id with uuid for each resource, but I might change that with more thought into the architecture.
5. I didn’t have time to fully account for responsiveness for mobile. A lot of things in progress still.
6. I would certainly add much more UX feedback to the user feedback like toast messages and better loading handling.
7. I would never group some of the things I grouped under the same commits.
8. Many coding patterns aren’t standard across the project. With time, I would that differently.
9. I didn't implement real-time notifications with web sockets. Didn't have time and wanted to focus more on FE features.
10. Security wasn't accounted for anywhere.