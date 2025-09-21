async function importBookmarks() {
  const SYNCMARK_FOLDER_NAME = "SyncMark";
  
  // Find or create the SyncMark folder in the bookmarks bar
  let syncMarkFolder = await findSyncMarkFolder();
  
  if (syncMarkFolder) {
    // Clear existing bookmarks in SyncMark folder only
    const children = await chrome.bookmarks.getChildren(syncMarkFolder.id);
    for (const child of children) {
      await chrome.bookmarks.removeTree(child.id);
    }
  } else {
    // Create the SyncMark folder if it doesn't exist
    syncMarkFolder = await chrome.bookmarks.create({
      parentId: "1", // 1 = Chrome's bookmarks bar
      title: SYNCMARK_FOLDER_NAME
    });
  }

  // Load the bookmarks.html file from remote source
  const response = await fetch("https://raw.githubusercontent.com/doerofeverything/bookmarks-by-doe/refs/heads/main/bookmarks_by_doe.html");
  const text = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  // Find the "Bookmarks bar" folder
  const bookmarkBar = doc.querySelector("h3[personal_toolbar_folder='true']");
  if (bookmarkBar) {
    const dl = bookmarkBar.nextElementSibling; // its <DL>
    if (dl) {
      await importDL(dl, syncMarkFolder.id); // Import into SyncMark folder
    }
  }
}

async function findSyncMarkFolder() {
  const children = await chrome.bookmarks.getChildren("1"); // 1 = Chrome's bookmarks bar
  return children.find(child => child.title === "SyncMark" && !child.url);
}

async function clearBookmarks() {
  // Find the SyncMark folder and clear only its contents
  const syncMarkFolder = await findSyncMarkFolder();
  
  if (syncMarkFolder) {
    const children = await chrome.bookmarks.getChildren(syncMarkFolder.id);
    for (const child of children) {
      await chrome.bookmarks.removeTree(child.id);
    }
    console.log("SyncMark bookmarks cleared successfully!");
  } else {
    console.log("No SyncMark folder found to clear.");
  }
}

async function importDL(dlElement, parentId) {
  const children = dlElement.querySelectorAll(":scope > dt");
  
  for (const dt of children) {
    const h3 = dt.querySelector(":scope > h3");
    const a = dt.querySelector(":scope > a");
    const dl = dt.querySelector(":scope > dl");

    if (h3) {
      // Create folder
      const newFolder = await chrome.bookmarks.create({ 
        parentId, 
        title: h3.textContent 
      });
      if (dl) {
        await importDL(dl, newFolder.id);
      }
    } else if (a) {
      // Create bookmark
      await chrome.bookmarks.create({
        parentId,
        title: a.textContent,
        url: a.getAttribute("href")
      });
    }
  }
}

// when the popup is opened, automatically trigger functions
document.addEventListener("DOMContentLoaded", async () => {
  await importBookmarks();
});

// Example: trigger when popup button clicked
document.getElementById("save").addEventListener("click", async () => {
  try {
    await importBookmarks();
    console.log("Bookmarks imported successfully!");
  } catch (error) {
    console.error("Error importing bookmarks:", error);
  }
});

document.getElementById("clear").addEventListener("click", async () => {
  try {
    await clearBookmarks();
    console.log("Bookmarks cleared successfully!");
  } catch (error) {
    console.error("Error clearing bookmarks:", error);
  }
});