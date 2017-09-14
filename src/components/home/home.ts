import Vue from 'vue';
import Component from 'vue-class-component';

import './home.scss';
import {SnotifyAction, SnotifyPosition, SnotifyService} from 'vue-snotify';

@Component({
  template: require('./home.html')
})
export class HomeComponent extends Vue {

  package: string = 'vue-webpack-typescript';
  repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript';
  mode: string = process.env.ENV;
  title: string = 'Snotify title!';
  body: string = 'Lorem ipsum dolor sit amet!';
  timeout = 3000;
  progressBar: boolean = true;
  closeClick: boolean = true;
  pauseHover: boolean = true;

  onSuccess () {
    SnotifyService.success(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    });
  }

  onInfo () {

    SnotifyService.info(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    });
  }

  onError () {

    SnotifyService.error(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    });
  }

  onWarning () {

    SnotifyService.warning(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    });
  }

  onSimple () {


    // const icon = `assets/custom-svg.svg`;
    const icon = `https://placehold.it/48x100`;

    SnotifyService.simple(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
      icon: icon
    });
  }

  onAsyncLoading () {
    SnotifyService.async('This will resolve with success', 'Async toast 1',
      // You should pass Promise of type SnotifyConfig to change some data or do some other actions
      () => new Promise((resolve) => {
        setTimeout(() => resolve({
          title: 'Success',
          body: 'Example. Data loaded!',
          config: {
            closeOnClick: true,
            timeout: this.timeout,
            showProgressBar: true,
            pauseOnHover: true
          }
        }), this.timeout);
      })
    );
    SnotifyService.async('This will resolve with error', 'Async toast 2',
      // You should pass Promise of type SnotifyConfig to change some data or do some other actions
      () => new Promise((resolve, reject) => {
        setTimeout(() => reject({
          title: 'Error',
          body: 'Server error example!',
          config: {
            closeOnClick: true,
            timeout: this.timeout,
            showProgressBar: true,
            pauseOnHover: true,
          }
        }), this.timeout);
      })
    );
  }

  onConfirmation () {
    /*
    Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     */
    const id = SnotifyService.confirm(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
      buttons: [
        {text: 'Yes', action: () => console.log('Clicked: Yes'), bold: false},
        {text: 'No', action: () => console.log('Clicked: No')},
        {
          text: 'Later', action: (toastId) => {
          console.log('Removed with animation');
          SnotifyService.$emit('remove', toastId);
        }
        },
        {
          text: 'Remove', action: () => {
          console.log('Removed instantly');
          SnotifyService.remove(id);
        }, bold: true
        },
      ]
    });
  }

  onPrompt () {
    /*
     Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     At the action of the first button we can get what user entered into input field.
     At the second we can't get it. But we can remove this toast
     */
    const id = SnotifyService.prompt(this.body, this.title, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
      buttons: [
        {text: 'Yes', action: (toastId, text) => console.log('Said Yes: ' + text + ' ID: ' + toastId)},
        {
          text: 'No', action: (toastId, text) => {
          console.log('Said No: ' + text);
          SnotifyService.remove(id);
        }
        },
      ],
      placeholder: 'This is the example placeholder which you can pass' // Max-length = 40
    });
  }

  onHtml () {

    SnotifyService.html(`<div class="snotifyToast__title"><b>Html Bold Title</b></div>
            <div class="snotifyToast__body"><i>Html</i> <b>toast</b> <u>content</u></div> `, {
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
    });
  }


  onClear () {
    SnotifyService.clear();
  }

  created () {
    SnotifyService.$on(SnotifyAction.mounted, (toast) => {
      console.log('[CALLBACK]: mounted', toast);
    });
    SnotifyService.$on(SnotifyAction.destroyed, (toast) => {
      console.log('[CALLBACK]: destroyed', toast);
    });
    SnotifyService.$on(SnotifyAction.beforeDestroy, (toast) => {
      console.log('[CALLBACK]: beforeDestroy', toast);
    });
    SnotifyService.$on(SnotifyAction.onInput, (toast, value) => {
      console.log('[CALLBACK]: onInput', toast, value);
    });
    SnotifyService.$on(SnotifyAction.onClick, (toast) => {
      console.log('[CALLBACK]: onClick', toast);
    });
    SnotifyService.$on(SnotifyAction.onHoverEnter, (toast) => {
      console.log('[CALLBACK]: onHoverEnter', toast);
    });
    SnotifyService.$on(SnotifyAction.onHoverLeave, (toast) => {
      console.log('[CALLBACK]: onHoverLeave', toast);
    });
    SnotifyService.$on(SnotifyAction.beforeShow, (toast) => {
      console.log('[CALLBACK]: beforeShow', toast);
    });
    SnotifyService.$on(SnotifyAction.shown, (toast) => {
      console.log('[CALLBACK]: shown', toast);
    });
    SnotifyService.$on(SnotifyAction.beforeHide, (toast) => {
      console.log('[CALLBACK]: beforeHide', toast);
    });
    SnotifyService.$on(SnotifyAction.hidden, (toast) => {
      console.log('[CALLBACK]: hidden', toast);
    });
  }

}
