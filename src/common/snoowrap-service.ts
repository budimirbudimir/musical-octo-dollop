import snoowrap from 'snoowrap'
import * as dotenv from 'dotenv'

dotenv.config()

export interface Post {
  url: string
  title: string
  score: number
  preview: any
}

export interface DataEntry {
  sub: string
  link: string
  text: string
  score: number
  // preview: string
}

export type Data = DataEntry[]

// TODO This could be cached, so we save on quota when we have many users
export async function scrapeSubreddit(subName: string) {
  const r: any = new snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT || 'donau_kind',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  })

  const subreddit = await r.getSubreddit(subName)
  const topPosts = await subreddit.getTop({ time: 'day', limit: 3 })

  let data: Data = []

  topPosts.forEach((post: Post) => {
    data.push({
      sub: subName,
      link: post.url,
      text: post.title,
      score: post.score,
      // preview: post.preview.images.source.url,
    })
  })

  console.log(`SnoowrapService: Data scraped for subreddit '${subName}'`)

  return data
}
