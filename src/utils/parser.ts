// parser.ts
export function parseSubject(subject: string): Date | null {
  // 件名からparse
  const monthList = ['Jan', 'Feb', 'Mar' , 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let pattern = /(\d{1,2}):(\d{1,2})[^\d]+(\d{1,2})(st|nd|rd|th)/
  let match = subject.match(pattern)
  if (!match) {
    console.log('this does not include time and date')
    return null
  }
  const hour = Number(match[1])
  const minute = Number(match[2])
  const day = Number(match[3])

  const monthCode = monthList.find(m => subject.includes(m))
  if (monthCode) {
    const month = monthList.indexOf(monthCode)
    const dt = new Date();
    const year = dt.getFullYear();
    return new Date(year, month, day, hour, minute)
  }

  return null
}

// Interface of wind
export interface Wind {
  height: number
  degree: number
  speed: number
}

export function parseBody(body: string, pattern: RegExp = /(\d{3,4})m (\d{1,3})° (\d+.\d)kt/, matchOrder: number[] = [1, 2, 3]): Wind[] {
  /**
   * body: メールの本文
   * pattern: 正規表現
   * matchOrder: patternによって得られたmatchに対して[height, degree, speed]がどのように並んでいるかを示す。
   *             もしも[height, speed, degree]の順で並んでいる場合、[0, 2, 1]を渡す
   */

  const textArray = body.split(/\r\n|\r|\n/)
  const winds: Wind[] = []

  textArray.forEach(text => {
    const match = text.match(pattern)
    if (match && match.length >= 4) {
      const wind = {
        height: Number(match[1]),
        degree: Number(match[2]),
        speed: Number(match[3])
      }
      winds.push(wind)
    }
  })
  return winds
}