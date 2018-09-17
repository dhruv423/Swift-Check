# Swift-Check
Created by: Sujeethan Vigneswaran, Aarsh Patel, Dhruv Bhavsar


Hack the North 2018
<br />
The World's First Machine Learning Self Checkout Kiosk!


Libraries Used:
<br />
  p5.js https://p5js.org/
  <br />
  ml5.js https://ml5js.org/
  <br />
  tensorflow.js https://js.tensorflow.org/
  <br />
  angular.js https://angularjs.org/
 
## Inspiration

After spending hours at a lineup for the self checkout at Loblaws and Walmart we decided there has to be a better way. We knew the Machine Learning and Artificial Intelligence is the key to the future of technology so we combined the two and created Swift Check.

## What it does

Swift Check is a web application that will be used at self check out kiosks to quickly assist customers through a camera. It identifies your items and adds it to your bill. No more looking around for barcodes or asking cashiers for help with entering produce numbers.

## How we built it

The first thing we did was buy the domain swift-check.com from domains.com and start hosting our website on Github pages.
We used an Angular.JS framework to build the web application. On top of that we used p5.JS with ml5.JS for the implementation of a pre-trained machine learning model. (ML5.JS is a machine learning library that is extremely light weight and perfect for web applications.) Finally we trained and used Mobile net models from Tensorflow.JS for the bulk of the machine learning aspect of the build.

## Challenges we ran into

As all members of the team are first year students we struggled a lot! First, Angular.JS had a lot of bugs and quirks that had to be sorted out in order for the front end to look as good as it does. There was several issues involving the spacing of HTML elements and the DOM had issues as we wanted to use the live video stream from our webcam. Next, p5.JS and ml5.JS gave us such a headache with the interaction between Angular.JS "cards" and Javascript elements. Even though they should work together nicely we ran into problems where the JS elements would "float" off the Angular.JS framework. Finally, Tensorflow.JS and the whole machine learning experience was the greatest challenge. Being a young team, we had very little combined knowledge on ML, and we didn't know how we should go about adding these features to a web application. We originally had python machine learning models but those can't be run on the web. The work around was to convert them into Javascript models through a long and painful command line puzzle.

## Accomplishments that we're proud of

We are extremely proud of being a young team that took on new programming languages/frameworks and we actually managed to take tensor-flow _ by the horns _ to make something that is really beautiful and functional. Great focus was placed on building an intuitive and easy to navigate user interface and providing an excellent user experience. (UI and UX)

## What we learned

Through the project we learned how to utilize the Angular.JS framework for web applications. Which can then be transferred to projects built in React.JS or Vue.JS. We learned how to use the p5.JS and ml5.JS libraries to make a beautiful user interface as well as how to interact with the DOM. Finally, the biggest take away was understanding and using tensorflow.JS to build machine learning models, _ which seemed like an impossible feat for us at the beginning of Hack the North. _

## What's next for Swift Check

We bought the domain for Swift Check on a two year term. We plan on working on this project in the future to implement a greater emphasis on produce. Currently the model can identify the type of produce that it is shown, in the future we want to be able to also tell the customer additional analytics on their food. For example if a customer was buying a banana, by examining the colour the model should tell the user how many days until the fruit is most ripe.
