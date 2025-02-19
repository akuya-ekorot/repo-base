# Repo Base

Repo Base is an AI-powered tool that helps you chat with and understand GitHub repositories. It uses Mastra, a TypeScript AI framework, to fetch repository data including file trees, file contents, pull requests, and issues, allowing you to easily navigate and understand codebases of any size.

![Repo Base Demo](https://via.placeholder.com/800x400?text=Repo+Base+Demo)

## Features

- **Repository Analysis**: Upload a GitHub repository URL and instantly start a conversation about it
- **Code Exploration**: Navigate file trees, view file contents, and understand code structure
- **PR & Issue Access**: Query information about pull requests and issues directly in chat
- **Large Codebase Support**: Powered by Google's Gemini Flash model with its large context window
- **Intuitive UI**: Built with assistant-UI for a seamless chat experience with retries, copy, and message branching

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Generative AI API key
- GitHub token (optional, but recommended for better rate limits)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/repo-base.git
cd repo-base
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your API keys:

```plaintext
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
DB_URL=postgresql://username:password@localhost:5432/repo_base
GITHUB_TOKEN=your_github_token_here  # optional, but helps with rate limits
```

4. Set up the database:

```bash
npx prisma migrate dev
# or 
yarn prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a GitHub repository URL in the input field (e.g., `https://github.com/facebook/react`)
2. Start chatting with Repo Base about the repository
3. Use commands like:
   - "Show me the file structure"
   - "What are the recent pull requests?"
   - "Explain the purpose of [filename]"
   - "How many open issues are there?"

## Tech Stack

- **Framework**: [Mastra](https://github.com/mastrapp/mastra) (TypeScript AI Framework)
- **Frontend**: Next.js, [assistant-UI](https://github.com/assistant-ui/assistant-ui)
- **AI Model**: Google Gemini Flash
- **Database**: PostgreSQL (for agent memory)
- **Deployment**: Vercel (recommended)

## How It Works

Repo Base uses a tool-based approach rather than traditional RAG systems, making it more efficient for large codebases. When you provide a repository URL, Repo Base uses tools to:

1. Fetch the repository's file tree
2. Access file contents on demand
3. Retrieve information about pull requests and issues
4. Store conversation history using Mastra's memory package

The large context window of Gemini Flash allows the agent to hold more code in memory, making the conversation more coherent and informed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Mastra](https://mastra.ai/) for providing the TypeScript AI framework
- [assistant-UI](https://www.assistant-ui.com/) for the chat interface components
- Google's Gemini Flash model for powering the AI capabilities

---

Built with ❤️ using [Mastra](https://github.com/mastrapp/mastra)heck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
