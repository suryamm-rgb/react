# Nest is a nodejs framework

- A progressive node.js framework for building efficient, reliable and scalable server-side application
- Nestjs is a framework for building efficient, scalable node.js server side application.
- Its uses progressive JS, is building and fully support typescript and combines elements of OOP, functional relative program.
- create highly testable, scalable , loosely coupled and easily maintainable application, the architecture is heavily inspired by Angular.
- Nestjs combines a lots of NodeJS Plugin
- Nestjs uses TypeScript in order to give functionalities
- Nestjs helps to write modular, testable, scalable codes.

- **app.controller.ts** A basic controller with a single route
- **app.controller.spec.ts** The unit for the controller
- **app.module.ts** The root module of the application
- **app.service.ts** A basic service with a single method
- **main.ts** Entry file of the application with uses the core function nest factory to create a nest application instance.

# 📦 NestJS Installation Guide

---

## 📌 Introduction

NestJS is a powerful Node.js framework used to build scalable backend applications using TypeScript.

This guide will help you install and set up NestJS step by step.

---

## 🧰 Prerequisites

Before installing NestJS, make sure you have:

### 🔹 1. Install Node.js

Download and install Node.js from the official website:
👉 https://nodejs.org

To verify installation:

```bash
node -v
npm -v
```

---

## ⚙️ Install NestJS CLI

The NestJS CLI helps you create and manage projects easily.

### 🔹 Using npm

```bash
npm install -g @nestjs/cli
```

---

### 🔹 Using pnpm

```bash
pnpm i -g @nestjs/cli
```

---

## ✅ Verify Installation

Check if NestJS CLI is installed correctly:

```bash
nest --version
```

---

## 📖 Explore CLI Commands

To see all available commands:

```bash
nest --help
```

---

## 🚀 Create a New NestJS Project

To create a new project, run:

```bash
nest new project-name
```

👉 Example:

```bash
nest new my-app
```

---

## 📁 Project Setup Steps

After running the command:

1. Choose your package manager (npm / yarn / pnpm)
2. The CLI will automatically:
   - Install dependencies
   - Set up project structure

---

## ▶️ Run the Application

Navigate to your project folder:

```bash
cd project-name
```

Start the development server:

```bash
npm run start:dev
```

---

## 🌐 Access the Application

Open your browser and visit:

```
http://localhost:3000
```

---
