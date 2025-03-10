
# Portfolio Project

This is a portfolio project showcasing my work and achievements. The project is built using FastAPI for the backend and React with TypeScript for the frontend. It includes features such as a projects section, achievements, and a contact form.

## Prerequisites

Before starting the project, make sure you have the following installed:

- Python (for the backend)
- Node.js (for the frontend)
- MongoDB (for the database)
- `git` (for version control)

## Backend Setup (FastAPI)

1. **Clone the repository**:

   Clone the repository to your local machine.

   ```bash
   git clone <repository-url>
   cd portfolio-backend
   ```

2. **Create a virtual environment**:

   Create a virtual environment to isolate the backend dependencies.

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

4. **Install backend dependencies**:

   Install the required Python packages listed in the `requirements.txt` file.

   ```bash
   pip install -r requirements.txt
   ```

5. **Set up the database**:

   - Install MongoDB on your local machine or use a cloud provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a MongoDB database and configure your database connection settings in the `config` or `.env` file.

   Example of `.env` settings:

   ```bash
   MONGO_URI=mongodb://localhost:27017/portfolio
   ```

6. **Run the backend server**:

   Start the FastAPI backend using the following command:

   ```bash
   uvicorn main:app --reload
   ```

   The backend will now be running on `http://localhost:8000`.

## Frontend Setup (React + TypeScript)

1. **Navigate to the frontend directory**:

   ```bash
   cd portfolio-frontend
   ```

2. **Install frontend dependencies**:

   Install the required Node.js packages.

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file and configure your backend API URL or any other necessary environment variables.

   Example:

   ```bash
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Run the frontend development server**:

   Start the React development server with the following command:

   ```bash
   npm run dev
   ```

   The frontend will now be running on `http://localhost:3000`.

## Folder Structure

```
portfolio/
├── portfolio-backend/
│   ├── main.py         # FastAPI backend entry point
│   ├── requirements.txt # Backend dependencies
│   ├── config.py       # Database and other settings
│   └── ...             # Other backend files (models, routers, etc.)
├── portfolio-frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # React pages
│   │   └── ...          # Other frontend files (hooks, services, etc.)
│   ├── public/
│   ├── package.json     # Frontend dependencies
│   └── .env             # Frontend environment variables
├── README.md           # Project documentation
└── .gitignore           # Git ignore file
```

## Deployment (Optional)

For deployment, you can use a platform such as:

- **Heroku** (for backend with MongoDB integration)
- **Netlify** or **Vercel** (for frontend)

Ensure you configure your environment variables and MongoDB connection settings for production.

## Contributing

Feel free to fork the repository and create a pull request with any improvements or suggestions. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
