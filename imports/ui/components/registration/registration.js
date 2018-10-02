import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./registration.html";
import "./registration.scss";

Template.registration.onCreated(function() {
});

Template.registration.onRendered(function() {
});

Template.registration.helpers({
  senderId() { return Meteor.settings.public.gcm && Meteor.settings.public.gcm.senderId; }
});

Template.registration.events({
});

