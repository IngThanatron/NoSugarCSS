export interface ChatMsg {
  user: string
  text: string
  isDonation?: boolean
  amount?: number
}

export const POOL_MESSAGES: ChatMsg[] = [
  { user: 'StreamKing', text: "Let's gooo!! 🔥🔥" },
  { user: 'CatLover99', text: 'so clean omg' },
  { user: 'HypeTrainZ', text: 'POGGERS in the chat!' },
  { user: 'NightOwl_', text: 'this overlay is incredible' },
  { user: 'StarDust', text: 'smooth animation!' },
  { user: 'MintLeaf', text: 'hype hype hype hype' },
  { user: 'KuroNekoX', text: 'gg wp gg wp 👏' },
  { user: 'YuriChan', text: 'uwu so cute design' },
  { user: 'EliteGamer', text: 'best chat overlay ever ngl' },
  { user: 'TopFan', text: 'been subbed for 3 years PogChamp' },
]

export const DONATION_MESSAGES: ChatMsg[] = [
  { user: 'BigSup', text: 'keep up the great work!', isDonation: true, amount: 50 },
  { user: 'Lurker123', text: 'love the stream ❤️', isDonation: true, amount: 100 },
  { user: 'TopDonator', text: 'absolute legend, stay amazing', isDonation: true, amount: 500 },
]
