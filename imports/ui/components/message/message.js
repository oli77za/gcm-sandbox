import { Template } from "meteor/templating";

import "./message.html";
import "./message.scss";

Template.message.onCreated(function() {
});

Template.message.onRendered(function() {
});

Template.message.helpers({
  messageJson() { return JSON.stringify(Template.currentData().message, null, 2) }
});

Template.message.events({
});

