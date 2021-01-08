import {classNames, select, settings} from './settings.js';

const app = {
  init: function() {
    this.getElements();
    this.initActions();
    this.initPages();
  },

  getElements: function() {
    this.dom = {};
    this.dom.menuToggle = document.querySelector(select.header.menuToggleBtn);
    this.dom.sidebar = document.querySelector(select.sidebar.sidebar);
    this.pages = document.querySelectorAll(select.main.pages);
    this.navLinks = document.querySelectorAll(select.sidebar.navLinks);
  },

  initActions: function() {
    this.dom.menuToggle.addEventListener('click', () => {
      this.dom.sidebar.classList.toggle(classNames.sidebar.sidebarExpanded);
    });
  },

  initPages: function() {
    const thisApp = this;
    const idFromHash = window.location.hash.replace('#/', '');
    let linkMatchingHash = this.navLinks[0].getAttribute('href').replace('#', '');
    for (let link of this.navLinks){
      const linkId = link.getAttribute('href').replace('#', '');
      if (linkId == idFromHash){
        linkMatchingHash = linkId;
        break;
      }
    }

    thisApp.activatePage(linkMatchingHash);

    for(let link of this.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const chosenPages = settings.pagesMap[pageId] || [];

    for (let page of this.pages){
      page.classList.toggle(classNames.pages.active, chosenPages.includes(page.id));
    }

    for(let link of this.navLinks){
      link.classList.toggle(classNames.sidebar.navLinkActive, link.getAttribute('href')=='#' + pageId);
    }
  },
};

app.init();