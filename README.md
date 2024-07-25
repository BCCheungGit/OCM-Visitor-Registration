# OCM Visitors Application

## Description
This is a web application that allows visitors to check in to the OCM church building without having to fill out a paper form. The application is designed to be used on a tablet or computer at the entrance of the building. The application can be run on mobile devices for viewing ID cards or
the admin dashboard.

## Final Product Plan
- Active Users: about 5000 per year
- Active Devices: 1-2 Laptops/Tablets
- Active Sessions: 1-2 per device
- Data Storage: 3-4 GB per year
- Data Transfer: 3-4 GB per year
- Data Retention: 1 Month (Temporary)


## Running the program
- Clone the repository to a local machine
- Install dependencies
```
npm install
```
- Run the program in development mode with 
```
npm run dev
```

- To view the db, run
```
npm run db:studio
```

## TODO:
In no particular order, the things that need to be implemented before use:

### Basic Implementation
- [x] Add authentication with Clerk (Email and Phone Number support)
- [x] Add camera support to take a picture of the visitor
- [x] Connect to OCM database to store visitor information (PostgreSQL), Drizzle ORM
- [x] Get visitor information from the database
- [x] Generate a temporary ID Card for users
- [x] Update the styling for the application
    - [x] Make the avatar on the ID rounder
    - [x] Move the name down
    - [x] Add the date of the visit under the name
    - [x] Make it dynamic for mobile users- view ID card.
- [x] Add a feature to print a visitor badge 

### Admin Dashboard
- [x] Add a dashboard to view all visitors and visitor information
    - [x] View images of the visitors
        - [x] Add a modal to view the image in full screen when clicked
    - [x] Protected routes for the dashboard https://clerk.com/docs/guides/basic-rbac#set-the-admin-role-for-your-user
    - [x] Search for visitors by first name
    - [x] Delete button for admins


### Extra features
- [x] Set up Deletion scripts to delete all records older than 7 days from db
    - Deletion scripts are now running in a separate Node.js repository [here](https://github.com/BCCheungGit/OCM-Visitor-Scripts)
- [ ] Add QR code to the id card (use user_id)

- [ ] Visual UI/UX improvements
- [ ] Chinese Support for the rest of the application


### Bug Fixes:
- [ ] Fix the issue with the camera being blocked on certain mobile browsers
- [x] Fix the issue with images getting stretched on mobile admin dashboard

### Deploy !
- [ ] Deploy the application 