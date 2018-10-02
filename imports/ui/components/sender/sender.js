import { Template } from "meteor/templating";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/monokai";

import "./sender.html";
import "./sender.scss";

Template.sender.onCreated(function() {
});

Template.sender.onRendered(function() {
  this.aceEditor = ace.edit(this.find('.json_editor'));
  this.aceEditor.setTheme("ace/theme/monokai");
  this.aceEditor.getSession().setMode("ace/mode/" + "json");
  this.aceEditor.getSession().on('change', () => {
    try {
      let data = JSON.parse(this.aceEditor.getValue());
      this.data.onDataChange(data);
    } catch (e) {
    }
  });
});

Template.sender.helpers({
});

Template.sender.events({
});

