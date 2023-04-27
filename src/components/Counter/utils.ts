export const calcAvatarUrl = (name: string) => {
  switch (name) {
    case 'Roman':
      return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/roma.jpg?alt=media&token=8e60ce62-9b8b-4975-9c4e-34c3d2bb7481';
    case 'Elizabeth':
      return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/liza.jpg?alt=media&token=8c00ba19-5a2e-4de4-83ba-4606a75f911a';
    case 'Arseniy':
      return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/ars.jpg?alt=media&token=1baabe9b-929b-485a-a0af-3150809a756d';
    case 'Dmitriy':
      return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/dima.jpg?alt=media&token=57b1df27-6b50-412d-a868-a169c0bb3305';
    case 'Oksana':
      return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/oks.jpg?alt=media&token=ed7dc9bc-23f8-4281-b7a6-a9deae4c3d36';
    default:
      return '';
  }
};
