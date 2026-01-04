import type { Breakpoint } from './breakpoints';

export type ResponsiveValue<T> = Record<'lg' | 'lgPlus' | 'xl' | '2xl', T>;

export interface SectionLayout {
  top: number;
  width: number;
  height: number;
  left?: number;
}

export interface HeroLayout extends SectionLayout {
  left: number;
  subtitle: {
    marginTop: number;
    width: string | number;
    fontSize: number;
  };
  title: {
    marginTop: number;
    width: string | number;
    fontSize: number;
  };
  floatingImage: {
    top: string;
    right: number;
    maxHeight: string;
    opacity: number;
  };
}

export interface ServicesLayout extends SectionLayout {
  titleLeft: number;
  titleWidth: string | number;
  titleFontSize: number;
  item1: {
    top: string;
    left: number;
    title: string;
    numberFontSize: number;
    titleFontSize: number;
    lineWidth: string | number;
  };
  item2: {
    top: string;
    left: number;
    title: string;
    numberFontSize: number;
    titleFontSize: number;
    lineWidth: string | number;
  };
  item3: {
    top: string;
    left: number;
    title: string;
    numberFontSize: number;
    titleFontSize: number;
    lineWidth: string | number;
  };
  button: {
    top: string;
    left: number;
    width: number;
    height: number;
  };
}


