import badges from '../data/badges.json'

export const getBadge = (badgeName: string): string => {
  return badges.find(b => b.name === badgeName)?.url || '/images/badges/default.svg'
}


export default { getBadge }
