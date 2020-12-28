import './styles/index.scss'

async function start() {
  return await Promise.resolve('works!')
}

start().then(console.log)
