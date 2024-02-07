import fs from 'fs';
import path from 'path';

const updateImportsInFile = (filePath, oldExtension, newExtension) => {
  fs.readFile(filePath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error(`Error reading file ${filePath}:`, readErr);
      return;
    }

    // Update import statements in the file content
    const updatedContent = data.replace(new RegExp(`\\.js(['"]|['"]\\))`, 'g'), `.mjs$1`);

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing to file ${filePath}:`, writeErr);
      } else {
        console.log(`Updated imports in file: ${filePath}`);
      }
    });
  });
};

const renameAndModifyImportsInDirectory = (directoryPath, oldExtension, newExtension) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(`Error checking file stats for ${filePath}:`, statErr);
          return;
        }

        if (stats.isDirectory()) {
          // If it's a directory, recursively call the function
          renameAndModifyImportsInDirectory(filePath, oldExtension, newExtension);
        } else if (path.extname(file) === oldExtension) {
          // If it's a file with the old extension, rename and update imports
          const newFilePath = path.join(
            directoryPath,
            path.basename(file, oldExtension) + newExtension
          );

          fs.rename(filePath, newFilePath, (renameErr) => {
            if (renameErr) {
              console.error(`Error renaming file ${filePath}:`, renameErr);
            } else {
              console.log(`Renamed file: ${filePath} to ${newFilePath}`);
              // Update imports in the renamed file
              updateImportsInFile(newFilePath, oldExtension, newExtension);
            }
          });
        }
      });
    });
  });
};

const mainDirectoryPath = './build'; // Change this to the path of your main directory
const oldExtension = '.js';
const newExtension = '.mjs';

renameAndModifyImportsInDirectory(mainDirectoryPath, oldExtension, newExtension);
