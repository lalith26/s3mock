# S3 File System UI

A rapid mockup of the user's S3 file system in around 8 hours.

# Configuration
Bucket name, access key, secret access key, region have to be setup in public/config/config.js

The user must have S3 permissions to list bucket and get object and the bucket should have a cors configuration.

# Steps to run the app

- Clone the project

- Install gulp globally using

    `npm install -g gulp`

- Install dependencies using

    `npm install`

- Generate the build files by using

    `gulp build`

- In another terminal window, Run the server using

    `gulp serve`

   This will start the server on http://localhost:8000/


# Points to note

- The S3 API had two options.
   -    Get the first level of folders in the first call and then make subsequent calls for retrieving folders and files on demand.

   -    Get the full list of files and folders as Keys. Ex: one/, one/one.txt, one/sample/

- Here, In this implementation, the second option is used to get the list of all files and it is parsed as a tree. The Tree is used as a single source of truth and the UI is rendered based on the data in the tree.

- On clicking on the file, a separate call is used to fetch the contents and it is shown on the right pane.


# Frameworks Used

- React for the View and Flux for communication

- Font Awesome icons for icons

- Various gulp plugins for automation

# Screenshots

- After the app starts, it loads the data from the bucket

    ![alt tag](https://raw.githubusercontent.com/lalith26/s3mock/master/screenshots/loading.png)

- File System Screen shot 1

    ![alt tag](https://raw.githubusercontent.com/lalith26/s3mock/master/screenshots/one.png)

- File System Screen shot 1

    ![alt tag](https://raw.githubusercontent.com/lalith26/s3mock/master/screenshots/two.png)
