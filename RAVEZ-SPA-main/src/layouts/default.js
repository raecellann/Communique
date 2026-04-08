export let appsState = {
  cachedHomeThreads: null,
  offset: 0,
  loggedInUserProfile: null,
  visitedProfiles: null
};

export default function Layout(root) {
  root.innerHTML = `
      <div id="container">

        <div id="dim-overlay" class="hidden"></div>
        <div class="create-post-popper hidden"></div>
        <div class="create-post-notifier hidden"></div>
        
        <navigation id="navigation"></navigation>
        <main id="main"></main>
        <footer id="footer"></footer>
      </div>
    `

  return {
    navigation: document.getElementById('navigation'),
    main: document.getElementById('main'),
    footer: document.getElementById('footer'),
  }
}
