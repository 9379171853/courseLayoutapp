import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js'
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js'
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';


// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class CourseApp extends PolymerElement {
  
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name"
           class="drawer-list" role="navigation">
            <a name="mylogin" href="[[rootPath]]mylogin">Login</a>
            <a name="myregistration" href="[[rootPath]]myregistration">Registration</a>
            <a name="courselist" href="[[rootPath]]courselist">Course</a>
            <a name="newcourse" href="[[rootPath]]newcourse">New Course</a>
            <a name="enrolecourse" href="[[rootPath]]enrolecourse">Enroll</a>
            <a name="myenrollment" href="[[rootPath]]myenrollment">My Enrollment</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Course</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-login name="mylogin"></my-login>
            <my-registration name="myregistration"></my-registration>
            <course-list name="courselist"></course-list>
            <new-course name="newcourse"></new-course>
            <enrole-course name="enrolecourse"></enrole-course>
            <my-enrollment name="myenrollment"></my-enrollment>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {    
   if (!page) {
     this.page = 'courselist';
   } else if (['courselist', 'mylogin', 'myregistration','newcourse','enrolecourse','myenrollment'].indexOf(page) !== -1) {
     this.page = page;
   } else {
     this.page = 'view404';
   }

   if (!this.$.drawer.persistent) {
     this.$.drawer.close();
   }
 }

 _pageChanged(page) {
  // Import the page component on demand.
  //
  // Note: `polymer build` doesn't like string concatenation in the import
  // statement, so break it up.
  switch (page) {
    case 'courselist':
      import('./course-list.js');
      break;
    case 'mylogin':
      import('./my-login.js');
      break;
    case 'myregistration':
      import('./my-registration.js');
      break;
    case 'newcourse':
      import('./new-course.js');
      break;
    case 'myenrollment':
      import('./my-enrollment.js');
      break;
    case 'enrolecourse':
      import('./enrole-course.js');
      break;
    case 'view404':
      import('./my-view404.js');
      break;
  }
}
}

window.customElements.define('course-app', CourseApp);