export interface MissionLayout extends SectionLayout {
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

export interface WhyChooseLayout extends SectionLayout {
  titleFontSize: string | number;
  titleLeft: number;
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
  arrowSize: number;
}

export interface ReferencesLayout extends SectionLayout {
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
}

export interface FooterLayout extends SectionLayout {
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
  contactMarginBottom: number;
  socialMarginBottom: number;
  socialIconSize: number;
  privacyMarginBottom: number;
  copyrightFontSize: number;
  logoOpacity: number;
  logoRight: number;
  logoTop: string;
  logoSize: string;
}

export interface NavigationLayout {
  top: number;
  right: number;
  hamburgerWidth: number;
  hamburgerHeight: number;
}

export interface ServicePageHeroLayout {
  subtitle: {
    fontSize: number;
  };
  title: {
    fontSize: number;
  };
  badge: {
    fontSize: number;
  };
}

export interface LayoutConfig {
  container: ResponsiveValue<{ minWidth: number; minHeight: number }>;
  header: ResponsiveValue<{
    top: number;
    left: number;
    logoWidth: number;
    logoHeight: number;
    lineGap: number;
    line1Width: number;
    line2Width: number;
    line2VerticalOffset: number;
  }>;
  navigation: ResponsiveValue<NavigationLayout>;
  hero: ResponsiveValue<HeroLayout>;
  mission: ResponsiveValue<MissionLayout>;
  services: ResponsiveValue<ServicesLayout>;
  references: ResponsiveValue<ReferencesLayout>;
  whyChoose: ResponsiveValue<WhyChooseLayout>;
  footer: ResponsiveValue<FooterLayout>;
  servicePageHero: ResponsiveValue<ServicePageHeroLayout>;
}

export const layoutConfig: LayoutConfig = {
  container: {
    lg: { minWidth: 1024, minHeight: 6100 },
    lgPlus: { minWidth: 1150, minHeight: 6150 },
    xl: { minWidth: 1280, minHeight: 6200 },
    '2xl': { minWidth: 1536, minHeight: 6300 },
  },

  header: {
    lg: {
      top: 95,
      left: 95,
      logoWidth: 115,
      logoHeight: 115,
      lineGap: 9,
      line1Width: 72,
      line2Width: 46,
      line2VerticalOffset: 7,
    },
    lgPlus: {
      top: 96,
      left: 135,
      logoWidth: 117,
      logoHeight: 117,
      lineGap: 9,
      line1Width: 74,
      line2Width: 47,
      line2VerticalOffset: 7,
    },
    xl: {
      top: 98,
      left: 175,
      logoWidth: 118,
      logoHeight: 118,
      lineGap: 9,
      line1Width: 76,
      line2Width: 48,
      line2VerticalOffset: 7,
    },
    '2xl': {
      top: 101,
      left: 191,
      logoWidth: 120,
      logoHeight: 120,
      lineGap: 10,
      line1Width: 80,
      line2Width: 50,
      line2VerticalOffset: 8,
    },
  },

  navigation: {
    lg: {
      top: 90,
      right: -31,
      hamburgerWidth: 85,
      hamburgerHeight: 18,
    },
    lgPlus: {
      top: 92,
      right: -18,
      hamburgerWidth: 87,
      hamburgerHeight: 18,
    },
    xl: {
      top: 95,
      right: -15,
      hamburgerWidth: 90,
      hamburgerHeight: 18,
    },
    '2xl': {
      top: 93,
      right: -70,
      hamburgerWidth: 100,
      hamburgerHeight: 18,
    },
  },

  hero: {
    lg: {
      top: 400,
      left: 83,
      width: 580,
      height: 450,
      subtitle: {
        marginTop: -3,
        width: 450,
        fontSize: 24,
      },
      title: {
        marginTop: 2,
        width: 650,
        fontSize: 40,
      },
      floatingImage: {
        top: '58%',
        right: -65,
        maxHeight: '87vh',
        opacity: 0.2,
      },
    },
    lgPlus: {
      top: 408,
      left: 115,
      width: 610,
      height: 475,
      subtitle: {
        marginTop: -3,
        width: 480,
        fontSize: 27,
      },
      title: {
        marginTop: 1,
        width: 680,
        fontSize: 45,
      },
      floatingImage: {
        top: '58.2%',
        right: -35,
        maxHeight: '87.5vh',
        opacity: 0.2,
      },
    },
    xl: {
      top: 415,
      left: 148,
      width: 640,
      height: 500,
      subtitle: {
        marginTop: -4,
        width: 500,
        fontSize: 30,
      },
      title: {
        marginTop: 1,
        width: 700,
        fontSize: 50,
      },
      floatingImage: {
        top: '58.5%',
        right: -8,
        maxHeight: '88vh',
        opacity: 0.2,
      },
    },
    '2xl': {
      top: 435,
      left: 163,
      width: 700,
      height: 550,
      subtitle: {
        marginTop: -5,
        width: 550,
        fontSize: 28,
      },
      title: {
        marginTop: 0,
        width: 750,
        fontSize: 56,
      },
      floatingImage: {
        top: '59%',
        right: 80,
        maxHeight: '90vh',
        opacity: 0.2,
      },
    },
  },

  mission: {
    lg: {
      top: 0,
      width: 500,
      height: 0,
      maxWidth: 650,
      paddingY: 215,
      marginLeft: 80,
      text: {
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 1.4,
        marginBottom: 64,
      },
      button: {
        width: 148,
        height: 33,
        fontSize: 13,
        letterSpacing: 0.7,
        lineHeight: 16,
      },
    },
    lgPlus: {
      top: 0,
      width: 880,
      height: 0,
      maxWidth: 880,
      paddingY: 210,
      marginLeft: 115,
      text: {
        fontSize: 38,
        lineHeight: 42,
        letterSpacing: 1.38,
        marginBottom: 64,
      },
      button: {
        width: 150,
        height: 35,
        fontSize: 13.2,
        letterSpacing: 0.69,
        lineHeight: 16,
      },
    },
    xl: {
      top: 0,
      width: 680,
      height: 0,
      maxWidth: 840,
      paddingY: 200,
      marginLeft: 160,
      text: {
        fontSize: 40,
        lineHeight: 40,
        letterSpacing: 1.35,
        marginBottom: 64,
      },
      button: {
        width: 152,
        height: 35,
        fontSize: 13.5,
        letterSpacing: 0.68,
        lineHeight: 16,
      },
    },
    '2xl': {
      top: 0,
      width: 1000,
      height: 0,
      maxWidth: 1350,
      paddingY: 240,
      marginLeft: 173.5,
      text: {
        fontSize: 54,
        lineHeight: 60,
        letterSpacing: 1.28,
        marginBottom: 64,
      },
      button: {
        width: 152,
        height: 38,
        fontSize: 14.4,
        letterSpacing: 0.64,
        lineHeight: 16,
      },
    },
  },

  services: {
    lg: {
      top: 1020,
      width: 680,
      height: 0,
      titleLeft: 80,
      titleWidth: 95,
      titleFontSize: 30,
      item1: {
        top: '32%',
        left: 80,
        title: 'Webové stránky',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 80px - 90px)',
      },
      item2: {
        top: '45%',
        left: 80,
        title: 'Aplikace',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 80px - 90px)',
      },
      item3: {
        top: '58.1%',
        left: 80,
        title: 'Design',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 80px - 90px)',
      },
      button: {
        top: '78%',
        left: 80,
        width: 142,
        height: 35,
      },
    },
    lgPlus: {
      top: 1045,
      width: 710,
      height: 0,
      titleLeft: 119,
      titleWidth: 100,
      titleFontSize: 31,
      item1: {
        top: '32%',
        left: 120,
        title: 'Webové stránky',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 120px - 140px)',
      },
      item2: {
        top: '45%',
        left: 120,
        title: 'Aplikace',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 120px - 140px)',
      },
      item3: {
        top: '58.1%',
        left: 120,
        title: 'Design',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 120px - 140px)',
      },
      button: {
        top: '78%',
        left: 120,
        width: 152,
        height: 35,
      },
    },
    xl: {
      top: 1070,
      width: 840,
      height: 0,
      titleLeft: 160,
      titleWidth: 205,
      titleFontSize: 32,
      item1: {
        top: '32%',
        left: 160,
        title: 'Webové stránky',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 160px - 160px)',
      },
      item2: {
        top: '45%',
        left: 160,
        title: 'Aplikace',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 160px - 160px)',
      },
      item3: {
        top: '58.1%',
        left: 160,
        title: 'Design',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 160px - 160px)',
      },
      button: {
        top: '78%',
        left: 160,
        width: 152,
        height: 35,
      },
    },
    '2xl': {
      top: 1125,
      width: 800,
      height: 0,
      titleLeft: 175,
      titleWidth: 115,
      titleFontSize: 35,
      item1: {
        top: '32%',
        left: 175,
        title: 'Webové stránky',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 170px - 150px)',
      },
      item2: {
        top: '45%',
        left: 175,
        title: 'Aplikace',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 170px - 150px)',
      },
      item3: {
        top: '58.1%',
        left: 175,
        title: 'Design',
        numberFontSize: 14,
        titleFontSize: 32,
        lineWidth: 'calc(100vw - 170px - 150px)',
      },
      button: {
        top: '78%',
        left: 175,
        width: 152,
        height: 38,
      },
    },
  },

  references: {
    lg: {
      top: 0,
      width: 1024,
      height: 0,
      titleFontSize: 38,
      titleMarginBottom: 134,
      titleLeft: 80,
      openCardLeftPadding: '5vw',
      closedCardLeftPadding: '5vw',
      button: {
        width: 135,
        height: 26,
        fontSize: 11,
        letterSpacing: 0.7,
        lineHeight: 15,
      },
      closedCard: {
        gap: 8,
      },
      elektrika: {
        tagMarginTop: 40,
      },
      storek: {
        tagMarginTop: 40,
      },
      raska: {
        tagMarginTop: 40,
      },
      spilar: {
        tagMarginTop: 40,
      },
    },
    lgPlus: {
      top: 0,
      width: 1150,
      height: 0,
      titleFontSize: 20,
      titleMarginBottom: 134,
      titleLeft: 120,
      openCardLeftPadding: '8vw',
      closedCardLeftPadding: '8vw',
      button: {
        width: 140,
        height: 28,
        fontSize: 12,
        letterSpacing: 0.69,
        lineHeight: 16,
      },
      closedCard: {
        gap: 8,
      },
      elektrika: {
        tagMarginTop: 40,
      },
      storek: {
        tagMarginTop: 40,
      },
      raska: {
        tagMarginTop: 40,
      },
      spilar: {
        tagMarginTop: 40,
      },
    },
    xl: {
      top: 0,
      width: 1280,
      height: 0,
      titleFontSize: 42,
      titleMarginBottom: 134,
      titleLeft: 160,
      openCardLeftPadding: '11vw',
      closedCardLeftPadding: '11vw',
      button: {
        width: 140,
        height: 30,
        fontSize: 11.5,
        letterSpacing: 0.68,
        lineHeight: 16,
      },
      closedCard: {
        gap: 8,
      },
      elektrika: {
        tagMarginTop: 40,
      },
      storek: {
        tagMarginTop: 40,
      },
      raska: {
        tagMarginTop: 40,
      },
      spilar: {
        tagMarginTop: 40,
      },
    },
    '2xl': {
      top: 0,
      width: 1536,
      height: 0,
      titleFontSize: 45,
      titleMarginBottom: 134,
      titleLeft: 175,
      openCardLeftPadding: '8.8vw',
      closedCardLeftPadding: '8.8vw',
      button: {
        width: 152,
        height: 38,
        fontSize: 14.4,
        letterSpacing: 0.64,
        lineHeight: 16,
      },
      closedCard: {
        gap: 8,
      },
      elektrika: {
        tagMarginTop: 40,
      },
      storek: {
        tagMarginTop: 40,
      },
      raska: {
        tagMarginTop: 40,
      },
      spilar: {
        tagMarginTop: 40,
      },
    },
  },

  whyChoose: {
    lg: {
      top: 2020,
      width: 1024,
      height: 500,
      titleFontSize: 38,
      titleLeft: 80,
      numberLeft: 80,
      numberTop: 'clamp(35px, 7.5vw, 45px)',
      numberFontSize: 'clamp(140px, 15.6vw, 170px)',
      contentLeft: 'clamp(280px, 29.3vw, 340px)',
      contentTop: 'clamp(60px, 7.4vw, 90px)',
      contentTitleFontSize: 26,
      contentDescFontSize: 'clamp(14px, 1.46vw, 17px)',
      contentLineHeight: 1.8,
      contentTitleMarginBottom: 6,
      arrowRight: '11vw',
      arrowSize: 55,
    },
    lgPlus: {
      top: 2045,
      width: 1150,
      height: 520,
      titleFontSize: 40,
      titleLeft: 120,
      numberLeft: 120,
      numberTop: 'clamp(35px, 3vw, 45px)',
      numberFontSize: 'clamp(160px, 14.8vw, 180px)',
      contentLeft: 'clamp(360px, 33vw, 410px)',
      contentTop: 'clamp(70px, 6.5vw, 85px)',
      contentTitleFontSize: 27,
      contentDescFontSize: 'clamp(14px, 1.3vw, 16px)',
      contentLineHeight: 1.8,
      contentTitleMarginBottom: 6,
      arrowRight: '12.5vw',
      arrowSize: 58,
    },
    xl: {
      top: 2070,
      width: 1280,
      height: 550,
      titleFontSize: 42,
      titleLeft: 160,
      numberLeft: 160,
      numberTop: 'clamp(35px, 3.1vw, 50px)',
      numberFontSize: 'clamp(170px, 14.1vw, 190px)',
      contentLeft: 'clamp(430px, 32vw, 440px)',
      contentTop: 'clamp(70px, 6.5vw, 90px)',
      contentTitleFontSize: 28,
      contentDescFontSize: 'clamp(14px, 1.17vw, 16px)',
      contentLineHeight: 1.8,
      contentTitleMarginBottom: 6,
      arrowRight: '13vw',
      arrowSize: 60,
    },
    '2xl': {
      top: 2125,
      width: 1536,
      height: 600,
      titleFontSize: 45,
      titleLeft: 175,
      numberLeft: 175,
      numberTop: 'clamp(20px, 1.6vw, 30px)',
      numberFontSize: 'clamp(180px, 13vw, 220px)',
      contentLeft: 'clamp(480px, 33vw, 540px)',
      contentTop: 'clamp(50px, 3.8vw, 70px)',
      contentTitleFontSize: 45,
      contentDescFontSize: 'clamp(16px, 1.25vw, 20px)',
      contentLineHeight: 1.7,
      contentTitleMarginBottom: 8,
      arrowRight: '10vw',
      arrowSize: 65,
    },
  },


  footer: {
    lg: {
      top: 5030,
      width: 1024,
      height: 720,
      cardWidth: 1024,
      cardHeight: 720,
      titleLeft: 65,
      titleFontSize: 30,
      titleMarginBottom: 48,
      contentLeft: 65,
      nameFontSize: 22,
      nameMarginBottom: 7,
      contactFontSize: 16,
      contactLineHeight: 1.7,
      contactItemMarginBottom: 7,
      contactSectionMarginBottom: 36,
      icFontSize: 16,
      icMarginBottom: 8,
      socialIconSize: 28,
      socialSectionMarginBottom: 46,
      privacyMarginBottom: 24,
      copyrightFontSize: 17,
      logoOpacity: 0.17,
      logoRight: '5vw',
      logoTop: '50%',
      logoSize: 'clamp(450px, 45vw, 550px)',
    },
    lgPlus: {
      top: 4965,
      width: 1150,
      height: 720,
      cardWidth: 1150,
      cardHeight: 720,
      titleLeft: 105,
      titleFontSize: 32,
      titleMarginBottom: 50,
      contentLeft: 105,
      nameFontSize: 24,
      nameMarginBottom: 8,
      contactFontSize: 16,
      contactLineHeight: 1.5,
      contactItemMarginBottom: 8,
      contactSectionMarginBottom: 38,
      icFontSize: 16,
      icMarginBottom: 10,
      socialIconSize: 28,
      socialSectionMarginBottom: 48,
      privacyMarginBottom: 22,
      copyrightFontSize: 16,
      logoOpacity: 0.17,
      logoRight: '5vw',
      logoTop: '50%',
      logoSize: 'clamp(500px, 43vw, 600px)',
    },
    xl: {
      top: 4900,
      width: 1280,
      height: 720,
      cardWidth: 1280,
      cardHeight: 720,
      titleLeft: 145,
      titleFontSize: 35,
      titleMarginBottom: 55,
      contentLeft: 145,
      nameFontSize: 26,
      nameMarginBottom: 8,
      contactFontSize: 18,
      contactLineHeight: 1.5,
      contactItemMarginBottom: 8,
      contactSectionMarginBottom: 40,
      icFontSize: 18,
      icMarginBottom: 10,
      socialIconSize: 30,
      socialSectionMarginBottom: 50,
      privacyMarginBottom: 15,
      copyrightFontSize: 18,
      logoOpacity: 0.17,
      logoRight: '5vw',
      logoTop: '50%',
      logoSize: 'clamp(550px, 42vw, 650px)',
    },
    '2xl': {
      top: 4775,
      width: 1536,
      height: 720,
      cardWidth: 1536,
      cardHeight: 720,
      titleLeft: 160,
      titleFontSize: 40,
      titleMarginBottom: 60,
      contentLeft: 160,
      nameFontSize: 30,
      nameMarginBottom: 10,
      contactFontSize: 20,
      contactLineHeight: 1.7,
      contactItemMarginBottom: 10,
      contactSectionMarginBottom: 44,
      icFontSize: 20,
      icMarginBottom: 12,
      socialIconSize: 35,
      socialSectionMarginBottom: 52,
      privacyMarginBottom: 15,
      copyrightFontSize: 20,
      logoOpacity: 0.17,
      logoRight: '5vw',
      logoTop: '50%',
      logoSize: 'clamp(600px, 40vw, 700px)',
    },
  },

  servicePageHero: {
    lg: {
      subtitle: {
        fontSize: 24,
      },
      title: {
        fontSize: 67,
      },
      badge: {
        fontSize: 14,
      },
    },
    lgPlus: {
      subtitle: {
        fontSize: 25,
      },
      title: {
        fontSize: 69,
      },
      badge: {
        fontSize: 14,
      },
    },
    xl: {
      subtitle: {
        fontSize: 26,
      },
      title: {
        fontSize: 72,
      },
      badge: {
        fontSize: 14,
      },
    },
    '2xl': {
      subtitle: {
        fontSize: 27,
      },
      title: {
        fontSize: 73,
      },
      badge: {
        fontSize: 14,
      },
    },
  },
};
