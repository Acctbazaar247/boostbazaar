import b1 from '@/assets/image/b1.png';
import b2 from '@/assets/image/b2.png';
import b3 from '@/assets/image/b3.png';
import b4 from '@/assets/image/b4.png';
import b5 from '@/assets/image/b5.png';
import b6 from '@/assets/image/b6.png';
import b7 from '@/assets/image/b7.png';
import b8 from '@/assets/image/b8.png';

import ai1 from '@/assets/image/ai1.png';
import ai2 from '@/assets/image/ai2.png';
import ai3 from '@/assets/image/ai3.png';

import h1 from '@/assets/image/h1.png';
import h2 from '@/assets/image/h2.png';
import h3 from '@/assets/image/h3.png';
import h4 from '@/assets/image/h4.png';
import h5 from '@/assets/image/h5.png';
import h6 from '@/assets/image/h6.png';

import service1 from '@/assets/image/service1.png';
import service2 from '@/assets/image/service2.png';
import service3 from '@/assets/image/service3.png';
import service4 from '@/assets/image/service4.png';
import service5 from '@/assets/image/service5.png';
import service6 from '@/assets/image/service6.png';
import service7 from '@/assets/image/service7.png';
import service8 from '@/assets/image/service8.png';

import c1 from '@/assets/image/c1.png';
import c2 from '@/assets/image/c2.png';
import c3 from '@/assets/image/c3.png';

import s1 from '@/assets/image/telegram.png';
import s2 from '@/assets/image/twitter.png';
import s3 from '@/assets/image/instagram.png';
import s4 from '@/assets/image/tik-tok.png';
import { StaticImageData } from 'next/image';

type BannerData = {
  image: StaticImageData | undefined;
  title: string;
};

export const bannerData: BannerData[] = [
  {
    image: b1,
    title: 'Instagram',
  },
  {
    image: b2,
    title: 'Facebook',
  },
  {
    image: b3,
    title: 'Linkedin',
  },
  {
    image: b4,
    title: 'Telegram',
  },
  {
    image: b5,
    title: 'Youtube',
  },

  {
    image: b6,
    title: 'Reddit',
  },
  {
    image: b7,
    title: 'Whatsapp',
  },
  {
    image: b8,
    title: 'Twitch',
  },
];

export const avatars = [{ image: ai1 }, { image: ai2 }, { image: ai3 }];

export const cardData = [
  {
    title: 'Create Account',
    text: 'Sign up for an account on Acctpanel in less than a minute.',
    image: h1,
  },
  {
    title: 'Fund Account',
    text: 'Add funds to your account using your local currency or cryptocurrency.',
    image: h2,
  },
  {
    title: 'Choose a Service',
    text: 'Select the service you need, from boosting to SMS verification.',
    image: h3,
  },
  {
    title: 'Input Link',
    text: 'Select a country phone number or enter the link where you want to distribute engagement.',
    image: h4,
  },
  {
    title: 'Work in Progress',
    text: 'Sit back and Watch out system process your order within seconds.',
    image: h5,
  },
  {
    title: 'Complete',
    text: 'After your order is completed, you can track it through the Service History button.',
    image: h6,
  },
];

export const servicesData = [
  {
    image: service1,
    title: 'Facebook',
  },
  {
    image: service2,
    title: 'Instagram',
  },
  {
    image: service3,
    title: 'Linkedin',
  },
  {
    image: service4,
    title: 'X',
  },
  {
    image: service5,
    title: 'Telegram',
  },
  {
    image: service6,
    title: 'Youtube',
  },
  {
    image: service7,
    title: 'Tiktok',
  },
  {
    image: service8,
    title: 'Shopify',
  },
];

export const contactsData = [
  {
    image: c1,
    title: 'About Us',
    text: 'Know about us',
  },
  {
    image: c2,
    title: 'Privacy Policy',
    text: 'know about our privacy policy',
  },
  {
    image: c3,
    title: '24 / 7 support',
    text: 'support@acctpanel.com',
  },
];

export const navLinks = [
  { label: 'Home', path: '#Home' },
  { label: 'Services', path: '#Services' },
  { label: 'FAQ', path: '#FAQ' },
  { label: 'Contact', path: '#Contact' },
];

export const socialLinks = [
  { image: s1, link: 'https://t.me/acctpanel' },
  { image: s2, link: 'https://x.com/acctbazaar' },
  { image: s3, link: 'ttps://instagram.com/acctpanelcom' },
  { image: s4, link: 'https://http://tikTok.com/@acctpanel' },
];
