const GRAPHQL_URL = 'http://localhost:9000/'
const element = document.getElementById('greeting')
element.textContent = 'Loading...'

async function fetchGreeting() {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            greeting
          }
        `,
      }),
    })

    const { data } = await response.json()
    return data // must have this line
  } catch (error) {
    console.log(error)
  }
}

fetchGreeting().then((data) => {
  element.textContent = data.greeting
})
