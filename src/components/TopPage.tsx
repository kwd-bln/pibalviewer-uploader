import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { parseSubject, parseBody, Wind } from '../utils/parser'

interface Props {}
interface State {
  subject: string
  body: string
  date: Date
  isMorning: boolean
  winds: Wind[]
}

class TopPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      subject: "",
      body: "",
      date: new Date(),
      isMorning: true,
      winds: []
    }
  }

  handleChangeSubject(event: React.FormEvent<HTMLInputElement>) {
    const newDate = parseSubject(event.currentTarget.value)
    console.log(newDate)
    if (newDate) {
      this.setState({subject: event.currentTarget.value, date: newDate, isMorning: newDate.getHours() < 12 })
    } else {
      this.setState({subject: event.currentTarget.value })
    }
  }

  handleChangeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newWinds = parseBody(event.currentTarget.value)
    console.log(newWinds)
    this.setState({body: event.currentTarget.value, winds: newWinds});
  }

  handleChangeSmallInput(event: React.FormEvent<HTMLInputElement>, index: number) {

  }

  handleClickButton() {
    if (this.state.winds.length <= 0) {
      window.alert('パイバルデータが未入力です。')
      return
    }

    let confrimText = "パイバルデータを送信します。よろしいですか？"
    console.log(this.state.subject)
    if (this.state.subject === "") {
      confrimText = "件名が未入力です。\n現在時刻を使用して" + confrimText
    }
    const res = window.confirm(confrimText)

    if (res) {

    }
  }
   
  render() {
    const subjectPlaceholder = "ex) Pibal Data released on 05:55 19th Oct."
    const bodyPlaceholder="ex)\nAlt(m) Deg(from) Spd(kt)\n100m 322° 5.5kt\n200m 334° 13.2kt\n300m 341° 10.0kt"
    return (
      <div className='flexbox'>
        <div className='wrapbox'>
          <p>メールの件名を貼り付けてください:</p>
          <input type="text" value={this.state.subject} placeholder={subjectPlaceholder} onChange={e => this.handleChangeSubject(e)} className='mail-input' />
          <div>
            <input className='small-input' value={this.state.date.getFullYear()} onChange={e => this.handleChangeSmallInput(e, 0)}/> / 
            <input className='small-input' value={this.state.date.getMonth()} onChange={e => this.handleChangeSmallInput(e, 1)}/> / 
            <input className='small-input' value={this.state.date.getDate()} onChange={e => this.handleChangeSmallInput(e, 2)}/>　
            <input className='small-input' value={this.state.date.getHours()} onChange={e => this.handleChangeSmallInput(e, 3)}/> : 
            <input className='small-input' value={this.state.date.getMinutes()} onChange={e => this.handleChangeSmallInput(e, 4)}/>
          </div>
        </div>
        <div className='wrapbox'>
          <p>メールの本文を貼り付けてください:</p>
          <TextareaAutosize type="text" value={this.state.body} placeholder={bodyPlaceholder} onChange={e => { this.handleChangeBody(e) }} className='mail-input' maxRows={5}/>
          <div className="table-dix">
            <table>
              <thead>
                <tr>
                  <th>Alt.(m)</th>
                  <th>Deg.(°)</th>
                  <th>Spd.(kt)</th>
                </tr>
              </thead>
              {
                this.state.winds.reverse().map((wind, i) => {
                  console.log(wind)
                  return (
                    <tbody key={'wind-'+i}>
                      <tr>
                        <td>{wind.height}</td>
                        <td>{wind.degree}</td>
                        <td>{wind.speed}</td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
          </div>
        </div>
        <div style={{width: '100%', margin: '20px'}}>
          <a href="#" onClick={() => this.handleClickButton()} className="btn-square">
            Send!
          </a>
        </div>
      </div>
    )
  }
}

export default TopPage