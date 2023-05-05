export const calcAvatarUrl = (name: string) => {
  switch (name) {
    case 'Roman':
      return import.meta.env.VITE_PIC_ROMA_URL;
    case 'Elizabeth':
      return import.meta.env.VITE_PIC_LIZA_URL;
    case 'Arseniy':
      return import.meta.env.VITE_PIC_ARS_URL;
    case 'Dmitriy':
      return import.meta.env.VITE_PIC_DIMA_URL;
    case 'Oksana':
      return import.meta.env.VITE_PIC_OKS_URL;
    default:
      return '';
  }
};
