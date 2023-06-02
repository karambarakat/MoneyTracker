frontend: very important / bugs -----------------------------------------------

- [x] Chart page

- [x] export page
- [x] setting page + rate us + about

- [ ] offline users

- [ ] deploy the app

- [x] unify backend and frontend data types and TypeScript

- [x] **BACKEND** bug: `these fields are required: ` no fields are showing

frontend: rest -----------------------------------------------------------------

- [ ] loading pages is not smooth

- [ ] frontend bug: sing in > go offline > go online (you will see notification with sign out option) > go to `/export` > sign out from that notification

this may need to refactor the whole react-router setup

- [ ] when created doc optional fields are null, but on getting doc optional fields don't exist

- [x] empty logs and empty categories

- [ ] **BACKEND**: refactor testing in backend

- [ ] **BACKEND**: document the backend

- [ ] refactor `store.dispatch('META_XXX')`

- [x] refactor redux api and actions

- [ ] sync with banks

frontend: unnecessary but very cool --------------------------------------------

- [ ] figure out a way to display pages like export or addLog without a modal

- [ ] on the home page add component to create logs without opening a whole new modal

- [x] commands + stack notification + undo commands

- [ ] animation on deleting entries

frontend: unnecessary ----------------------------------------------------------

- [ ] progressive app

- [ ] move to react native??

devops:

- [ ] resume work on the devops of the backend

backend:

- [ ] optional fields are null (put requests) sometime and sometime are undefined
- [x] unit tests

deploy-script:

- [x] push the code in `terraform` directory to the API-driven workflow
- [ ] trigger topical plan/apply run on that workflow
