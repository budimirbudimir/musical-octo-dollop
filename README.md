### Notes
- Having smaller issues with post preview image, but that should be easily resolvable
- Not as familiar with [SendGrid design](https://sendgrid.com/solutions/email-marketing/email-design/), so skipped that, but created small utility functions for the sake of minimal layout
- Haven't worked on backend for a while, so it's probably bit dirtier than it should be, esp. structure-wise
- Tests are missing out still, though I've split the logic into smaller chunks, so it shouldn't take much effort - rather some time - to do it
- Used [Snoowrap](https://github.com/not-an-aardvark/snoowrap) as JS wrapper over [Reddit API](https://www.reddit.com/prefs/apps/)
- We could cache some things (primarily Reddit API calls), so we fetch every subreddit only once
- `.env` file is missing, and it needs following env vars defined:
  - `PORT`
  - `REDDIT_USER_AGENT`
  - `REDDIT_CLIENT_ID`
  - `REDDIT_CLIENT_SECRET`
  - `REDDIT_REFRESH_TOKEN`
  - `SENDGRID_API_KEY`
  - `SENDGRID_VERIFIED_SENDER`