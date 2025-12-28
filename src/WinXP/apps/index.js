import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import iePaper from 'assets/windowsIcons/ie-paper.png';
import angularjs from 'assets/windowsIcons/angularjs.png';
import mine from 'assets/minesweeper/mine-icon.png';
import error from 'assets/windowsIcons/897(16x16).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepad from 'assets/windowsIcons/327(16x16).png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winamp from 'assets/windowsIcons/winamp.png';
import paint from 'assets/windowsIcons/680(16x16).png';
import pictureJpg from 'assets/windowsIcons/Picture_JPG.ico';

const aboutText = `
Software engineer with 6+ years of experience building mobile apps, websites, and backend services
Strong in clean architecture, debugging, and delivering production features in both solo and team environments
In my free time I explore robotics, gadget prototyping, and music, blending creativity with engineering

Programming languages: Kotlin/Java, TypeScript/JavaScript, Dart, C/C++, PHP
Platforms: Android SDK/NDK, Flutter, Kotlin Multiplatform, Node.js
Frameworks/Libraries: Android Jetpack, Dagger/Hilt, Room, Retrofit/Ktor, Angular
Tools: Linux/macOS/Windows, IntelliJ IDEA, Git
`.trim();

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();
export const defaultAppState = [
  {
    component: Notepad,
    header: {
      title: 'About me',
      icon: notepad,
    },
    defaultSize: {
      width: 900,
      height: 500,
    },
    defaultOffset: {
      x: 150,
      y: 110,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
    injectProps: {
      initText: aboutText,
    },
  },
];

export const defaultIconState = [
  {
    id: 0,
    icon: computerLarge,
    title: 'My Computer',
    component: MyComputer,
    isFocus: false,
  },
  {
    id: 1,
    icon: winamp,
    title: 'Winamp',
    component: Winamp,
    isFocus: false,
  },
  {
    id: 2,
    icon: notepadLarge,
    title: 'About me',
    component: Notepad,
    isFocus: false,
  },
  {
    id: 3,
    icon: notepadLarge,
    title: 'Work experience',
    component: Notepad,
    isFocus: false,
  },
  {
    id: 4,
    icon: pictureJpg,
    title: 'Education',
    component: Paint,
    isFocus: false,
  },
  {
    id: 5,
    icon: angularjs,
    title: 'AngularEpubViewer',
    component: InternetExplorer,
    isFocus: false,
  },
];

export const appSettings = {
  'Internet Explorer': {
    header: {
      icon: iePaper,
      title: 'Internet Explorer',
    },
    component: InternetExplorer,
    defaultSize: {
      width: 800,
      height: 600,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  AngularEpubViewer: {
    header: {
      icon: iePaper,
      title: 'AngularEpubViewer',
    },
    component: InternetExplorer,
    defaultSize: {
      width: 800,
      height: 600,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
    injectProps: {
      initialUrl: 'https://vladkalyuzhnyu.com/projects/AngularEpubViewer',
    },
  },
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 500,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Untitled',
    },
    component: Notepad,
    defaultSize: {
      width: 660,
      height: 500,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  'About me': {
    header: {
      icon: notepad,
      title: 'About me',
    },
    component: Notepad,
    defaultSize: {
      width: 900,
      height: 500,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
    injectProps: {
      initText: aboutText,
    },
  },
  'Work Experience': {
    header: {
      icon: notepad,
      title: 'Work experience',
    },
    component: Notepad,
    defaultSize: {
      width: 900,
      height: 500,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
    injectProps: {
      initText: `
• M4Bank — Senior Android Developer | Almaty
  Mar 2025 – Nowadays

  Developing an Android payments SDK for POS terminals (Aisino, ND3/ND5) used by banks for acquiring

• PingOcean — Middle Android Developer | Almaty
  Jun 2023 – Feb 2025

  Developed an anti-fraud mobile app to block spam calls and messages across mobile networks and messengers

• Self-employed — Freelancer | Remote
  Feb 2020 – May 2023

  Developed end-to-end software projects (android, web, backend) with 70+ positive client reviews

• Grupo MContigo S.L. — Junior Android Developer | Spain
  Aug 2019 – Jan 2020

  Developed a kids Android app with WebView-based mini-games (puzzles, quizzes, etc.)
`.trim(),
    },
  },
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Education: {
    header: {
      icon: paint,
      title: 'Education',
    },
    component: Paint,
    defaultSize: {
      width: 700,
      height: 700,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
    injectProps: {
      url:
        'https://raw.githubusercontent.com/vladkalyuzhny/vladkalyuzhny.github.io/site/art/education.jpg',
    },
  },
};

export { InternetExplorer, Minesweeper, ErrorBox, MyComputer, Notepad, Winamp };
