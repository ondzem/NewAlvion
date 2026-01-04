export type MobileBreakpoint = 'sm' | 'md' | 'mdPlus';
export type ResponsiveValueMobile<T> = Record<MobileBreakpoint, T>;

export interface SectionLayoutMobile {
  top: number;
  width: number;
  height: number;
  left?: number;
}

export interface HeroLayoutMobile extends SectionLayoutMobile {
  left: string | number;
  subtitle: {
    left?: number;
    marginTop: number;
    width: number;
    fontSize: number;
    textAlign: 'left' | 'center' | 'right';
  };
  title: {
    left?: number;
    marginTop: number;
    width: number;
    fontSize: number;
    textAlign: 'left' | 'center' | 'right';
  };
  floatingImage: {
    width: number;
    height: number;
    left?: string | number;
    right?: string | number;
    top: number;
    opacity?: number;
  };
  shadow: {
    width: number;
    height: number;
    left?: string | number;
    right?: string | number;
    top: number;
    opacity: number;
  };
  arrow: {
    width: number;
    height: number;
    left?: string | number;
    right?: string | number;
    top?: number;
    bottom?: number;
  };
}

export interface ServicesLayoutMobile extends SectionLayoutMobile {
  titleTop: string;
  titleLeft: number;
  titleWidth: string | number;
  titleFontSize: number;
  item1: {
    top: string;
    left: number;
    title: string;
    numberFontSize: number;
    titleFontSize: number;
    spacing?: number;
    lineWidth?: string | number;
    width?: number;
  };
  item2: {
    top: string;
    left: number;
    title: string;
    numberFontSize: number;
    titleFontSize: number;
    spacing?: number;
    lineWidth?: string | number;
    width?: number;
  };
  item3: {
    top: string;
    left: number;
    title: string;
    numberFontSize: number;
    titleFontSize: number;
    spacing?: number;
    lineWidth?: string | number;
  };
  button: {
    top: string;
    left: number;
    width: number;
    height: number;
  };
}

export interface MissionLayoutMobile extends SectionLayoutMobile {
  maxWidth: string | number;
  paddingY: number;
  marginLeft: number;
  text: {
    fontSize: string | number;
    lineHeight: string | number;
    letterSpacing: number;
    marginBottom: number;
  };
  button: {
    width: number;
    height: number;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
  };
}

export interface ContactLayoutMobile extends SectionLayoutMobile {
  paddingY: string | number;
  maxWidth: string | number;
  text: {
    fontSize: string | number;
    marginBottom: string | number;
    lineHeight: string | number;
  };
  button: {
    width: number;
    height: number;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
  };
}

export interface WhyChooseLayoutMobile extends SectionLayoutMobile {
  titleFontSize: string | number;
  titleLeft: number;
  titleMaxWidth: string | number;
  titleMarginBottom: string | number;
  numberLeft: number;
  numberTop: string | number;
  numberFontSize: string | number;
  contentLeft: string | number;
  contentTop: string | number;
  contentTitleFontSize: number;
  contentDescFontSize: string | number;
  contentLineHeight: string | number;
  contentTitleMarginBottom: number;
  arrowRight: string;
  arrowTop: string | number;
  arrowSize: number;
  containerMaxWidth: string | number;
  containerMinHeight: string | number;
  paddingTop: string | number;
  paddingBottom: string | number;
}

export interface ReferencesLayoutMobile extends SectionLayoutMobile {
  titleFontSize: string | number;
  titleMarginBottom: number;
  titleLeft: number;
  openCardLeftPadding: string | number;
  closedCardLeftPadding: string | number;
  buttonRight: string;
  button: {
    width: number;
    height: number;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
  };
  closedCard: {
    gap: number;
  };
  elektrika?: {
    tagMarginTop: number;
  };
  storek?: {
    tagMarginTop: number;
  };
  raska?: {
    tagMarginTop: number;
  };
  spilar?: {
    tagMarginTop: number;
  };
}

