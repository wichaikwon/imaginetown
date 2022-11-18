// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from './data'

export default function handler(req, res) {
  const _id = req.query.id
  const merged = [...data['NOW_SHOWING'], ...data['COMING_SOON']]
  res.status(200).json(merged.filter(({ id }) => id === _id))
}
