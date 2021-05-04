import { FilterXSS } from 'xss'

const myXSS = new FilterXSS({
  whiteList: {}
})

export default function processXSS(text: string) {
  return myXSS.process(text)
}
