# GCM Sandbox

A simple proof-of-concept project to test GCM messaging (soon to be deprecated)

## Contributing

We love your feedback and contribution. Use the issue tracker to submit bugs, and please fork the project and submit pull requests

## Running the projects

This project is tested on an Android phone.

The GCM project ID and the authentication keys are of course not included in this repository. Simply copy the files `mobile-config.js.example and `settings.json.example` into `mobile-config.js` and `settings.json` and update them with the correct sender ID and authentication token.

```
meteor npm install
meteor run -s settings.json android-device
```


The server component of the project is then available on http://localhost:3000


