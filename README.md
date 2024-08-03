# Bionic Reading Project

## Overview

**Bionic Reading** is a web application that enhances reading speed and comprehension by transforming text using the bionic reading technique. Users can input text directly or upload PDF and Word documents. The application converts the content by highlighting specific parts, making it easier to process and understand.

## Features

- **Text Input**: Users can input text directly into the application.
- **File Upload**: Supports uploading of PDF and Word documents.
- **Bionic Reading Transformation**: Converts text by highlighting specific parts to improve readability.
- **Download**: Users can download the transformed document in pdf/docx format.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aaryank1/Bionique

2. **Navigate to the Project Directory**

   ```bash
   cd bionic-reading-project


3. **Install Dependencies**
Ensure you have Node.js installed. Then, run:

   ```bash
   npm install

4. Start the Development Server
   ```bash
   nodemon index.js
The application will be running on http://localhost:3000.

## Usage
1. Input Text: Enter the text in the provided text area.
2. Upload Files: Use the file upload option to select PDF or Word documents.
3. Transform Text: Click on the transform button to apply the bionic reading technique.
4. Download: Click the download button to get the transformed text in DOCX format.

## Implementation Details
- **Frontend**: Built using React.js for a dynamic and responsive user interface.
- **Backend**: Node.js and Express handle file uploads and text processing.
- **File Conversion**: Utilizes libraries such as html-docx-js for converting HTML to DOCX.
- **Bionic Reading Algorithm**: Highlights specific portions of the text to enhance readability.