export interface FooterLayoutMobile extends SectionLayoutMobile {
  cardWidth: number;
  cardHeight: number;
  titleLeft: number;
  titleFontSize: number;
  titleMarginBottom: number;
  contentLeft: number;
  nameFontSize: number;
  nameMarginBottom: number;
  contactFontSize: number;
  contactLineHeight: number;
  contactMarginBottom?: number;
  contactItemMarginBottom?: number;
  contactSectionMarginBottom?: number;
  icFontSize?: number;
  icMarginBottom?: number;
  socialMarginBottom?: number;
  socialSectionMarginBottom?: number;
  socialIconSize: number;
  buttonMarginBottom?: number;
  buttonWidth?: number;
  buttonHeight?: number;
  buttonFontSize?: number;
  arrowSize: number;
  arrowLeft: string;
  arrowBottom: number;
  privacyMarginBottom: number;
  copyrightFontSize: number;
  logoOpacity: number;
  logoRight: number | string;
  logoTop: string;
  logoSize: string;
}

export interface NavigationLayoutMobile {
  top: number;
  right: string;
  hamburgerWidth: number;
  hamburgerHeight: number;
}

export interface ServicePageHeroLayoutMobile extends SectionLayoutMobile {
  subtitle: {
    left: number;
    top: number;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
  };
  title: {
    left: number;
    top: number;
    width: number;
    fontSize: string | number;
    letterSpacing: number;
    lineHeight: number;
  };
  arrow: {
    width: number;
    height: number;
    right: number;
    top: number;
  };
  bottomSpacing: number;
}

export interface ServiceDetailLayoutMobile extends SectionLayoutMobile {
  outerPaddingTop: number;
  outerPaddingBottom: number;
  outerPaddingX: number;
  spaceBetween: number;
  innerPadding: number;
  innerPaddingLeft?: number;
  numberCircle: {
    width: number;
    height: number;
    fontSize: number;
  };
  title: {
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    marginBottom: number;
  };
  description: {
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    marginBottom: number;
  };
  divider: {
    marginBottom: number;
  };
  columnsGap: number;
  columnTitle: {
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    marginBottom: number;
  };
  badge: {
    paddingX: number;
    paddingY: number;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    marginBottom: number;
  };
}

export interface LayoutConfigMobile {
  container: ResponsiveValueMobile<{ minWidth: number; minHeight: number }>;
  header: ResponsiveValueMobile<{
    top: number;
    left: string;
    logoWidth: number;
    logoHeight: number;
    lineGap: number;
    line1Width: number;
    line2Width: number;
    line2VerticalOffset: number;
  }>;
  navigation: ResponsiveValueMobile<NavigationLayoutMobile>;
  hero: ResponsiveValueMobile<HeroLayoutMobile>;
  servicePageHero: ResponsiveValueMobile<ServicePageHeroLayoutMobile>;
  serviceDetail: ResponsiveValueMobile<ServiceDetailLayoutMobile>;
  mission: ResponsiveValueMobile<MissionLayoutMobile>;
  contact: ResponsiveValueMobile<ContactLayoutMobile>;
  services: ResponsiveValueMobile<ServicesLayoutMobile>;
  references: ResponsiveValueMobile<ReferencesLayoutMobile>;
  whyChoose: ResponsiveValueMobile<WhyChooseLayoutMobile>;
  footer: ResponsiveValueMobile<FooterLayoutMobile>;
}

