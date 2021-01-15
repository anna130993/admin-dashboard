import {classNames, select, settings} from './settings.js';

const app = {
  init: function() {
    this.getElements();
    this.initActions();
    this.initPages();
    this.initChart();
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

  initChart: function(){
    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
          datasets: [{
              label: "Signups",
              backgroundColor: '#8DBEC8',
              borderColor: '#8DBEC8',
              data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
          },
          {
              label: "FTD",
              backgroundColor: '#F29E4E',
              borderColor: '#F29E4E',
              data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
          },
          {
              label: "Earned",
              backgroundColor: '#71B374',
              borderColor: '#71B374',
              data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
              hidden: true,
          }]
      },
  });
  }

}
app.init();