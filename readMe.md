# Openium Bot

This repository contains a Discord bot built using Node.js, supporting both JavaScript and TypeScript. The bot is designed to be versatile and easy to set up, with configurations managed through environment variables and JSON files.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications).
- MySQL database setup (local or remote).
- Groq API key for Groq integration.

### Installation

1. **Clone the Repository**  
   Clone the repository to your local machine using Git:
   ```bash
   git clone https://github.com/hothots/openium-bot.git
   ```

2. **Set Up Configuration Files**  
   - Rename `.env.example` to `.env`.
   - Fill in the necessary details in this files:
     - `.env`: Add your Discord bot token, application ID, MySQL database credentials, and Groq API key for Groq.
     - `config.json`: Adjust the settings according to your preferences.

3. **Database Setup**  
   - Import the `data-base.sql` file from the `data-base` directory into your MySQL database.
   - Ensure the database name in `.env` matches the one used during the import.

4. **Install Dependencies**  
   Run the following command to install the required npm packages:
   ```bash
   npm install
   ```

5. **Running the Bot**  
   - Use the provided batch files to manage the bot:
     - `__build-npm.bat`: Installs necessary dependencies.
     - `__start-bot.bat`: Starts the bot & deploy.

## A.I Groq Configuration

To enable Groq ([Groq](https://groq.com/)) integration, add the following variables to your `.env` file:
```ini
GROQ_API_MODEL=YOUR_GROQ_API_MODEL
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
```
- Get your API key from [Groq](https://groq.com/).
- Ensure the model name matches the supported model version.

## Contributing

We welcome contributions from the community! To contribute:

1. **Fork the Repository**  
   Click the "Fork" button on the top right of the repository page.

2. **Clone Your Fork**  
   Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/openium-bot
   ```

3. **Create a Branch**  
   Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Commit Your Changes**  
   Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add your commit message here"
   ```

5. **Push to Your Fork**  
   Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**  
   Open a pull request from your forked repository to the original repository.

## Enjoy!

We hope you enjoy using and contributing to the OpenIUM Bot. If you have any questions or need further assistance, feel free to reach out!

