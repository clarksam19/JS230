let views = {
  home: 
    `<div class="column"> 
      <article>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </article>

      <article>
        <h2>Our Founder</h2>
        <h3>Admiral Kerning</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </article>
    </div>`,
  team:
    `<div id="team" class="column">
      <article>
        <h2>Team</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniadolor</p>
        <ul>
          <li>
            <a href="#">
              <img src="images/img_kevin.jpg" alt="Kevin Wang" />
              Kevin
            </a>
          </li>
          <li>
            <a href="#">
              <img src="images/img_louis.jpg" alt="Louis Burton" />
              Louis
            </a>
          </li>
          <li>
            <a href="#">
              <img src="images/img_kasper.jpg" alt="Kasper Salto" />
              Kasper
            </a>
          </li>
          <li>
            <a href="#">
              <img src="images/img_chris.jpg" alt="Chris Lee" />
              Chris
            </a>
          </li>
        </ul>
      </article>
    </div>`,
  projects:
    `<div id="projects" class="column">
      <h2>Projects</h2>
      <article>
        <figure>
          <img src="images/img_project_app.jpg" alt="Get this app" />
        </figure>
        <h3>Project name</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </article>

      <article>
        <figure>
          <img src="images/img_project_moment.jpg" alt="Moment Magazine" />
        </figure>
        <h3>Project name</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </article>

      <article>
        <figure>
          <img src="images/img_project_map.jpg" alt="Have a good trip" />
        </figure>
        <h3>Project name</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </article>
    </div>`
}

let modal = `
  <article id="modal">
  <div id="close_modal">
    <img src="images/icon_close.png" alt="close">
  </div>
  </article>`

let teamMemberInfo = {
  kevin: "Kevin: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  louis: "Louis: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  kasper: "Kasper: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  chris: "Chris: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
}
document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main')
  main.innerHTML = views.home;
  let navList = document.querySelectorAll('nav ul a');
  
  navList.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      function removeClassFromAll() {
        let currentItem = e.target;
        let className = 'active';
        navList.forEach(item => {
          item.classList.remove(className);
        })
      }
      switch (e.target.textContent) {
        case 'Home':
          main.innerHTML = views.home;
          if (!e.target.classList.active) {
            removeClassFromAll();
            e.target.classList.add('active');
          }
          break;
        case 'Projects':
          main.innerHTML = views.projects;
          if (!e.target.classList.active) {
            removeClassFromAll();
            e.target.classList.add('active');
          }
          break;
        case 'Team':
          main.innerHTML = views.team;
          if (!e.target.classList.active) {
            removeClassFromAll();
            e.target.classList.add('active');  
          }
          let links = main.querySelectorAll('a');
          links.forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              let image = e.currentTarget.firstElementChild;
              let data = {
                name: image.getAttribute('alt'),
                info: teamMemberInfo[e.currentTarget.textContent.trim().toLowerCase()],
                picture: image.getAttribute('src'),
              }
              let templateSource = document.getElementById('modal_template');
              let template = Handlebars.compile(templateSource.innerHTML);
              main.insertAdjacentHTML('afterbegin', template(data));
              let closeButton = main.getElementsByClassName('close_modal')[0];
                closeButton.addEventListener('click', (e) => {
                console.log(e.type);
                document.getElementById('modal').style.display = "none";
              })
            })
          })
          
          break;
        default:
          return;
      }
    })
  })

  
})