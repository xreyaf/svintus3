export const getAvatarUrl = (name: string) => {
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

export const getRuLocale = (name: string) => {
  switch (name) {
    case 'Roman':
      return 'Ромка';
    case 'Elizabeth':
      return 'Лизок';
    case 'Arseniy':
      return 'Арсюшка';
    case 'Dmitriy':
      return 'Димка';
    case 'Oksana':
      return 'Оксик';
    default:
      return '';
  }
};
