const Airtable = require('airtable')
let base = new Airtable({ apiKey: 'keykzfBdKWuHDhJoU' }).base('appLPwJLaFq3JZ06i')
const getData = (nameOfMap) => {
  let query = {
    maxRecords: 100,
    view: 'Grid view'
  }
  if (nameOfMap === 'general') {
    return new Promise((resolve, reject) => {
      let firstPromise = base('Lugar de elaboración de artesanía').select(query).firstPage()
      let secondPromise = base('Artesanos').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 100,
        view: 'Grid view'
      }).firstPage()
      Promise.all([firstPromise, secondPromise]).then(results => {
        const final = results.reduce((finalResults, data) => {
          return finalResults.concat(data)
        }, [])
        //data.concat(innerResults);
        //innerResults.concat(data)
        resolve(final)
        return undefined
      })
    })
  }
  return base(nameOfMap).select(query).firstPage()
}
