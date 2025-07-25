<div align="center">
  <img src="screenshots/logo.png" alt="Fit Pool Logo" width="120" height="120"/>
  <h1>🏊‍♀️ Fit Pool</h1>
  <p><i>Your personal fitness companion – Search, Track, and Transform.</i></p>
  
  <a href="https://fitpool.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=flat-square&logo=netlify" alt="Live Demo Badge"/>
  </a>
  <img src="https://img.shields.io/github/languages/top/PanjaChaitanya/Fit-Pool?color=blue&style=flat-square"/>
  <img src="https://img.shields.io/github/last-commit/PanjaChaitanya/Fit-Pool?style=flat-square"/>
  <img src="https://img.shields.io/github/license/PanjaChaitanya/Fit-Pool?style=flat-square"/>
</div>

---

## 🚀 Project Overview

**Fit Pool** is a sleek, modern, and fully responsive **fitness web application** built to support users in their fitness journey. Whether you're a beginner or a regular at the gym, this app gives you tools to search for exercises, calculate your BMI, and track your sets with a stopwatch.

> 💡 “Lost in your fitness journey? Fit Pool helps you find your way.”

---

## ✨ Features

- 🔍 **Exercise Search**: Search exercises by body part, name, or equipment using real-time data from the **ExerciseDB API**.
- 🧮 **BMI Calculator**: Input your height and weight to calculate your Body Mass Index and know where you stand.
- ⏱️ **Workout Stopwatch**: Simple start/pause/reset stopwatch to time your sets and breaks.
- 🎨 **Responsive UI**: Clean, attractive layout that works on both desktop and mobile.
- 🔐 **Firebase Authentication**: User sign-up and login with Google Firebase for secure access.

---

## 🛠️ Tech Stack

| Category         | Technology                                |
|------------------|--------------------------------------------|
| 🚀 Frontend      | Vite + React                               |
| 🎨 Styling       | Tailwind CSS, Material UI, CSS Modules     |
| 🔀 Animation     | Framer Motion                              |
| 🔐 Auth          | Firebase Authentication                    |
| 📡 API           | ExerciseDB API                             |
| 🧪 State Mgmt    | React Hooks                                |
| 🌍 Deployment    | Netlify [`fitpool.netlify.app`](https://fitpool.netlify.app/) |

---

## 📦 Installation

Follow the steps below to set up **Fit Pool** on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/PanjaChaitanya/Fit-Pool.git
cd Fit-Pool

# 2. Install dependencies
npm install

# 3. Create environment file
touch .env.local
