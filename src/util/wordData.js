const fetchSyllables = 'https://api.datamuse.com/words?md=s&max=1&sp=';

export const getSyllables = (word) => {
  const url = fetchSyllables + word;
  fetch(url)
    .then(response => response.json())
    .then(jsonResponse => {
      const syllables = jsonResponse[0].numSyllables;
      this.setState({})
    })
}

export const countSyllables = (words) => {

}