## WIP

# React webpage + PWA frontend
for sister project https://github.com/blcoyote/camera-events-service 

needs .env with firebase app configuration. authentication has to be enabled.

firebase-messaging-sw.js will be generated in public and dist folders at build time, so the project has to be built once before it has the serviceworker in public folder(issue with npm run dev).