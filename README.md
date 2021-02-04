# Tadu (DEPRECATED)

Tadu was sunset on November 10th, 2020 due to my lack of time to support Meteor's aging environment.

Currently it runs on a free-tier at [https://tadu.meteorapp.com/](https://tadu.meteorapp.com/).

(See screenshots in `public/screenshots`)

## Be More Productive With Sensible Intelligence

### Current Build Version : 0.5

#### Technologies & Tools:

1. React
2. Meteor
3. MongoDB
4. Electron
5. React Native
6. XCode & iOS Simulator
7. Heroku
8. AnimateCSS (https://daneden.github.io/animate.css/)
9. Material Design Icons (https://materialdesignicons.com/)
10. SweetAlert (https://www.npmjs.com/package/sweetalert)
11. React-Tooltip (https://github.com/wwayne/react-tooltip)
12. Meteor Electron (https://github.com/electron-webapps/meteor-electron)

#### Version Roadmap

- 0.0.0.0.5 Replace "Event" with "Task"
- 0.1 Basic Schedule Function
  - Basic CRUD functions by tags
- 0.2 Schedule Functions Update 1
  - Add customization to tags
- 0.3 Schedule Functions Update 2
  - Ability to create new tags
  - Suggest/Enforce use of exisiting tags
- 0.5 Sensibility Integration
  - Integrate SI Learning to Optimize Task Scheduling
  - Prioritize Soonest, Most Efficient Time-Slot
- 1.0 Heroku Deployed Meteor Server and Web App
- 1.2 iOS App deployed using Meteor backend
- 1.2.5 Android deployed using Meteor backend
- 1.3 Electron App for Windows, MacOS, Linux
- 1.4 Migration of Server
  - VPS or Dedicated Heroku Server
- 1.5 Full Release
- 1.6 Sensibility Update
  - Create Repeated Tasks Automatically
- 1.7 Sensibility Update
  - Optimizer considers context of prospective task before and after time slot
- 1.7.1 Sensibility Update
  - Habits (Superlatives)
- 2.0 Share & Assign Tasks
  - Task Chat (see Meteor Pigeon)
- 2.1 Location Aware
  - May access location to learn daily behavior
    - This will later be used to optimize schedule consider time/distance efficiency
  - Routing to Task-Completers
    - Grades Task-Completers on frequency of ability to complete a user's task
- 2.2 Tadu chatbot
- 2.3 Sub Tasks
- 2.4 Metrics
- 3.0 Enterprise Productivity Platform
- 3.5 Voice to Task
- 4.0 Embedded Tadu List
- 5.0 Tadu Concierge

#### What Needs Done

- Loop 1
  - Parser
    - Slack like command-line create task Interface
    - Error Handling
  - SMS
    - Logic for new users and registered users
    - Listen for POST on /web/ and send to parser
    - Need way to get user's local time for accurate moment parsing
    - Send SMS from parser and integrate into reminders cron
  - Browser
    - Modify registration to use phone and then validate with SMS
- Loop 2 :

  - Parser built into AddTask pane to toggle

- Improvements
  ------------ For Next Version
- Refactor convert AddTask 1 & 2 to stateless and move refs to state in AddTask.jsx
- Recurring Tasks
- Add schedule and tagtypes index to user profile
- Speed up addTag method (currently ~170ms from client)
- Make animations faster
  - Things to be async
    - changeThreshold (Mainlayout.jsx)
    - updateSchedule (Schedule.jsx)
    - Some Update Task calls
- Better Icons
- diff colors for different types of task single
