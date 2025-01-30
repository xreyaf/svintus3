export const getAvatarUrl = (name: string) => {
  switch (name) {
    case 'Roman':
      return process.env.NEXT_PUBLIC_PIC_ROMA_URL
    case 'Elizabeth':
      return process.env.NEXT_PUBLIC_PIC_LIZA_URL
    case 'Arseniy':
      return process.env.NEXT_PUBLIC_PIC_ARS_URL
    case 'Dmitriy':
      return process.env.NEXT_PUBLIC_PIC_DIMA_URL
    case 'Oksana':
      return process.env.NEXT_PUBLIC_PIC_OKS_URL
  }
}

export const getRuLocale = (name: string, caseType: 'nominative' | 'accusative' | 'dative') => {
  switch (name) {
    case 'Roman':
      return caseType === 'accusative' ? 'Ромку' : caseType === 'dative' ? 'Ромке' : 'Ромка'
    case 'Elizabeth':
      return caseType === 'accusative' ? 'Лизку' : caseType === 'dative' ? 'Лизке' : 'Лизок'
    case 'Arseniy':
      return caseType === 'accusative' ? 'Асюшку' : caseType === 'dative' ? 'Асюшке' : 'Арсюшка'
    case 'Dmitriy':
      return caseType === 'accusative' ? 'Димку' : caseType === 'dative' ? 'Димке' : 'Димка'
    case 'Oksana':
      return caseType === 'accusative' ? 'Оксанку' : caseType === 'dative' ? 'Оксанке' : 'Оксик'
    default:
      return ''
  }
}

export const getSocialNickname = (name: string) => {
  switch (name) {
    case 'Roman':
      return 'xreyaf'
    case 'Elizabeth':
      return 'lis0_o'
    case 'Arseniy':
      return 'hhtfu'
    case 'Dmitriy':
      return 'mityoque'
    case 'Oksana':
      return 'nyaaaammmm'
    default:
      return ''
  }
}

export const getClearVerbForm = (name: string) => {
  const maleNames = ['Roman', 'Arseniy', 'Dmitriy']
  const femaleNames = ['Elizabeth', 'Oksana']

  if (maleNames.includes(name)) {
    return 'обнулился'
  } else if (femaleNames.includes(name)) {
    return 'обнулилась'
  }
}
