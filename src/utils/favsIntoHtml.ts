import { Data, DataEntry } from '../common/snoowrap-service'

export default (favs: Data[]) => {
  let responseData: any = {}
  favs.forEach((fCat: DataEntry[]) => {
    responseData[fCat[0].sub] = fCat
  })

  let responseText = ''

  for (const [key, value] of Object.entries(responseData)) {
    const title = `<h2>${key.toUpperCase()}</h2>`
    let text = ``
    ;(value as Data).forEach((topPost: DataEntry) => {
      text += `<p>
<a href='${topPost.link}'>${topPost.text}</a><br/>
Likes: ${topPost.score}
</p>`
    })

    responseText += `
${title}
${text}
    `
  }

  return responseText
}
