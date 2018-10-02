import { Meteor } from "meteor/meteor";
import { Registrations } from "/imports/model/registrations.js";
import { HTTP } from "meteor/http";

Meteor.publish('registrations', function () {
  return Registrations.find();
});

Meteor.methods({
  'registrations.add'(registration) {
    Registrations.update({
      "registrationId": { $eq: registration.registrationId }
    },
      registration,
      {
        upsert: true
      }
    );
  },
  'sendMessage'(registrationId, data) {
    try {
      return HTTP.post('https://gcm-http.googleapis.com/gcm/send',
        {
          headers: {
            'Authorization': "key=" + Meteor.settings.gcm.key,
          },
          data: {
            to: registrationId,
            data: data
          }
        });
    } catch (e) {
      console.log("Failed to send notification", e);
      return false;
    }
  }
});