export const layoutConfigMobile: LayoutConfigMobile = {
  container: {
    sm: { minWidth: 375, minHeight: 4000 },
    md: { minWidth: 768, minHeight: 4500 },
    mdPlus: { minWidth: 900, minHeight: 4500 },
  },

  header: {
    sm: {
      top: 60,
      left: 'clamp(58px, 13.33vw, 180px)',
      logoWidth: 90,
      logoHeight: 90,
      lineGap: 5,
      line1Width: 40,
      line2Width: 25,
      line2VerticalOffset: 4,
    },
    md: {
      top: 60,
      left: 'clamp(110px, 13.33vw, 220px)',
      logoWidth: 90,
      logoHeight: 90,
      lineGap: 6,
      line1Width: 50,
      line2Width: 32,
      line2VerticalOffset: 5,
    },
    mdPlus: {
      top: 60,
      left: 'clamp(110px, 13.33vw, 220px)',
      logoWidth: 90,
      logoHeight: 90,
      lineGap: 6,
      line1Width: 50,
      line2Width: 32,
      line2VerticalOffset: 5,
    },
  },

  navigation: {
    sm: {
      top: 36,
      right: 'clamp(18px, 5.63vw, 65px)',
      hamburgerWidth: 80,
      hamburgerHeight: 18,
    },
    md: {
      top: 38,
      right: 'clamp(25px, 6.33vw, 62px)',
      hamburgerWidth: 85,
      hamburgerHeight: 18,
    },
    mdPlus: {
      top: 38,
      right: 'clamp(25px, 6.33vw, 62px)',
      hamburgerWidth: 90,
      hamburgerHeight: 18,
    },
  },

  servicePageHero: {
sm: {
top: 0,
left: 0,
width: 375,
height: 540,
subtitle: {
left: 30,
top: 201,
fontSize: 20,
letterSpacing: 0.8,
lineHeight: 23.4,
},
title: {
left: 30,
top: 257,
width: 'clamp(260px, 88vw, 440px)',
fontSize: 'clamp(22px, 8.8vw, 44px)',
letterSpacing: 1.6,
lineHeight: 46.8,
},
arrow: {
width: 88,
height: 88,
right: 20,
top: 415,
},
bottomSpacing: 60,
},
md: {
top: 0,
left: 0,
width: 768,
height: 600,
subtitle: {
left: 50,
top: 200,
fontSize: 24,
letterSpacing: 1.0,
lineHeight: 28.0,
},
title: {
left: 50,
top: 270,
width: 'clamp(320px, 85vw, 460px)',
fontSize: 'clamp(40px, 6.25vw, 52px)',
letterSpacing: 1.8,
lineHeight: 56.0,
},
arrow: {
width: 100,
height: 100,
right: 0,
top: 450,
},
bottomSpacing: 80,
},
mdPlus: {
top: 0,
left: 0,
width: 900,
height: 650,
subtitle: {
left: 60,
top: 220,
fontSize: 26,
letterSpacing: 1.1,
lineHeight: 30.0,
},
title: {
left: 60,
top: 300,
width: 600,
fontSize: 'clamp(42px, 5.55vw, 54px)',
letterSpacing: 2.0,
lineHeight: 58.0,
},
arrow: {
width: 110,
height: 110,
right: 10,
top: 490,
},
bottomSpacing: 100,
},
},

  serviceDetail: {
    sm: {
      top: 100,
      left: 0,
      width: 375,
      height: 750,
      outerPaddingTop: 40,
      outerPaddingBottom: 15,
      outerPaddingX: 15,
      spaceBetween: 15,
      innerPadding: 28,
      innerPaddingLeft: 28,
      numberCircle: {
        width: 38,
        height: 38,
        fontSize: 24,
      },
      title: {
        fontSize: 34,
        letterSpacing: 0.88,
        lineHeight: 25.76,
        marginBottom: 20,
      },
      description: {
        fontSize: 13,
        letterSpacing: 0.52,
        lineHeight: 15.18,
        marginBottom: 20,
      },
      divider: {
        marginBottom: 35,
      },
      columnsGap: 30,
      columnTitle: {
        fontSize: 18,
        letterSpacing: 0.6,
        lineHeight: 17.55,
        marginBottom: 25,
      },
      badge: {
        paddingX: 16,
        paddingY: 8,
        fontSize: 12,
        letterSpacing: 0.44,
        lineHeight: 12.87,
        marginBottom: 16,
      },
    },
    md: {
      top: 100,
      left: 0,
      width: 768,
      height: 750,
      outerPaddingTop: 40,
      outerPaddingBottom: 15,
      outerPaddingX: 15,
      spaceBetween: 15,
      innerPadding: 38,
      innerPaddingLeft: 38,
      numberCircle: {
        width: 38,
        height: 38,
        fontSize: 24,
      },
      title: {
        fontSize: 37,
        letterSpacing: 1.04,
        lineHeight: 30.38,
        marginBottom: 20,
      },
      description: {
        fontSize: 13,
        letterSpacing: 0.6,
        lineHeight: 17.55,
        marginBottom: 20,
      },
      divider: {
        marginBottom: 35,
      },
      columnsGap: 30,
      columnTitle: {
        fontSize: 18,
        letterSpacing: 0.68,
        lineHeight: 19.89,
        marginBottom: 25,
      },
      badge: {
        paddingX: 16,
        paddingY: 8,
        fontSize: 12,
        letterSpacing: 0.48,
        lineHeight: 14.04,
        marginBottom: 16,
      },
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 900,
      height: 700,
      outerPaddingTop: 0,
      outerPaddingBottom: 0,
      outerPaddingX: 0,
      spaceBetween: 29,
      innerPadding: 40,
      innerPaddingLeft: 90,
      numberCircle: {
        width: 40,
        height: 40,
        fontSize: 22,
      },
      title: {
        fontSize: 28,
        letterSpacing: 1.12,
        lineHeight: 32.76,
        marginBottom: 16,
      },
      description: {
        fontSize: 16,
        letterSpacing: 0.64,
        lineHeight: 18.72,
        marginBottom: 16,
      },
      divider: {
        marginBottom: 16,
      },
      columnsGap: 16,
      columnTitle: {
        fontSize: 18,
        letterSpacing: 0.72,
        lineHeight: 21.06,
        marginBottom: 12,
      },
      badge: {
        paddingX: 16,
        paddingY: 8,
        fontSize: 13,
        letterSpacing: 0.52,
        lineHeight: 15.18,
        marginBottom: 10,
      },
    },
  },

  hero: {
    sm: {
      top: 270,
      left: '50%',
      width: 335,
      height: 750,
      title: {
        marginTop: 0,
        width: 220,
        fontSize: 50,
        textAlign: 'center',
      },
      subtitle: {
        marginTop: 10,
        width: 165,
        fontSize: 14,
        textAlign: 'center',
      },
      floatingImage: {
        width: 580,
        height: 602,
        left: '50%',
        top: 185,
        opacity: 0.50,
      },
      shadow: {
        width: 303,
        height: 313,
        left: '50%',
        top: 191,
        opacity: 1,
      },
      arrow: {
        width: 76,
        height: 76,
        left: '48.8%',
        bottom: 140,
      },
    },
    md: {
      top: 245,
      left: 154,
      width: 688,
      height: 750,
      title: {
        left: 80,
        marginTop: 0,
        width: 260,
        fontSize: 60,
        textAlign: 'left',
      },
      subtitle: {
        left: 80,
        marginTop: 45,
        width: 340,
        fontSize: 23,
        textAlign: 'left',
      },
      floatingImage: {
        width: 580,
        height: 602,
        right: -45,
        top: 120,
      },
      shadow: {
        width: 313,
        height: 313,
        right: 39,
        top: 151,
        opacity: 1,
      },
      arrow: {
        width: 76,
        height: 76,
        right: 87,
        bottom: 60,
      },
    },
    mdPlus: {
      top: 320,
      left: 80,
      width: 500,
      height: 750,
      title: {
        left: 80,
        marginTop: 0,
        width: 450,
        fontSize: 45,
        textAlign: 'left',
      },
      subtitle: {
        left: 80,
        marginTop: -60,
        width: 340,
        fontSize: 24,
        textAlign: 'left',
      },
      floatingImage: {
        width: 630,
        height: 652,
        right: -40,
        top: 100,
        opacity: 0.2,
      },
      shadow: {
        width: 0,
        height: 0,
        right: 0,
        top: 0,
        opacity: 0,
      },
      arrow: {
        width: 76,
        height: 76,
        right: 95,
        bottom: 60,
      },
    },
  },

  mission: {
    sm: {
      top: 0,
      left: 0,
      width: 375,
      height: 300,
      maxWidth: '95%',
      paddingY: 60,
      marginLeft: 30,
      text: {
        fontSize: 22,
        lineHeight: 1.6,
        letterSpacing: 0.02,
        marginBottom: 24,
      },
      button: {
        width: 130,
        height: 33,
        fontSize: 12,
        letterSpacing: 0.04,
        lineHeight: 1.2,
      },
    },
    md: {
      top: 0,
      left: 0,
      width: 768,
      height: 350,
      maxWidth: '85%',
      paddingY: 80,
      marginLeft: 80,
      text: {
        fontSize: 26,
        lineHeight: 1.6,
        letterSpacing: 0.02,
        marginBottom: 32,
      },
      button: {
        width: 140,
        height: 35,
        fontSize: 13,
        letterSpacing: 0.04,
        lineHeight: 1.2,
      },
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 768,
      height: 350,
      maxWidth: '85%',
      paddingY: 80,
      marginLeft: 80,
      text: {
        fontSize: 28,
        lineHeight: 1.6,
        letterSpacing: 0.02,
        marginBottom: 32,
      },
      button: {
        width: 150,
        height: 37,
        fontSize: 14,
        letterSpacing: 0.04,
        lineHeight: 1.2,
      },
    },
  },

  contact: {
    sm: {
      top: 0,
      left: 0,
      width: 375,
      height: 200,
      paddingY: 147,
      maxWidth: '403px',
      text: {
        fontSize: 25,
        marginBottom: 23,
        lineHeight: 1.3,
      },
      button: {
        width: 150,
        height: 34.5,
        fontSize: 12,
        letterSpacing: 0.04,
        lineHeight: 1.2,
      },
    },
    md: {
      top: 0,
      left: 0,
      width: 768,
      height: 250,
      paddingY: 196,
      maxWidth: '510px',
      text: {
        fontSize: 30,
        marginBottom: 27,
        lineHeight: 1.3,
      },
      button: {
        width: 155,
        height: 35.5,
        fontSize: 13,
        letterSpacing: 0.04,
        lineHeight: 1.2,
      },
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 900,
      height: 250,
      paddingY: 196,
      maxWidth: '520px',
      text: {
        fontSize: 32,
        marginBottom: 28,
        lineHeight: 1.3,
      },
      button: {
        width: 160,
        height: 36.5,
        fontSize: 14,
        letterSpacing: 0.04,
        lineHeight: 1.2,
      },
    },
  },

  services: {
    sm: {
      top: 0,
      left: 0,
      width: 375,
      height: 650,
      titleTop: '12%',
      titleLeft: 100,
      titleWidth: '90%',
      titleFontSize: 24,
      item1: {
        top: '28%',
        left: 20,
        title: 'Webové stránky',
        numberFontSize: 15,
        titleFontSize: 28,
        spacing: -1,
        width: 300,
      },
      item2: {
        top: '45%',
        left: 20,
        title: 'Aplikace',
        numberFontSize: 15,
        titleFontSize: 28,
        spacing: -1,
      },
      item3: {
        top: '62%',
        left: 20,
        title: 'Design',
        numberFontSize: 15,
        titleFontSize: 28,
        spacing: -1,
      },
      button: {
        top: '82.5%',
        left: 20,
        width: 130,
        height: 33,
      },
    },
    md: {
      top: 0,
      left: 0,
      width: 768,
      height: 900,
      titleTop: '15%',
      titleLeft: 80,
      titleWidth: 150,
      titleFontSize: 28,
      item1: {
        top: '32%',
        left: 80,
        title: 'Webové stránky',
        numberFontSize: 13,
        titleFontSize: 28,
        lineWidth: 'calc(100vw - 40px - 120px)',
      },
      item2: {
        top: '45%',
        left: 80,
        title: 'Aplikace',
        numberFontSize: 13,
        titleFontSize: 28,
        lineWidth: 'calc(100vw - 40px - 120px)',
      },
      item3: {
        top: '58.1%',
        left: 80,
        title: 'Design',
        numberFontSize: 13,
        titleFontSize: 28,
        lineWidth: 'calc(100vw - 40px - 120px)',
      },
      button: {
        top: '78%',
        left: 80,
        width: 145,
        height: 35,
      },
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 900,
      height: 900,
      titleTop: '15%',
      titleLeft: 80,
      titleWidth: 160,
      titleFontSize: 30,
      item1: {
        top: '32%',
        left: 80,
        title: 'Webové stránky',
        numberFontSize: 14,
        titleFontSize: 30,
        lineWidth: 'calc(100vw - 50px - 120px)',
      },
      item2: {
        top: '45%',
        left: 80,
        title: 'Aplikace',
        numberFontSize: 14,
        titleFontSize: 30,
        lineWidth: 'calc(100vw - 50px - 120px)',
      },
      item3: {
        top: '58.1%',
        left: 80,
        title: 'Design',
        numberFontSize: 14,
        titleFontSize: 30,
        lineWidth: 'calc(100vw - 50px - 120px)',
      },
      button: {
        top: '78%',
        left: 80,
        width: 150,
        height: 37,
      },
    },
  },

  whyChoose: {
    sm: {
      top: 0,
      left: 0,
      width: 375,
      height: 750,
      titleFontSize: 30,
      titleLeft: 0,
      titleMaxWidth: '280px',
      titleMarginBottom: '70px',
      numberLeft: 0,
      numberTop: 0,
      numberFontSize: 18,
      contentLeft: 0,
      contentTop: '30px',
      contentTitleFontSize: 30,
      contentDescFontSize: 18,
      contentLineHeight: 1.17,
      contentTitleMarginBottom: 28,
      arrowRight: '0',
      arrowTop: 'clamp(250px, 35vw, 320px)',
      arrowSize: 50,
      containerMaxWidth: '420px',
      containerMinHeight: '350px',
      paddingTop: '50px',
      paddingBottom: '0px',
    },
    md: {
      top: 0,
      left: 0,
      width: 768,
      height: 700,
      titleFontSize: 32,
      titleLeft: 50,
      titleMaxWidth: '500px',
      titleMarginBottom: '100px',
      numberLeft: 50,
      numberTop: 'clamp(25px, 3.5vw, 35px)',
      numberFontSize: 'clamp(100px, 14vw, 130px)',
      contentLeft: 'clamp(220px, 28vw, 280px)',
      contentTop: 'clamp(50px, 6.5vw, 70px)',
      contentTitleFontSize: 22,
      contentDescFontSize: 'clamp(12px, 1.4vw, 15px)',
      contentLineHeight: 1.8,
      contentTitleMarginBottom: 6,
      arrowRight: '12vw',
      arrowTop: 'clamp(75px, 9.5vw, 100px)',
      arrowSize: 48,
      containerMaxWidth: '100%',
      containerMinHeight: '300px',
      paddingTop: '80px',
      paddingBottom: '100px',
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 900,
      height: 750,
      titleFontSize: 36,
      titleLeft: 70,
      titleMaxWidth: '600px',
      titleMarginBottom: '100px',
      numberLeft: 70,
      numberTop: 'clamp(30px, 4vw, 40px)',
      numberFontSize: 'clamp(120px, 16vw, 150px)',
      contentLeft: 'clamp(250px, 30vw, 310px)',
      contentTop: 'clamp(65px, 8vw, 85px)',
      contentTitleFontSize: 24,
      contentDescFontSize: 'clamp(13px, 1.5vw, 16px)',
      contentLineHeight: 1.8,
      contentTitleMarginBottom: 6,
      arrowRight: '10vw',
      arrowTop: 'clamp(85px, 10.5vw, 110px)',
      arrowSize: 52,
      containerMaxWidth: '100%',
      containerMinHeight: '300px',
      paddingTop: '80px',
      paddingBottom: '100px',
    },
  },

  references: {
    sm: {
      top: 0,
      left: 0,
      width: 375,
      height: 1200,
      titleFontSize: 34,
      titleMarginBottom: 60,
      titleLeft: 0,
      openCardLeftPadding: 30,
      closedCardLeftPadding: 30,
      buttonRight: '5%',
      button: {
        width: 95,
        height: 22,
        fontSize: 9,
        letterSpacing: 0.5,
        lineHeight: 12,
      },
      closedCard: {
        gap: 16,
      },
      elektrika: {
        tagMarginTop: 20,
      },
      storek: {
        tagMarginTop: 16,
      },
      raska: {
        tagMarginTop: 20,
      },
      spilar: {
        tagMarginTop: 16,
      },
    },
    md: {
      top: 0,
      left: 0,
      width: 768,
      height: 1400,
      titleFontSize: 42,
      titleMarginBottom: 80,
      titleLeft: 0,
      openCardLeftPadding: 50,
      closedCardLeftPadding: 50,
      buttonRight: '5%',
      button: {
        width: 120,
        height: 32,
        fontSize: 11,
        letterSpacing: 0.6,
        lineHeight: 14,
      },
      closedCard: {
        gap: 20,
      },
      elektrika: {
        tagMarginTop: 26,
      },
      storek: {
        tagMarginTop: 22,
      },
      raska: {
        tagMarginTop: 26,
      },
      spilar: {
        tagMarginTop: 22,
      },
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 900,
      height: 1400,
      titleFontSize: 44,
      titleMarginBottom: 80,
      titleLeft: 0,
      openCardLeftPadding: 55,
      closedCardLeftPadding: 50,
      buttonRight: '5%',
      button: {
        width: 125,
        height: 33,
        fontSize: 11.5,
        letterSpacing: 0.6,
        lineHeight: 14,
      },
      closedCard: {
        gap: 20,
      },
      elektrika: {
        tagMarginTop: 28,
      },
      storek: {
        tagMarginTop: 24,
      },
      raska: {
        tagMarginTop: 28,
      },
      spilar: {
        tagMarginTop: 24,
      },
    },
  },

  footer: {
    sm: {
      top: 0,
      left: 0,
      width: 345,
      height: 637,
      cardWidth: 345,
      cardHeight: 637,
      titleLeft: 30,
      titleFontSize: 26,
      titleMarginBottom: 65,
      contentLeft: 0,
      nameFontSize: 20,
      nameMarginBottom: 10,
      contactFontSize: 15,
      contactLineHeight: 1.8,
      contactItemMarginBottom: 2,
      contactSectionMarginBottom: 38,
      icMarginBottom: 14,
      socialMarginBottom: 60,
      socialIconSize: 30,
      buttonMarginBottom: 60,
      buttonWidth: 145,
      buttonHeight: 33,
      buttonFontSize: 12,
      arrowSize: 36,
      arrowLeft: '46%',
      arrowBottom: 70,
      privacyMarginBottom: 14,
      copyrightFontSize: 13,
      logoOpacity: 0.3,
      logoRight: 20,
      logoTop: '60%',
      logoSize: '120px',
    },
    md: {
      top: 0,
      left: 0,
      width: 922,
      height: 648,
      cardWidth: 922,
      cardHeight: 648,
      titleLeft: 59,
      titleFontSize: 30,
      titleMarginBottom: 43,
      contentLeft: 59,
      nameFontSize: 23,
      nameMarginBottom: 6,
      contactFontSize: 17,
      contactLineHeight: 1.7,
      contactItemMarginBottom: 6,
      contactSectionMarginBottom: 32,
      icFontSize: 15,
      icMarginBottom: 7,
      socialIconSize: 32,
      socialSectionMarginBottom: 41,
      arrowSize: 40,
      arrowLeft: '48%',
      arrowBottom: 85,
      privacyMarginBottom: 22,
      copyrightFontSize: 15,
      logoOpacity: 0.17,
      logoRight: '-4vw',
      logoTop: '60%',
      logoSize: 'clamp(405px, 40.5vw, 495px)',
    },
    mdPlus: {
      top: 0,
      left: 0,
      width: 973,
      height: 684,
      cardWidth: 973,
      cardHeight: 684,
      titleLeft: 80,
      titleFontSize: 32,
      titleMarginBottom: 46,
      contentLeft: 80,
      nameFontSize: 24,
      nameMarginBottom: 7,
      contactFontSize: 18,
      contactLineHeight: 1.7,
      contactItemMarginBottom: 7,
      contactSectionMarginBottom: 34,
      icFontSize: 16,
      icMarginBottom: 8,
      socialIconSize: 27,
      socialSectionMarginBottom: 44,
      arrowSize: 42,
      arrowLeft: '48%',
      arrowBottom: 90,
      privacyMarginBottom: 23,
      copyrightFontSize: 16,
      logoOpacity: 0.17,
      logoRight: '-3vw',
      logoTop: '60%',
      logoSize: 'clamp(427px, 42.75vw, 522px)',
    },
  },
};
