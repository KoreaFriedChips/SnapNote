# SnapNote

SnapNote is a note-taking app designed to provide a seamless experience for organizing your notes and textbook photos in a clean and clutter-free manner. Inspired by the simplicity of Markdown and the need to manage photos of textbook pages, SnapNote allows you to capture photos, take notes, and categorize them by subject, all while keeping your camera roll tidy.

## Features

- User-friendly interface for reading and writing notes in markdown
- Custom colour coded tags that can be added and removed seamlessly
- Upload photos of textbook pages or drawings from class to organize images and avoid clutter in your camera roll
- Search for notes by title or by tag
- Responsive design for optimal user experience on all devices
- Dark mode feature for studying at night

![edit](/src/assets/images/edit.png)
![list](/src/assets/images/list.png)

## Tech Stack

- **Frontend**: React (TypeScript), Bootstrap
- **Backend**: LocalStorage
  - Photos are stored with a temporary generated url with URL.createObjectURL so when you refresh the pages the photos are lost. An extension to this project would be storing files in the cloud or adding a database.
