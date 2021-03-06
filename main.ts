import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
import * as url from "url";
import { DatabaseBootstrap } from "./src/ipcDatabase/DatabaseBootstrap";
import { WinstonLogger } from "./src/logger/WinstonLogger";
import * as figlet from "figlet";

const logger = WinstonLogger.getInstance();

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => {
    figlet("CasinoHelper", (err, data) => {
      if (err) {
        logger.error("Could not show figlet.", err);
      } else {
        logger.info(`\n${data}`);
      }
      // Initialize Main Thread Database
      const databaseBootstrap = new DatabaseBootstrap();
      databaseBootstrap.initialize().then(() => {
        createWindow();
      });
    });
  });

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    logger.debug("All windows closed.");
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    logger.debug("App activated.");
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  logger.error("Error while loading the app.", e);
}

function createWindow() {
  logger.debug("Creating window in main thread.");

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (serve) {
    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    logger.debug("Closing window.");
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}
