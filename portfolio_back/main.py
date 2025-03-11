from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
import os
from dotenv import load_dotenv

# Initialize FastAPI
app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Add all frontend URLs you need
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

# MongoDB Connection
load_dotenv()

MONGODB_URL = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGODB_URL)
db = client["portfolio"]

# JWT Configuration
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 for Token Authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# User Model
class User(BaseModel):
    username: str
    password: str
    role: str  # "admin" or "user"

# Project Entity
class Project(BaseModel):
    title: str
    description: str
    image: str
    link: str
    logos: List[str]  # Tech stack (React, TypeScript, etc.)

# Skill Entity
class Skill(BaseModel):
    name: str
    icon: str  # Icon name (e.g., "SiReact")
    category: str  # Frontend, Backend, DevOps, etc.

# Achievement Entity
class Achievement(BaseModel):
    icon: str  # Emoji as a string
    title: str
    description: str

# Utility: Convert MongoDB Document to JSON (Convert ObjectId to str)
def serialize_document(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# Initialize default users in MongoDB
async def initialize_users():
    existing_users = await db["users"].count_documents({})
    if existing_users == 0:  # Add only if empty
        users = [
            
            {
                "username": "normal_user",
                "password": pwd_context.hash("user123"),
                "role": "user",
            }
        ]
        await db["users"].insert_many(users)
        print("✅ Default users added to MongoDB!")

# Utility: Verify Password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Utility: Create JWT Token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Dependency: Get Current User from Token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        if username is None or role is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        user = await db["users"].find_one({"username": username})
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        
        return {"username": username, "role": role}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# Dependency: Admin Access Only
async def admin_only(user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admins only")
    return user

# Login Route (Get Token)
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db["users"].find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    
    access_token = create_access_token(
        data={"sub": user["username"], "role": user["role"]}, 
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Public Route: View all projects
@app.get("/projects/")
async def get_projects():
    projects = await db.projects.find().to_list(None)
    return [serialize_document(project) for project in projects]

# Admin Route: Add Project
@app.post("/projects/", dependencies=[Depends(admin_only)])
async def add_project(project: Project):
    result = await db.projects.insert_one(project.dict())
    return {"id": str(result.inserted_id)}

# Public Route: View all achievements
@app.get("/achievements/")
async def get_achievements():
    achievements = await db.achievements.find().to_list(None)
    return [serialize_document(achievement) for achievement in achievements]

# Admin Route: Add Achievement
@app.post("/achievements/", dependencies=[Depends(admin_only)])
async def add_achievement(achievement: Achievement):
    result = await db.achievements.insert_one(achievement.dict())
    return {"id": str(result.inserted_id)}

# Public Route: Get all skills
@app.get("/skills/")
async def get_skills():
    skills = await db["skills"].find().to_list(None)
    return [serialize_document(skill) for skill in skills]

# Admin Route: Add Skill
@app.post("/skills/", dependencies=[Depends(admin_only)])
async def add_skill(skill: Skill):
    existing_skill = await db["skills"].find_one({"name": skill.name})
    if existing_skill:
        raise HTTPException(status_code=400, detail="Skill already exists")

    result = await db["skills"].insert_one(skill.dict())
    return {"id": str(result.inserted_id)}

# Root Route
@app.get("/")
def home():
    return {"message": "Portfolio API is running!"}

# Database Health Check
@app.get("/check_db")
async def check_database():
    try:
        await db.command("ping")
        return {"message": "Database connected successfully!"}
    except Exception as e:
        return {"error": str(e)}

# Startup Event: Initialize Default Users
@app.on_event("startup")
async def startup_event():
    await initialize_users()
