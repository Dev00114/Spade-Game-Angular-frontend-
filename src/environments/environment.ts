// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: true,
  api_url: "https://conduit.productionready.io/api",
  firebase: {
    apiKey: "AIzaSyC4QD7yeg-PhcIAmadOFeWRAv0XMRFWLdQ",
    authDomain: "spades-in-place.firebaseapp.com",
    databaseURL: "https://spades-in-place.firebaseio.com",
    projectId: "spades-in-place",
    storageBucket: "spades-in-place.appspot.com",
    messagingSenderId: "282747446977",
    appId: "1:282747446977:web:791c78426e9d62886dd640",
    measurementId: "G-65KZSH1X7P",
  },
};
