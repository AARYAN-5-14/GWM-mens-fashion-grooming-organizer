import partyVideo from '../assets/party.mp4';
import formalVideo from '../assets/formal.mp4';
import dateVideo from '../assets/date.mp4';
import familyVideo from '../assets/family_gathering.mp4';

export const CATEGORIES = [
  {
    id: 'party',
    title: 'PARTY',
    beardRoute: '/grooming/party/BeardForm',
    hairRoute: '/grooming/party/HairForm',
    videoSrc: partyVideo,
    label: 'Party'
  },
  {
    id: 'formal',
    title: 'FORMAL',
    beardRoute: '/grooming/formal/BeardForm',
    hairRoute: '/grooming/formal/HairForm',
    videoSrc: formalVideo,
    label: 'Formal'
  },
  {
    id: 'date',
    title: 'DATE',
    beardRoute: '/grooming/date/BeardForm',
    hairRoute: '/grooming/date/HairForm',
    videoSrc: dateVideo,
    label: 'Date'
  },
  {
    id: 'family',
    title: 'Family-Meet',
    beardRoute: '/grooming/family/BeardForm',
    hairRoute: '/grooming/family/HairForm',
    videoSrc: familyVideo,
    label: 'Family'
  }
];
