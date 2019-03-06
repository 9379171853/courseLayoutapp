import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import './shared-styles.js';

class MyRegistration extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">        
        <h1>Register</h1>
        <iron-form>
        <form>
        <paper-input always-float-label label="Name" name='name' value="{{name}}"></paper-input>
        <paper-input always-float-label label="Sap Id"></paper-input>
        <paper-input always-float-label label="emailId" name="emailId"></paper-input>
        <paper-input always-float-label label="Primary Skill"></paper-input>
        <paper-input always-float-label label="Band"></paper-input>
        <paper-input type="password" always-float-label label="Password"></paper-input>
        <paper-button raised class="indigo">Register</paper-button>
        <form>
        <iron-form>
      </div>
    `;
  }
}

window.customElements.define('my-registration', MyRegistration);
