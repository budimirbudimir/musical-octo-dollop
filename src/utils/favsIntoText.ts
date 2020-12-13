import { Data, DataEntry } from '../common/snoowrap-service'

export default (favs: Data[]) => {
  let responseData: any = {}
  favs.forEach((fCat: DataEntry[]) => {
    responseData[fCat[0].sub] = fCat
  })

  let responseText = ''

  for (const [key, value] of Object.entries(responseData)) {
    const title = key.toUpperCase()
    let text = ``
    ;(value as Data).forEach((topPost: DataEntry) => {
      text += `
${topPost.text}
(${topPost.link})
Likes: ${topPost.score}
      `
    })

    responseText += `
# ${title}
${text}
    `
  }

  return responseText
}
