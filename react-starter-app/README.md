# ThoughtSpot Everywhere React Starter App
This app is an example react-based app for embedding ThoughtSpot elemnts using the Visual Embed SDK. It is designed to work with the Sample Retail Apparel dataset included with the ThoughtSpot Free Trial account.

It contains example code for:
- basic authentication
- hamburger menu style navigation
- embedding a search component
- embedding a liveboard component
- embedding the full ThoughtSpot app

## How to use

### Sign up for Free Trial account
You will need a ThoughtSpot Free Trial account [here](https://www.thoughtspot.com/trial). 

### Clone Github Repo
Clone the ThoughtSpot Quickstarts repo.

`git clone https://github.com/thoughtspot/quickstarts.git`

Change directories to `quickstarts/react-starter-app`


### Install dependencies

 `npm add react-router-dom@6`

 `npm add react-hamburger-menu`

 `npm add @thoughtspot/visual-embed-sdk`

 ### Configure the app
Each embedded component requires a unique identify to tell the Visual Embed SDK which ThoughtSpot component to render. The best way to retrieve the specific id is via the Developer Playground. Depending on which component you are using (Search, Liveboard), the id may be called something slightly different. Refer to the code samples in this project to see the specific names, then, within the Playground, retrieve the required value. For example, when using a Search component, the Visual Embed SDK requires a dataSource id, which can be retrieved by changing the data source [here](https://try-everywhere.thoughtspot.cloud/v2/#/everywhere/playground/search)

 ### Run the app
 `npm start`

Once the app is running, you can navigate to http://localhost:8000 to check it out. Try navigating to one of the subpages via the hamburger menu. The first time you access a page with an embedded component you will be prompted to log into your Free Trial account. 