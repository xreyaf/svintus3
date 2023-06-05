FROM node:18-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
ENV VITE_FB_API_KEY AIzaSyBL1kPFlXWdoniW7ucaQrC5z4knEJSBITw
ENV VITE_FB_AUTH_DOMAIN svintus3-f2840.firebaseapp.com
ENV VITE_FB_PROJECT_ID svintus3-f2840
ENV VITE_FB_STORAGE_BUCKET svintus3-f2840.appspot.com
ENV VITE_FB_MESSAGING_SENDER_ID 546736648325
ENV VITE_FB_APP_ID 1:546736648325:web:8078aca4edf124be4439ec
ENV VITE_FB_MEASUREMENT_ID G-D9S8RGT65H
ENV VITE_FB_DOC_PATH m8QSBnn81U6SV78BAR1i
ENV VITE_PIC_ROMA_URL https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/roma.jpg?alt=media&token=8e60ce62-9b8b-4975-9c4e-34c3d2bb7481
ENV VITE_PIC_LIZA_URL https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/liza.jpg?alt=media&token=8c00ba19-5a2e-4de4-83ba-4606a75f911a
ENV VITE_PIC_ARS_URL https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/ars.jpg?alt=media&token=1baabe9b-929b-485a-a0af-3150809a756d
ENV VITE_PIC_DIMA_URL https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/dima.jpg?alt=media&token=57b1df27-6b50-412d-a868-a169c0bb3305
ENV VITE_PIC_OKS_URL https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/oks.jpg?alt=media&token=ed7dc9bc-23f8-4281-b7a6-a9deae4c3d36
CMD ["npm", "run", "dev"]
