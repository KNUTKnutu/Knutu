const { app, BrowserWindow } = require("electron");

const createWindow = async () => {

  const path = await require("path");

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    icon: path.join(__dirname, "../src/Assets/Images/Knutu_64x64.jpg")
  });

  win.setMenu(null);
  win.setResizable(false);

  win.loadURL("http://localhost:3000");
  win.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
