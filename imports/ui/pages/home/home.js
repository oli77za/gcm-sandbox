import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

import { Registrations } from "/imports/model/registrations.js";

import main_layout from "/imports/ui/layouts/main_layout/main_layout.js";
import sender from "/imports/ui/components/sender/sender.js";
import registration from "/imports/ui/components/registration/registration.js";
import error from "/imports/ui/components/error/error.js";
import message from "/imports/ui/components/message/message.js";

import "./home.html";
import "./home.scss";

FlowRouter.route("/", {
  action() {
    BlazeLayout.render('main_layout', {
      content: "home",
      data : {
        'senderId': Meteor.settings.public.gcm ? Meteor.settings.public.gcm.senderId : null
      }
    });
  }
});


Template.home.onCreated(function() {
  this.subscribe('registrations');
  this.messages = new ReactiveVar([]);
  this.registration = new ReactiveVar();
  this.error = new ReactiveVar();
  this.jsonMessage = {};

  this.onDataChanged = (data) => {
    console.log(data);
    this.jsonMessage = data;
  };
});

Template.home.onRendered(function() {
});

Template.home.helpers({
  isCordova() { return Meteor.isCordova },
  messages() { return Template.instance().messages.get(); },
  registrationId() {
    let registration = Template.instance().registration.get();
    return registration && registration.registrationId
  },
  registrations() { return Registrations.find(); },
  error() { return Template.instance().error.get(); },
  senderChangedJson() { return Template.instance().onDataChanged; }
});

Template.home.events({
  'click .registration .btn'(event, template) {
    event.preventDefault();
    template.error.set(null);
    let push = PushNotification.init(
      {
        android: {
          senderID : template.data.senderId
        }
      }
    );
    push.on('registration', (data) => {
      Meteor.call('registrations.add', data);
      template.registration.set(data);
    });
    push.on('error', (e) => {
      template.error.set(e);
    });
    push.on('notification', (data) => {
      let msgs = template.messages.get();
      msgs.push(data);
      template.messages.set(msgs);
    });
  },
  'click .sender button'(event, template) {
    event.preventDefault();
    let registrationId = template.find('.sender input[name="registration"]').value;
    Meteor.call('sendMessage',
      registrationId,
      template.jsonMessage,
      (error, data) => { console.log(error, data) }
    );
  },
  'click .send_link'(event, template) {
    event.preventDefault();
    template.find(".sender #registration").value = event.target.hash.split('=')[1];
  },
  'click .message a'(event, template) {
    event.preventDefault();
    let messages = template.messages.get();
    let index = event.currentTarget.hash.split('=')[1];
    messages.splice(index,1);
    template.messages.set(messages);
  },
  'click .copy_link'(event, template) {
    event.preventDefault();
    let registrationId = event.target.hash.split('=')[1];
    let input = document.createElement('input');
    input.value = registrationId;
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
});

