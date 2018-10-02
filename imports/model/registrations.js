import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Registrations = new Mongo.Collection("registrations");

if (Meteor.isServer) {
}
