# MoneyTracker

# live version

View it on [Heroku](https://react-app-money.herokuapp.com/) or view screenshots on [freelancer.com](https://www.freelancer.com/u/KennethBarakat)

# Features

this app is a easy-to-use wallet list that helps you keep track all your expenses, view charts and make budgets. App features are:

- every entry have title, money amount, category and description.
- List of expenses entries (Home page)
- categories page (with graphical icon to identify different categories)
- Chart (statics) summary of all expenses and their category
- Authentication
- Forms to add category, entries and register users
- Export all input as excel or CSV
- Setting, rate us and about pages

this app is Front end application built using ReactJS library, it consists of a total of 2555 line of JavaScript code and the final production folder is only 2MB in size, and was built using:

## User-Experience features

- for every component of page, whenever there is AJAX loading in the background, a loading page will be shown and sequently either error page or the actual data

      <HttpHandler
        action={fetchData()}
        selector={(state) => state.logs)}
      >
        {(data) => ({
            <h2> there is you data {data}</h2>
        })
      </HttpHandler>

- some pages are accessible as a modal (called gallery modal) as oppose of opening a new page

        <Link to="/entry/2" modal>go to </Link>

# Technologies

## Front End:

- ReactJS
- AJAX fetch
- Formik
- Material-Ui
- React-Router-Dom
- Redux and Thunk middleware

## Back End:

In the backend I used simple Server-json mocking backend, so it is not so sophisticated as far as the backend goes, the following was used to deploy to heroku and costomize the server-json:

- Node and ExpressJS
- Authentication with JWT
- nodemon (as dev dep)

## Database

This project built with mySQL at first but later I thought that MongoDB is more suitable

- MongoDB
- Mongo Atlas (cloud database)
- Mongoose

## How To Start

you can run for production:

    npm run build
    npm run start

for dev only

    npm run dev

or

    npm run dev_front
    npm run dev_back
