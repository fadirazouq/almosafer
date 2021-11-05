# almosafer-test
Is a stand-alone repo for running integration tests using cypress test runner.
# Why cypress 
Cypress is an open source, next generation front end testing tool built for the modern web, here are some points on why cypress is my go-to
1. Cypress does not use Selenium.
Most end-to-end testing tools are Selenium-based, which is why they all share the same problems. To make Cypress different, we built a new architecture from the ground up. Whereas Selenium executes remote commands through the network, Cypress runs in the same run-loop as your application.

2. Cypress tests are only written in JavaScript.
While you can compile down to JavaScript from any other language, ultimately the test code is executed inside the browser itself. There are no language or driver bindings - there is and will only ever be just JavaScript.

3. Cypress is all in one.
Writing end-to-end tests takes a lot of different tools to work together. With Cypress you get . There is no need to install 10 separate tools and libraries to get your test suite set up. We have taken some of the best-in-class tools you are likely already familiar with and made them all work together seamlessly.

4. Cypress is for developers and QA engineers.
One of our goals was to make test-driven development a reality for end-to-end testing. Cypress is at its best when you use it as you build your application. We give you the power to code as fast as possible.

5. Cypress runs much, much faster.
These architectural improvements unlock the ability to do TDD with full end-to-end tests for the very first time. Cypress has been built so that testing and development can happen simultaneously. You can develop faster while driving the entire dev process with tests because: you can see your application; you still have access to the developer tools; and changes are reflected in real time. The end result is that you will have developed more, your code will be better, and it will be completely tested. If you opt for our , parallelization and automated load balancing will further supercharge your test speeds.

**For more info about cypress please refer to https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell**

# Installing

A step by step series of examples that tell you how to run tests with a gui.

- Run the following commands:

```bash
> git clone git@github.com:fadirazouq/almosafer.git
> cd almosafer
/almosafer > npm install
/almosafer > npm run cypress:gui
```

- To run the test in headless mode please using the following:


```bash
> git clone git@github.com:fadirazouq/almosafer.git
> cd almosafer
/almosafer > npm install
/almosafer > npm run cypress:test-headless
```

#####  Not good enough? having issues running the test locally? no worries:shipit: i got you covered 

* use the following commands to run the test inside a docker container(must have docker installed):

```bash
> git clone git@github.com:fadirazouq/almosafer.git
> cd almosafer
/almosafer > docker run -it -v $PWD:/e2e -w /e2e  cypress/included:4.1.0
```
