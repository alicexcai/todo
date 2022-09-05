import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';
import '../imports/startup/accounts-config.js';

// COMMENT: this instantiates a new app in the html app element
Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});