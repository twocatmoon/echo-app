<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<h3 align="center">Echo - A Full-Stack Web Application Template</h3>

  <p align="center">
    Echo is a Dockerized full-stack TypeScript web application template, built on Strapi, Next.js, PostgreSQL, and nginx. More than just a Docker Compose file, Echo comes pre-configured with useful libraries, CORS configuration, authentication, media uploads, and boilerplate to get you started quickly.
    <br />
    <br />
    <a href="https://github.com/twocatmoon/echo-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/twocatmoon/echo-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#features">Features</a>
        <ul>
            <li><a href="#backend">Backend</a></li>
            <li><a href="#frontend">Frontend</a></li>
            <li><a href="#database">Database</a></li>
            <li><a href="#reverse-proxy">Reverse Proxy</a></li>
            <li><a href="#containerization">Containerization</a></li>
            <li><a href="#environment-variables">Environment Variables</a></li>
        </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- FEATURES -->
## Features

### Backend
- Strapi v4.22
- Node.js v20.12
- Typescript v5
- Additional Middlewares
    - CORS
    - Media Uploads

### Frontend
- Next.js v14.1
- Node.js alpine
- Sass v1.74
- Typescript v5
- Pre-installed libraries
    - Axios
    - Bulma
    - CLSX
    - Date-fns
    - QS
    - React
- Boilerplate
    - Authentication hooks and methods
    - Context-based store and eventbus utilities
    - Strapi REST API and Media Upload helper classes
    - Template control flow utilities

### Database
- PostgreSQL v16 alpine
- Apple silicon support
- Named volumes

### Reverse Proxy
- nginx latest
- FastCGI
- Extensive mime-type support
- Security configuration

### Environment Variables
- Single file for entire stack



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

To run this project you'll need the following software installed:
- [git v2.39+](https://git-scm.com/downloads)
- [Node.js v20.12](https://nodejs.org/en/download)
- [Docker v4.28+](https://www.docker.com/get-started)

### Installation

1. Create a copy of this project by using the "Use this template" feature on GitHub, or by forking this repository
2. Clone your copy of the repo `git clone https://github.com/<your-username>/<your-app>.git`
3. Copy `.env.example` to `.env` and fill out all the fields
4. Pull the latest Docker images with `npm run pull`
5. Run the project with `npm run up`

The frontend will now be available at http://localhost and the Strapi backend at http://localhost/backend/admin. Make sure port 80 is available for nginx to use.

To run the application in production mode, change `ENVIRONMENT=development` to `ENVIRONMENT=production`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

hello@twocatmoon.com

Project Link: [https://github.com/twocatmoon/echo-app](https://github.com/twocatmoon/echo-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/twocatmoon/echo-app.svg?style=for-the-badge
[contributors-url]: https://github.com/twocatmoon/echo-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/twocatmoon/echo-app.svg?style=for-the-badge
[forks-url]: https://github.com/twocatmoon/echo-app/network/members
[stars-shield]: https://img.shields.io/github/stars/twocatmoon/echo-app.svg?style=for-the-badge
[stars-url]: https://github.com/twocatmoon/echo-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/twocatmoon/echo-app.svg?style=for-the-badge
[issues-url]: https://github.com/twocatmoon/echo-app/issues
[license-shield]: https://img.shields.io/github/license/twocatmoon/echo-app.svg?style=for-the-badge
[license-url]: https://github.com/twocatmoon/echo-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
